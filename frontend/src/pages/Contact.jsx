import { Col, Container, Row, Form, Button } from "react-bootstrap";

function Contact() {
  return (
    <Container className="my-5">
      <h1 className="text-center my-4">Contact Us</h1>
      <hr className="mb-3 w-50 mx-auto border-start border-2 border-secondary shadow" />

      <p className="text-center mb-5 text-muted">
        Nese keni ndonje pyetje ose kerkese, mos hezitoni te na kontaktoni duke
        perdorur informacionin e kontaktit me poshte.
      </p>
      <Row className="g-5">
        <Col xs={12} md={6}>
          <h5 className="mb-3 text-danger">Contact Form</h5>
          <hr className="mb-3 border-start border-2 border-secondary shadow" />

          <Form className="my-5 p-4 bg-light rounded shadow">
            <Form.Group className="mb-3" controlId="fullname" required>
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email" required>
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="subject" required>
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="message">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Shkruani mesazhin tuaj..."
                required
              />
            </Form.Group>

            <Button variant="danger" type="submit">
              Send Message
            </Button>
          </Form>
        </Col>
        <Col xs={12} md={6} className="ps-5">
          <h5 className="mb-3 text-danger">Get In Touch</h5>
          <hr className="mb-3 border-start border-2 border-secondary shadow" />
          <div className="my-5 d-flex flex-column">
            <a
              href="https://maps.app.goo.gl/wnnrhMurzLMNH8RS6"
              target="_blank"
              rel="noopener noreferrer"
              className="getintouch"
            >
              <i className="bi bi-geo-alt-fill pe-3 fs-5"></i>
              <strong className="pe-2">Address:</strong> 123 Rruga Kryesore,
              Tirane
            </a>
            <br />
            <a href="tel:+11234567890" className="getintouch">
              <i className="bi bi-telephone-fill pe-3 fs-5"></i>
              <strong className="pe-2">Phone:</strong> (123) 456-7890
            </a>
            <br />
            <a href="mailto:info@restaurant.com" className="getintouch">
              <i className="bi bi-envelope-fill pe-3 fs-5"></i>
              <strong className="pe-2">Email:</strong>
              info@restaurant.com
            </a>
            <br />
          </div>
          <h5 className="mb-3 mt-4 text-danger">Follow Us</h5>
          <hr className="mb-3 border-start border-2 border-secondary shadow" />
          <div className="d-flex my-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="getintouch"
            >
              <i className="bi bi-facebook p-2 fs-3"></i>
            </a>
            <br />
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="getintouch"
            >
              <i className="bi bi-instagram p-2 fs-3"></i>
            </a>
            <br />
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="getintouch"
            >
              <i className="bi bi-twitter p-2 fs-3"></i>
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
