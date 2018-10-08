import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { SignUp } from "../src/containers/SignUp/SignUp";
import { Login } from "../src/containers/Login/Login";
import { Dashboard } from "../src/containers/Dashboard/Dashboard";
import { CreateRequest } from "../src/containers/CreateRequest/CreateRequest";
import { EditRequest } from "../src/containers/EditRequest/EditRequest";
import { AdminGrid } from "../src/containers/AdminGrid/AdminGrid";

export const Routes = props => {
  // checkAuth();
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
        <Route
          path="/dashboard"
          exact
          component={checkAuth() ? Dashboard : Login}
        />
        <Route
          path="/create"
          exact
          component={checkAuth() ? CreateRequest : Login}
        />
        <Route
          path="/edit"
          exact
          component={checkAuth() ? EditRequest : Login}
        />
        <Route
          path="/requests"
          exact
          component={checkAuth() ? AdminGrid : Login}
        />
      </Switch>
    </BrowserRouter>
  );
};

const checkAuth = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  if (token == null || token === "") {
    // alert('hehe')
    return false;
  } else {
    // alert('uuuuu')
    return true;
  }
};

export default Routes;
