import React, { Component } from "react";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Button,
  Row,
  Col
} from "reactstrap";
import PropTypes from "prop-types";
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

  editRequest = event => {};

  deleteRequest = event => {};

  render() {
    const { title, details } = this.state;
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
                <Button
                  outline
                  color="secondary"
                  style={{ marginRight: "4px" }}
                  onClick={event => this.editRequest(event)}
                >
                  Edit
                </Button>
                <Button
                  outline
                  color="danger"
                  onClick={event => this.deleteRequest(event)}
                >
                  Delete
                </Button>
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
  details: PropTypes.string.isRequired,
  updateGrid: PropTypes.func
};
export default UserRequestCard;
