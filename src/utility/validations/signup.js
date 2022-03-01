import validator from "validator";
import ConstantText from "../../constants/index";

export default function validateSignUpForm(values) {
  var errors = {
    email: "",
    passwod: "",
    confirmPassword: false,
    passwordCondition1: false,
    passwordCondition2: false,
    passwordCondition3: false,
    passwordSuccess: false,
  };

  let specialCharacterFormat = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  let atleast1Upper1Lower1DigitFormat = /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/;

  if (validator.isEmail(values.email)) {
    errors.email = "";
  } else if (!validator.isEmail(values.email)) {
    errors.email = ConstantText.EMAIL_VALIDATION;
  }
  if (values.password.length >= 8) {
    errors.passwordCondition1 = true;
  }

  if (atleast1Upper1Lower1DigitFormat.test(values.password) === true) {
    errors.passwordCondition2 = true;
  }
  if (specialCharacterFormat.test(values.password) === true) {
    errors.passwordCondition3 = true;
  }

  if (values.password === values.confirmPassword) {
    errors.confirmPassword = true;
  }
  if (
    errors.passwordCondition1 &&
    errors.passwordCondition2 &&
    errors.passwordCondition3 &&
    errors.confirmPassword
  ) {
    errors.passwordSuccess = true;
  }

  return errors;
}
