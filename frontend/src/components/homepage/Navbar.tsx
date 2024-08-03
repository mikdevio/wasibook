import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button, ButtonGroup } from "react-bootstrap";

function NavigationBar() {
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt=""
            src="/logo.svg"
            width="30"
            height="27"
            className="d-inline-block align-top"
          />{" "}
          Wasibook
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <ButtonGroup>
              <Button
                className="btn-sm"
                variant="primary"
                type="button"
                href="/login"
              >
                Login
              </Button>
              <Button
                className="btn-sm"
                variant="warning"
                type="button"
                href="/signup"
              >
                Signup
              </Button>
            </ButtonGroup>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
