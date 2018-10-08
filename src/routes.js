import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { SignUp } from "../src/containers/SignUp/SignUp";
import { Login } from "../src/containers/Login/Login";
import { Dashboard } from "../src/containers/Dashboard/Dashboard";
import { CreateRequest } from "../src/containers/CreateRequest/CreateRequest";
import { EditRequest } from "../src/containers/EditRequest/EditRequest";

export const Routes = props => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/create" exact component={CreateRequest} />
        <Route path="/edit" exact component={EditRequest} />
      </Switch>
    </BrowserRouter>
  );
};

Routes.propTypes = {
  authStatus: PropTypes.bool
};

Routes.defaultProps = {
  authStatus: false
};

export default Routes;
