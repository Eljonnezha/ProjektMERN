import { Nav, Container, Navbar } from "react-bootstrap";

function SecondNavBar() {
  return (
    <Navbar expand="lg" className="bg-white shadow-sm sticky-top py-3">
      <Container>
        <Navbar.Brand href="/" className="fw-bold fs-4 text-danger">
          Admin Dashboard
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto gap-4 custom-nav mb-3">
            <Nav.Link href="/admin/dashboard/add-item">
              Add Item Menu
            </Nav.Link>
            <Nav.Link href="/admin/dashboard/update-item/:id">
              Update Item
            </Nav.Link>
            <Nav.Link href="/admin/dashboard/admin-menu">
              Admin Menu
            </Nav.Link>
             <Nav.Link href="/admin/dashboard/orders">
              Orders
            </Nav.Link>
            <Nav.Link href="/admin/dashboard/messages">
              Messages
            </Nav.Link>
             <Nav.Link href="/admin/dashboard/users">
              Users
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default SecondNavBar;
