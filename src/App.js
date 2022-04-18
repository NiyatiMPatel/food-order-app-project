import React, { useState } from "react";
import "./App.css";
import Header from "./component/Layout/Header";
import Meals from "./component/Meals/Meals";
import CartModal from "./component/Cart/CartModal";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartModalShow, setCartModalShow] = useState(false);

  const showCartModalHandler = () => {
    setCartModalShow(true);
  };

  const hideCartModalHandler = () => {
    setCartModalShow(false);
  };

  return (
    <CartProvider>
      {cartModalShow && <CartModal onHideCartModal={hideCartModalHandler} />}
      <Header onShowCartModal={showCartModalHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
