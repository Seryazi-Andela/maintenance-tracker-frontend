import React, { Component } from "react";
import axios from "axios";
import { Form, FormGroup, Button, Input } from "reactstrap";
import Wrapper from "../../hoc/Wrapper/Wrapper";
import { NavBar } from "../../components/NavBar/NavBar";
import showToast from "../../utils/utils";
import Notifications from "react-notify-toast";
import "../../styles/Loader.css";

export class CreateRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      details: "",
      loader: ""
    };
  }

  onTitleChange = event => {
    this.setState({
      title: event.target.value
    });
  };

  onDetailsChange = event => {
    this.setState({
      details: event.target.value
    });
  };

  submitRequest = event => {
    const { title, details } = this.state;
    const data = {
      header: title,
      details: details,
      approved: false,
      resolved: false
    };
    if (title === "" || details === "") {
      const msg = "Please fill all fields";
      showToast(msg, "red", "#FFFFFF");
    } else {
      return this.submitToAPI(data);
    }
  };

  submitToAPI = data => {
    this.setState({ loader: "loading" });
    return axios
      .post("https://maintenance-tracker-skipper.herokuapp.com/v1/users/requests", data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(response => this.showSuccess(response))
      .catch(error => this.showFailure(error));
  };

  showSuccess = response => {
    this.setState({ loader: "" });
    const msg = "Success! " + response.data.message;
    showToast(msg, "green", "#FFFFFF");
  };

  showFailure = error => {
    this.setState({ loader: "" });
    const msg = "Operation failed! " + error.response.data.message;
    showToast(msg, "red", "#FFFFFF");
  };

  render() {
    const { loader } = this.state;
    return (
      <Wrapper>
        <Notifications />
        <div className={`${loader}`} />
        <div className="container">
          <NavBar />
          <h3 style={{ textAlign: "center", marginTop: "40px" }}>
            create a new request
          </h3>
          <div
            className="d-flex justify-content-center"
            style={{ marginTop: "40px" }}
          >
            <Form className="col-md-8 pl-0 pr-0 float-left">
              <FormGroup>
                <Input
                  type="text"
                  name="heading"
                  id="headingInput"
                  onChange={event => this.onTitleChange(event)}
                  placeholder="title here..."
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="textarea"
                  name="details"
                  id="requestDetails"
                  onChange={event => this.onDetailsChange(event)}
                  rows={6}
                  placeholder="details here..."
                />
              </FormGroup>
              <div className="ml-0 float-right" style={{ marginTop: "8px" }}>
                <Button
                  outline
                  color="secondary"
                  id="submitBtn"
                  onClick={event => this.submitRequest(event)}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Wrapper>
    );
  }
}
export default CreateRequest;
