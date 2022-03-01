import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import axios from "axios";
import RouterPath from "../../constants/routerPath";
import validateSignUpForm from "./../../utility/validations/signup";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import PasswordConditions from "../../components/PasswordConditions";

const SignUp = () => {
  const [signUpDetails, setSignUpDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [enableSignupBtn, setEnableSignupBtn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordConditions, setShowPasswordConditions] = useState(false);
  const [errors, setErrors] = useState();
  const getUserDetails = (event) => {
    let userDetails = {
      ...signUpDetails,
      [event.target.name]: event.target.value,
    };
    if (event.target.name === "password") {
      setShowPasswordConditions(true);
    } else {
      setShowPasswordConditions(false);
    }
    setSignUpDetails(userDetails);
    handleValidations(userDetails);
  };
  const handleValidations = (userData) => {
    setErrors(validateSignUpForm(userData));
    if (Object.values(userData).every((x) => x === null || x !== "") === true) {
      setEnableSignupBtn(true);
    } else {
      setEnableSignupBtn(false);
    }
  };

  const viewConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const viewPassword = () => {
    setShowPassword(!showPassword);
  };

  const user = {
    email: signUpDetails.email,
    password: signUpDetails.password,
    confirmPassword: signUpDetails.confirmPassword,
    firstName: signUpDetails.firstName,
    lastName: signUpDetails.lastName,
    phone: signUpDetails.phone,
  };

  const register = (event) => {
    event.preventDefault();
    console.log("details", signUpDetails);
    axios
      .post(`http://173.82.100.177:3005/api/user/signup`, { user })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="formContainer">
      <Grid container>
        <Grid item xs={12} sm={12} md={3} lg={3}></Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <div className="signUpSection">
            <h2>Sign Up</h2>
            <form className="signUpForm">
              <TextField
                required
                id="outlined-basic"
                name="firstName"
                label="First Name"
                variant="outlined"
                className="textInput"
                onChange={getUserDetails}
              />
              <TextField
                required
                name="lastName"
                id="outlined-basic"
                label="LastName"
                variant="outlined"
                className="textInput"
                onChange={getUserDetails}
              />
              <TextField
                required
                name="email"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                className="textInput"
                onChange={getUserDetails}
              />
              <TextField
                required
                name="phone"
                id="outlined-basic"
                label="Phone"
                variant="outlined"
                className="textInput"
                onChange={getUserDetails}
              />
              <TextField
                required
                name="password"
                id="outlined-basic"
                type={showPassword ? "text" : "password"}
                label="Password"
                variant="outlined"
                className="textInput"
                onChange={getUserDetails}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={viewPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <img
                            src="/assets/icons/eye.svg"
                            alt="show password"
                          />
                        ) : (
                          <img
                            src="/assets/icons/eye-slash.svg"
                            alt="show password"
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {showPasswordConditions && (
                <PasswordConditions conditions={errors} />
              )}
              <TextField
                required
                name="confirmPassword"
                id="outlined-required"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                variant="outlined"
                className="textInput"
                onChange={getUserDetails}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={viewConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <img
                            src="/assets/icons/eye.svg"
                            alt="show password"
                          />
                        ) : (
                          <img
                            src="/assets/icons/eye-slash.svg"
                            alt="show password"
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {errors &&
              !errors.confirmPassword &&
              signUpDetails.confirmPassword !== "" ? (
                <p className="errorText"> Passwords did not match</p>
              ) : (
                ""
              )}
              <Grid container>
                <Grid item xs={12} sm={12} md={4} lg={4}></Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <button
                    className={
                      enableSignupBtn ? "primaryButton" : "disabledButton"
                    }
                    onClick={register}
                  >
                    Register
                  </button>
                  <span>
                    Already registered?
                    <Link to={RouterPath.LOGIN_PATH}>Sign in</Link>
                  </span>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}></Grid>
              </Grid>
            </form>
          </div>
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3}></Grid>
      </Grid>
    </div>
  );
};
export default SignUp;
