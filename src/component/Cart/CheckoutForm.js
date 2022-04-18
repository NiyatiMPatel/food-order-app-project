import React from "react";
import styles from "./CheckoutForm.module.css";
import useInput from "../../hooks/user-input";

const isNotEmpty = (value) => value.trim().length !== 0;
const isCharLengthFive = (value) => value.trim().length === 5;

const CheckoutForm = (props) => {
  let {
    value: enteredName,
    touch: nameTouched,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
    submitValidate: nameSv,
  } = useInput(isNotEmpty);

  let {
    value: enteredStreet,
    touch: streetTouched,
    isValid: enteredStreetIsValid,
    hasError: streetInputHasError,
    valueChangeHandler: streetChangedHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreetInput,
    submitValidate: streetSv,
  } = useInput(isNotEmpty);

  let {
    value: enteredPostal,
    touch: postalTouched,
    isValid: enteredPostalIsValid,
    hasError: postalInputHasError,
    valueChangeHandler: postalChangedHandler,
    inputBlurHandler: postalBlurHandler,
    reset: resetPostalInput,
    submitValidate: postalSv,
  } = useInput(isCharLengthFive);

  let {
    value: enteredCity,
    touch: cityTouched,
    isValid: enteredCityIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangedHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCityInput,
    submitValidate: citySv,
  } = useInput(isNotEmpty);

  const submitHandler = (event) => {
    event.preventDefault();

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      if (!enteredNameIsValid) {
        nameSv(enteredName);
      }
      if (!enteredCityIsValid) {
        citySv(enteredCity);
      }
      if (!enteredPostalIsValid) {
        postalSv(enteredPostal);
      }
      if (!enteredStreetIsValid) {
        streetSv(enteredStreet);
      }
      return;
    }

    props.onSubmitOrder({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    });

    console.log("submitted");

    resetNameInput();
    resetStreetInput();
    resetPostalInput();
    resetCityInput();
  };

  const nameInputClassCheck = `${styles.control} ${
    !nameInputHasError ? "" : styles.invalid
  }`;
  const streetInputClassess = `${styles.control} ${
    !streetInputHasError ? "" : styles.invalid
  }`;
  const postalInputClassess = `${styles.control} ${
    !postalInputHasError ? "" : styles.invalid
  }`;
  const cityInputClassess = `${styles.control} ${
    !cityInputHasError ? "" : styles.invalid
  }`;

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={nameInputClassCheck}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />

        {nameInputHasError && (
          <p className={styles.errortext}>Please enter a valid Name.</p>
        )}
      </div>
      <div className={streetInputClassess}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetChangedHandler}
          onBlur={streetBlurHandler}
          value={enteredStreet}
        />

        {streetInputHasError && (
          <p className={styles.errortext}>Please enter a valid Street.</p>
        )}
      </div>
      <div className={postalInputClassess}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          onChange={postalChangedHandler}
          onBlur={postalBlurHandler}
          value={enteredPostal}
        />

        {postalInputHasError && (
          <p className={styles.errortext}>
            Please enter a valid Postal (Must be 5 charaters long).
          </p>
        )}
      </div>
      <div className={cityInputClassess}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityChangedHandler}
          onBlur={cityBlurHandler}
          value={enteredCity}
        />

        {cityInputHasError && (
          <p className={styles.errortext}>Please enter a valid City.</p>
        )}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onClick}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckoutForm;
