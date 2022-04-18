export default function checkoutValidation(values) {
  let errors = {};

  if (!values.enteredName) {
    errors.enteredName = "Name required";
  }

  if (!values.enteredStreet) {
    errors.enteredStreet = "Street required.";
  }

  if (!values.enteredPostal) {
    errors.enteredPostal = "Postal required.";
  } else if (values.enteredPostal.length !== 5) {
    errors.enteredPostal = "Postal must be 5 charaters long.";
  }

  if (!values.enteredCity) {
    errors.enteredCity = "City required.";
  }

  return errors;
}
