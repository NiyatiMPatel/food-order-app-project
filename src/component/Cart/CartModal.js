import React, { Fragment, useContext, useState } from "react";
import styles from "./CartModal.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import CheckoutForm from "./CheckoutForm";

const CartModal = (props) => {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionUnsuccess, setSubmissionUnsuccess] = useState();

  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItem = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setShowCheckoutForm(true);
  };

  const submitOrderHandler = async (userInputData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://react-food-order-app-9056c-default-rtdb.asia-southeast1.firebasedatabase.app/mealsOrder.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userInputData,
            mealsOrdered: cartCtx.items,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const orderSubmittedData = await response.json();

      setIsSubmitting(false);
      setSubmissionSuccess(true);
      cartCtx.resetItem();
      cartCtx.mealsMenu();
    } catch (error) {
      setIsSubmitting(false);
      setSubmissionSuccess(false);
      setSubmissionUnsuccess(error.message);
    }
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const hideOrderCancel = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onHideCartModal}>
        Close
      </button>
      {hasItem && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartContent = (
    <Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckoutForm && (
        <CheckoutForm
          onSubmitOrder={submitOrderHandler}
          onClick={props.onHideCartModal}
        />
      )}
      {!showCheckoutForm && hideOrderCancel}
    </Fragment>
  );

  const cartSubmittingContent = <h4>Sending Ordered Data...</h4>;

  const submissionSuccessContent = (
    <Fragment>
      <h4>Order Sent Successfully!</h4>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onHideCartModal}>
          Close
        </button>
      </div>
    </Fragment>
  );

  const submissionUnsuccessContent = (
    <h4>Something Went Wrong. Order Unsuccessful</h4>
  );

  return (
    <Modal onClick={props.onHideCartModal}>
      {!isSubmitting && !submissionSuccess && cartContent}
      {isSubmitting && cartSubmittingContent}
      {!isSubmitting && submissionSuccess && submissionSuccessContent}
      {submissionUnsuccess &&
        !isSubmitting &&
        !submissionSuccess &&
        submissionUnsuccessContent}
    </Modal>
  );
};

export default CartModal;
