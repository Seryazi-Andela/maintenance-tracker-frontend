import React, { Component } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, Col, Alert } from "reactstrap";
import "../../styles/Login.css";
import Notifications, { notify } from "react-notify-toast";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showEmailAlert: false,
      showPasswordAlert: false,
      disable: true,
      loadingState: ""
    };
  }

  validateEmail = event => {
    const regex = /[a-zA-z0-9.]+@[a-z]+\.[a-z]+/;
    if (regex.test(event.target.value)) {
      this.setState({
        showEmailAlert: false,
        email: event.target.value
      });
    } else {
      this.setState({
        showEmailAlert: true
      });
    }
  };

  onDismissEmailAlert = () => {
    this.setState({ showEmailAlert: false });
  };

  validatePassword = event => {
    const password = event.target.value;
    if (password.length < 8) {
      this.setState(
        {
          showPasswordAlert: true
        },
        this.deactivateLoginButton
      );
    } else {
      this.setState(
        {
          showPasswordAlert: false,
          password
        },
        this.activateLoginButton
      );
    }
  };

  onDismissPasswordAlert = () => {
    this.setState({ showPasswordAlert: false });
  };

  activateLoginButton = () => {
    this.setState({ disable: false });
  };

  deactivateLoginButton = () => {
    this.setState({ disable: true });
  };

  loginUser = () => {
    const { email, password } = this.state;
    console.log("email ", email);
    console.log("password ", password);
    this.showToast();
  };

  showToast = () => {
    let myColor = { background: "red", text: "#FFFFFF" };
    notify.show("Login failed! User not recognised", "custom", 2000, myColor);
  };

  render() {
    const { showEmailAlert, showPasswordAlert, disable } = this.state;
    return (
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "100px" }}
      >
        <div className="col-lg-5 float-left loginDiv">
          <h2 className="loginHeader">Maintenance Tracker</h2>
          <Form className="col-lg-12 pl-0 pr-0 float-left">
            <FormGroup row className="ml-0 mr-0">
              <Col>
                <Label lg={12} for="loginEmailInput">
                  Email
                  <Input
                    type="text"
                    id="loginEmailInput"
                    name="email"
                    onChange={this.validateEmail}
                  />
                </Label>
              </Col>
            </FormGroup>
            <Alert
              color="info"
              isOpen={showEmailAlert}
              toggle={this.onDismissEmailAlert}
              style={{ width: "90%", margin: "0 auto" }}
            >
              Please enter a valid email!
            </Alert>
            <FormGroup row className="ml-0 mr-0">
              <Col>
                <Label lg={12} for="loginPasswordInput">
                  Password
                  <Input
                    type="password"
                    id="loginPasswordInput"
                    name="password"
                    onChange={this.validatePassword}
                  />
                </Label>
              </Col>
            </FormGroup>
            <Alert
              color="info"
              isOpen={showPasswordAlert}
              toggle={this.onDismissPasswordAlert}
              style={{ width: "90%", margin: "0 auto" }}
            >
              Minimum 8 aplha-numeric characters required
            </Alert>
            <div
              className="ml-0 float-right"
              style={{ marginRight: "31px", marginTop: "8px" }}
            >
              <Button outline color="info" style={{ marginRight: "8px" }}>
                SignUp
              </Button>
              <Button
                outline
                color="secondary"
                disabled={disable}
                onClick={this.loginUser}
              >
                Login
              </Button>
            </div>
          </Form>
        </div>
        <Notifications />
      </div>
    );
  }
}
export default Login;
