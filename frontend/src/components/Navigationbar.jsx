import { Navbar, Container, Nav, Button } from "react-bootstrap";

function Navigationbar() {
  return (
    <Navbar expand="lg" className="bg-white shadow-sm sticky-top py-3">
      <Container>
        <Navbar.Brand href="/" className="fw-bold fs-4 text-danger">
          Restaurant
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto gap-4 custom-nav mb-3">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/menu">Menu</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="/contact">Contact Us</Nav.Link>
          </Nav>

          <Button variant="danger" className="px-4 rounded-pill">
            View Cart <i className="bi bi-cart ms-2"></i>
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;