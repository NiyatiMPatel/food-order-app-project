import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  let [isTouched, setIsTouched] = useState(false);

  let valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  const submitValidate = (enteredValue) => {
    setIsTouched(true);
    validateValue(enteredValue);
  };

  return {
    value: enteredValue,
    touch: isTouched,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
    submitValidate,
  };
};

export default useInput;
