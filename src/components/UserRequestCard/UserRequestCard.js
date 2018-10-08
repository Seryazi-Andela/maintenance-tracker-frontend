import React, { Component } from "react";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import "../../styles/Dashboard.css";

export class UserRequestCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      title: props.title,
      details: props.details
    };
  }

  render() {
    const { id, title, details } = this.state;
    return (
      <div>
        <Row>
          <Col>
            <Card style={{ height: "300px" }}>
              <CardBody>
                <CardTitle className="titleEllipses">{title}</CardTitle>
                <CardText
                  className="detailEllipses"
                  style={{ height: "170px" }}
                >
                  {details}
                </CardText>
                <NavLink
                  className="btn btn-outline-secondary"
                  to={{ pathname: "/edit", state: { id, title, details } }}
                  style={{ marginRight: "4px" }}
                >
                  Edit
                </NavLink>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
UserRequestCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired
};
export default UserRequestCard;
