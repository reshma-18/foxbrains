import React from "react";
import { Route } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";
import RouterPath from "../constants/routerPath";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";

const Navigation = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SignUp} />
        <Route exact path={RouterPath.LOGIN_PATH} component={SignIn} />
        <Route exact path={RouterPath.DASHBOARD_PATH} component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default Navigation;
