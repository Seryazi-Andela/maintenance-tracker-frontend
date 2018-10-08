import React, { Component } from "react";
import { NavBar } from "../../components/NavBar/NavBar";
import axios from "axios";
import "../../styles/Loader.css";
import { Button, Form, FormGroup, Input } from "reactstrap";
import Wrapper from "../../hoc/Wrapper/Wrapper";
import showToast from "../../utils/utils";
import Notifications from "react-notify-toast";

export class EditRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      details: "",
      loader: ""
    };
  }
  componentDidMount() {
    const { id, title, details } = this.props.location.state;
    this.setState({
      id,
      title,
      details
    });
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

  submitEdit = () => {
    const { title, details } = this.state;
    if (title === "" || details === "") {
      const msg = "Please fill all fields";
      showToast(msg, "red", "#FFFFFF");
    } else {
      const data = {
        header: title,
        details: details
      };
      return this.submitToAPI(data);
    }
  };

  submitToAPI = data => {
    this.setState({ loader: "loading" });
    const { id } = this.state;
    return axios
      .put(`http://127.0.0.1:5000/v1/users/requests/${id}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(response => this.showSuccess(response))
      .catch(error => this.showFailure(error));
  };

  showSuccess = response => {
    this.setState({ loader: "" });
    const msg = "Success! entry edited";
    showToast(msg, "green", "#FFFFFF");
  };

  showFailure = error => {
    this.setState({ loader: "" });
    const msg = "Operation failed! " + error.response.data.message;
    showToast(msg, "red", "#FFFFFF");
  };

  render() {
    const { title, details, loader } = this.state;
    return (
      <Wrapper>
        <Notifications />
        <div className={`${loader}`} />
        <div className="container">
          <NavBar />
          <h3 style={{ textAlign: "center", marginTop: "40px" }}>
            Edit your request
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
                  value={title}
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
                  value={details}
                />
              </FormGroup>
              <div className="ml-0 float-right" style={{ marginTop: "8px" }}>
                <Button
                  outline
                  color="secondary"
                  id="submitBtn"
                  onClick={event => this.submitEdit(event)}
                >
                  Edit
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Wrapper>
    );
  }
}
export default EditRequest;
