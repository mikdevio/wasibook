import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavigationBar() {
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" >
      <Container fluid className='d-flex justify-content-between'>
        <Navbar.Brand href="/">
        <img
              alt=""
              src="/logo.svg"
              width="30"
              height="27"
              className="d-inline-block align-top"
            />{' '}
        Wasibook
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;