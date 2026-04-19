import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-white py-5">
      <Container>
        <Row className="g-4 text-center text-md-start">
          <Col xs={12} md={4}>
            <h5 className="mb-3">Contact Us</h5>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@restaurant.com">Email: info@restaurant.com</a>
            <br />
            <a href="tel:+11234567890">Phone: (123) 456-7890</a>
            <br />
            <a
              href="https://maps.app.goo.gl/wnnrhMurzLMNH8RS6"
              target="_blank"
              rel="noopener noreferrer"
            >
              Address: 123 Rruga Kryesore, Tirane
            </a>
          </Col>

          <Col xs={12} md={4}>
            <h5 className="mb-3">Follow Us</h5>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-facebook p-1"></i> Facebook
            </a>
            <br />
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-instagram p-1"></i> Instagram
            </a>
            <br />
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-twitter p-1"></i> Twitter
            </a>
          </Col>

          <Col xs={12} md={4}>
            <h5 className="mb-3">Opening Hours</h5>
            <p>Mon - Fri: 9:00 AM - 10:00 PM</p>
            <p>Sat - Sun: 10:00 AM - 11:00 PM</p>
          </Col>
        </Row>

        <hr className="bg-light" />

        <p className="text-center mb-0">
          &copy; 2026 Restaurant | All rights reserved
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
