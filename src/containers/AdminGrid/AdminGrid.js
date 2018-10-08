import React, { Component } from "react";
import axios from "axios";
import { NavBar } from "../../components/NavBar/NavBar";
import "../../styles/Loader.css";
import "../../styles/Dashboard.css";
import { AdminRequestCard } from "../../components/AdminRequestCard/AdminRequestCard";

export class AdminGrid extends Component {
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
      .get("https://maintenance-tracker-skipper.herokuapp.com/v1/requests", {
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

  updateGrid = () => this.fetchData();

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
          There are no requests yet or you are not authorized to view requests.
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
                  <AdminRequestCard
                    id={request.id}
                    title={request.header}
                    details={request.details}
                    approved={request.approved}
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
export default AdminGrid;
