import React from "react";
import { Nav, Navbar, Container, NavDropdown, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { BsFillChatDotsFill } from "react-icons/bs";

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Nav.Link>
            <BsFillChatDotsFill
              style={{ fontSize: "1.6rem", marginRight: "0.3rem" }}
            />
            <Navbar.Brand style={{ color: "#0d6efd" }}>ChatMe</Navbar.Brand>
          </Nav.Link>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/chat">
              <Nav.Link>Chat</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
