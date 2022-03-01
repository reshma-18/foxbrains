import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import RouterPath from "../../constants/routerPath";
import validateLoginForm from "../../utility/validations/login";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

const SignIn = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [errorsValid, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const getLoginDetails = (event) => {
    setLoginDetails((details) => ({
      ...details,
      [event.target.name]: event.target.value,
    }));
  };
  const viewPassword = () => {
    setShowPassword(!showPassword);
  };
  const user = {
    email: loginDetails.email,
    password: loginDetails.password,
  };

  const submitLogin = (event) => {
    event.preventDefault();
    console.log("Success");
    if (Object.keys(validateLoginForm(loginDetails)).length === 0) {
      axios
        .post(`http://173.82.100.177:3005/api/user/login`, { user })
        .then((res) => {
          console.log(res);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setErrors(validateLoginForm(loginDetails));
    }
  };
  return (
    <div className="formContainer">
      <Grid container>
        <Grid item xs={12} sm={12} md={3} lg={3}></Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <div className="signUpSection">
            <h2>Sign In</h2>
            <form className="signUpForm">
              <TextField
                error={errorsValid.email ? true : false}
                name="email"
                required
                id="outlined-basic"
                label="Email"
                variant="outlined"
                className="textInput"
                value={loginDetails.email}
                onChange={getLoginDetails}
              />

              <TextField
                error={errorsValid.password ? true : false}
                name="password"
                required
                id="outlined-basic"
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                className="textInput"
                value={loginDetails.password}
                onChange={getLoginDetails}
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
              <div className="errorText text-12">
                {errorsValid.email ||
                  (errorsValid.password && errorsValid.email)}
              </div>
              <Grid container>
                <Grid item xs={12} sm={12} md={4} lg={4}></Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <button
                    onClick={submitLogin}
                    className={
                      loginDetails.email && loginDetails.password
                        ? "primaryButton"
                        : "disabledButton"
                    }
                  >
                    Log in
                  </button>
                  <span>
                    Don't have account?
                    <Link to={RouterPath.SIGNUP_PATH}>Register</Link>
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
export default SignIn;
