import React, { Component } from "react";
import axios from "axios";
import { NavBar } from "../../components/NavBar/NavBar";
import Wrapper from "../../hoc/Wrapper/Wrapper";
import "../../styles/Loader.css";
import "../../styles/Dashboard.css";
import { UserRequestCard } from "../../components/UserRequestCard/UserRequestCard";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      showIndicator: "none",
      loader: "loading"
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () =>
    this.getUserRequests()
      .then(response => this.handleResponse("requests", response.data.requests))
      .catch(() => {});

  getUserRequests = () =>
    axios
      .get("http://127.0.0.1:5000/v1/users/requests", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(response => {
        this.setState({ loader: "" });
        return response;
      })
      .catch(error => {
        this.setState({ loader: "" });
      });

  handleResponse = (key, value) => {
    this.setState(
      {
        [key]: value
      },
      this.checkListSize
    );
  };

  checkListSize = () => {
    const { requests } = this.state;
    if (requests.length === 0) {
      this.setState({
        showIndicator: "block"
      });
    }
  };

  updateGrid = () => this.getUserRequests();

  render() {
    const { showIndicator, requests, loader } = this.state;
    return (
      <div className="container">
        <NavBar />
        <div className={`${loader}`} />
        <h3
          style={{
            textAlign: "center",
            display: showIndicator,
            marginTop: "40px"
          }}
        >
          It seems you haven't made any requests yet.
        </h3>
        <div className="container" style={{ marginTop: "20px" }}>
          <div className="row">
            {requests.map(request => {
              return (
                <div
                  key={request.id}
                  className="col-lg-3"
                  style={{ marginBottom: "20px" }}
                >
                  <UserRequestCard
                    id={request.id}
                    title={request.header}
                    details={request.details}
                    updateGrid={this.updateGrid}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
