import React, { useState } from "react";
import styles from "./MealItemForm.module.css";
import CartContext from "../../../store/cart-context";
const MealItemForm = (props) => {
  const [amountChange, setAmountChange] = useState("1");
  const [amountIsValid, setAmountIsValid] = useState(true);

  const amountChangeHandler = (event) => {
    setAmountChange(event.target.value);
  };
  // const resetAmountForm = () => {
  //   setAmountChange("1");
  //   setAmountIsValid(true);
  // };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmountNumber = +amountChange;
    if (
      amountChange.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    } else {
      setAmountIsValid(true);
    }
    props.onAddToCart(enteredAmountNumber);
    // resetAmountForm();
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.input}>
        <label htmlFor="amount">Quantity</label>
        <input
          onChange={amountChangeHandler}
          value={amountChange}
          id={"amount_" + props.id}
          type="number"
        />
      </div>
      <button>+ Add</button>
      {!amountIsValid && <h4 className={styles.warning}>1-5 only</h4>}
    </form>
  );
};
export default MealItemForm;
