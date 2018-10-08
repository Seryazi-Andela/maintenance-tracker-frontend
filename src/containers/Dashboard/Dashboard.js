import React, { Component } from "react";
import axios from "axios";
import { NavBar } from "../../components/NavBar/NavBar";
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
      .get("https://maintenance-tracker-skipper.herokuapp.com/v1/users/requests", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(response => {
        this.setState({ loader: "" });
        return response;
      })
      .catch(error => {
        this.setState({ loader: "" });
        this.checkListSize();
      });

  handleResponse = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  checkListSize = () => {
    const { requests } = this.state;
    if (requests.length === 0) {
      this.setState({
        showIndicator: "block"
      });
    }
  };

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
