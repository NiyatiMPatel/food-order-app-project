import { useReducer, useState, useEffect } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "RESET") {
    return defaultCartState;
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const removeItem = () => {
    dispatchCartAction({ type: "RESET" });
  };

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchingError, setFetchingError] = useState();

  const mealsMenu = () => {
    // useEffect(() => {
    setIsLoading(true);
    setFetchingError(null);
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-food-order-app-9056c-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseMealsData = await response.json();

      const listOfMeals = [];
      for (const key in responseMealsData) {
        listOfMeals.push({
          id: key,
          name: responseMealsData[key].name,
          description: responseMealsData[key].description,
          price: responseMealsData[key].price,
        });
      }
      setMeals(listOfMeals);
      setIsLoading(false);
    };

    const httpFetchError = async () => {
      try {
        await fetchMeals();
      } catch (error) {
        setIsLoading(false);
        setFetchingError(error.message);
      }
    };
    httpFetchError();
    // }, []);
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    resetItem: removeItem,
    mealsMenu: mealsMenu,
    meals: meals,
    isLoading: isLoading,
    fetchingError: fetchingError,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
