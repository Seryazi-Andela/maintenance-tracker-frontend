import React, { Component } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, Col, Alert } from "reactstrap";
import Wrapper from "../../hoc/Wrapper/Wrapper";
import "../../styles/SignUp.css";
import showToast from "../../utils/utils";
import Notifications from "react-notify-toast";
import "../../styles/Loader.css";

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      loader: "",
      isAdmin: false,
      validUsername: false,
      validEmail: false,
      validPassword: false,
      showEmailAlert: false,
      showPasswordAlert: false,
      showUsernameAlert: false
    };
  }

  validateUsername = event => {
    const username = event.target.value;
    if (username.length < 5) {
      this.setState({
        showUsernameAlert: true,
        validUsername: false
      });
    } else {
      this.setState({
        showUsernameAlert: false,
        validUsername: true,
        username: event.target.value
      });
    }
  };

  onDismissUsernameAlert = () => {
    this.setState({ showUsernameAlert: false });
  };

  validateEmail = event => {
    const regex = /[a-zA-z0-9.]+@[a-z]+\.[a-z]+/;
    if (regex.test(event.target.value)) {
      this.setState({
        showEmailAlert: false,
        validEmail: true,
        email: event.target.value
      });
    } else {
      this.setState({
        showEmailAlert: true,
        validEmail: false
      });
    }
  };

  onDismissEmailAlert = () => {
    this.setState({ showEmailAlert: false });
  };

  validatePassword = event => {
    const password = event.target.value;
    if (password.length < 8) {
      this.setState({
        showPasswordAlert: true,
        validPassword: false
      });
    } else {
      this.setState({
        showPasswordAlert: false,
        validPassword: true,
        password
      });
    }
  };

  onDismissPasswordAlert = () => {
    this.setState({ showPasswordAlert: false });
  };

  onAsAdminChange = () => {
    let { isAdmin } = this.state;
    if (isAdmin) {
      this.setState({
        isAdmin: false
      });
    } else {
      this.setState({
        isAdmin: true
      });
    }
  };

  signupUser = event => {
    const {
      username,
      validUsername,
      email,
      validEmail,
      password,
      validPassword,
      isAdmin
    } = this.state;
    if (validUsername && validEmail && validPassword) {
      const data = {
        username: username,
        email: email,
        password: password,
        admin: isAdmin
      };
      this.setState({ loader: "loading" });
      return axios
        .post("https://maintenance-tracker-skipper.herokuapp.com/v1/auth/signup", data)
        .then(response => {
          this.setState({ loader: "" });
          return this.pushTologin();
        })
        .catch(error => {
          this.setState({ loader: "" });
          showToast("Signup failed, try again!", "red", "#FFFFFF");
        });
    } else {
      return showToast("Please enter valid entries!", "red", "#FFFFFF");
    }
  };

  pushTologin = response => {
    const {
      history: { push }
    } = this.props;
    push(`/`);
  };

  render() {
    const {
      loader,
      showUsernameAlert,
      showEmailAlert,
      showPasswordAlert
    } = this.state;
    return (
      <Wrapper>
        <div className={`${loader}`} />
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: "100px" }}
        >
          <Notifications />
          <div className="col-lg-5 float-left loginDiv">
            <h2 className="signupHeader">Maintenance Tracker</h2>
            <Form className="col-lg-12 pl-0 pr-0 float-left">
              <FormGroup row className="ml-0 mr-0">
                <Col>
                  <Label lg={12} for="signUpUsernameInput">
                    Username
                    <Input
                      type="text"
                      id="signUpUsernameInput"
                      name="username"
                      onChange={event => this.validateUsername(event)}
                    />
                  </Label>
                </Col>
              </FormGroup>
              <Alert
                color="info"
                isOpen={showUsernameAlert}
                toggle={this.onDismissUsernameAlert}
                style={{ width: "90%", margin: "0 auto" }}
              >
                Please enter a minimum 5 character username!
              </Alert>
              <FormGroup row className="ml-0 mr-0">
                <Col>
                  <Label lg={12} for="loginEmailInput">
                    Email
                    <Input
                      type="text"
                      id="loginEmailInput"
                      name="email"
                      onChange={event => this.validateEmail(event)}
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
                      onChange={event => this.validatePassword(event)}
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
              <FormGroup>
                <Col>
                  <Label lg={12} style={{ marginLeft: "22px" }}>
                    <Input type="checkbox" onChange={this.onAsAdminChange} />
                    As admin
                  </Label>
                </Col>
              </FormGroup>
              <div
                className="ml-0 float-right"
                style={{ marginRight: "31px", marginTop: "8px" }}
              >
                <Button
                  outline
                  color="secondary"
                  id="signupBtn"
                  onClick={event => this.signupUser(event)}
                >
                  SignUp
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Wrapper>
    );
  }
}
export default SignUp;
