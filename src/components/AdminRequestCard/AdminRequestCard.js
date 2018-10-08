import React, { Component } from "react";
import axios from "axios";
import { Card, CardText, CardBody, CardTitle, Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import showToast from "../../utils/utils";
import Notifications from "react-notify-toast";

export class AdminRequestCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      title: props.title,
      details: props.details,
      approved: props.approved
    };
  }

  approve = event => {
    const { id, title } = this.state;
    return axios
      .put(
        `http://127.0.0.1:5000/v1/requests/${id}/approve`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      .then(response => {
        this.showApproved(title);
      })
      .catch(error => {
        this.showFailure();
      });
  };

  disapprove = event => {
    const { id, title } = this.state;
    return axios
      .put(
        `http://127.0.0.1:5000/v1/requests/${id}/disapprove`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      .then(response => {
        this.showDisapproved(title);
      })
      .catch(error => {
        this.showFailure();
      });
  };

  resolve = event => {
    const { id, title } = this.state;
    return axios
      .put(
        `http://127.0.0.1:5000/v1/requests/${id}/resolve`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      .then(response => {
        this.showResolved(title);
      })
      .catch(error => {
        this.showFailure();
      });
  };

  showApproved = title => {
    const msg = title + " approved";
    showToast(msg, "green", "#FFFFFF");
  };

  showDisapproved = title => {
    const msg = title + " disapproved";
    showToast(msg, "red", "#FFFFFF");
  };

  showResolved = title => {
    const msg = title + " resolved";
    showToast(msg, "dimgray", "#FFFFFF");
  };

  showFailure = () => {
    const msg = "Operation failed! ";
    showToast(msg, "red", "#FFFFFF");
  };

  render() {
    const { title, details } = this.state;
    return (
      <div>
        <Notifications />
        <Row>
          <Col>
            <Card style={{ height: "320px" }}>
              <CardBody>
                <CardTitle className="titleEllipses">{title}</CardTitle>
                <CardText
                  className="detailEllipses"
                  style={{ height: "170px" }}
                >
                  {details}
                </CardText>
                <button
                  id="approveBtn"
                  onClick={event => this.approve(event)}
                  className="btn btn-outline-success btn-sm"
                  style={{
                    marginRight: "2px",
                    fontSize: "10px",
                    height: "30px"
                  }}
                >
                  Approve
                </button>
                <button
                  id="disapproveBtn"
                  onClick={event => this.disapprove(event)}
                  className="btn btn-outline-danger btn-sm"
                  style={{
                    marginRight: "2px",
                    fontSize: "10px",
                    height: "30px"
                  }}
                >
                  Disapprove
                </button>
                <button
                  id="resolveBtn"
                  onClick={event => this.resolve(event)}
                  className="btn btn-outline-secondary btn-sm"
                  style={{
                    fontSize: "10px",
                    height: "30px"
                  }}
                >
                  Resolve
                </button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
AdminRequestCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  approved: PropTypes.bool.isRequired
};
export default AdminRequestCard;
