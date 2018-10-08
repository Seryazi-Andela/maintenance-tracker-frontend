import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout = () => {
    localStorage.removeItem("token");
    window.location.replace("/");
  };

  render() {
    const { isOpen } = this.state;
    return (
      <div>
        <Navbar color="light" light expand="lg">
          <NavbarBrand>Maintenance Tracker</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/dashboard">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/create">Create</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/requests">Requests</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => this.logout()}>Logout</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
export default NavBar;
