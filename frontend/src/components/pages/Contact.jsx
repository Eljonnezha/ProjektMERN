import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";


function Contact() {

  const [contactInfo, setContactInfo] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [valid, setValid] = useState(null);

  const handleChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contactInfo.fullName || !contactInfo.email || !contactInfo.subject || !contactInfo.message) {
      setValid(false);
      return; // ndalon funksionin dhe nuk dergon request
    }

    await axios.post("http://localhost:5000/addContact", contactInfo)
      .then((res) => {
        console.log("Send");
        setValid(true);

        setContactInfo({
          fullName: "",
          email: "",
          subject: "",
          message: "",
        });
        setTimeout(() => {
          setValid(null);
        }, 3000);
      })
      
      .catch((err) => {
        console.log("Error Not Send" + err);
        setValid(false);
      });
  };
  return (
    <Container className="my-5">
      <h1 className="text-center my-4">Contact Us</h1>

      <p className="text-center mb-5 text-muted">
        Nese keni ndonje pyetje ose kerkese, mos hezitoni te na kontaktoni duke
        perdorur informacionin e kontaktit me poshte.
      </p>

      <Row className="g-5 my-5 p-4 bg-light rounded shadow">
        <Col xs={12} md={6} lg={5}>
          <h5 className="mb-3 text-danger">Contact</h5>
          <hr className="mb-3 border-start border-2 border-secondary shadow" />
          {valid !== null && (
            <Alert variant={valid ? "success" : "danger"}>
              {valid ? "Mesazhi u dergua me sukses!" : "Mesazhi nuk u dergua!"}
            </Alert>
          )}
          <Form onSubmit={handleSubmit} className="my-5 w-100 mx-auto">
            <Form.Group className="mb-3" controlId="fullname">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={contactInfo.fullName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={contactInfo.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                value={contactInfo.subject}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="message">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="message"
                value={contactInfo.message}
                onChange={handleChange}
                placeholder="Shkruani mesazhin tuaj..."
                required
              />
            </Form.Group>

            <Button variant="danger" type="submit">
              Send Message
            </Button>
          </Form>
        </Col>
        <Col xs={12} md={6} lg={5} className="ps-5">
          <h5 className="mb-3 text-danger">Get In Touch</h5>
          <hr className="mb-3 border-start border-2 border-secondary shadow" />
          <div className="my-5 d-flex flex-column">
            <a href="tel:+11234567890" className="getintouch">
              <i className="bi bi-telephone-fill pe-3 fs-5"></i>
              <strong className="pe-2">Phone:</strong> (123) 456-7890
            </a>
            <br />
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@restaurant.com" className="getintouch">
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
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
