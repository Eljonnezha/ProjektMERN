import { Modal, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

function CheckoutForm({ show, handleClose, total, cart, clearCart }) {
  const [orders, setOrders] = useState({
    fullName: "",
    email: "",
    address: "",
    phoneNumber: "",
    city: "",
    paymentMethod: "Cash only",
  });

  const [valid, setValid] = useState(null);

  useEffect(() => {
    if (!show) {
      setValid(null);
    }
  }, [show]);

  const handleChange = (e) => {
    setOrders({ ...orders, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !orders.fullName ||
      !orders.email ||
      !orders.address ||
      !orders.phoneNumber ||
      !orders.city
    ) {
      setValid(false);
      return;
    }

    const orderData = {
      ...orders,
      totalAmount: total,
      items: cart.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    await axios
      .post("http://localhost:5000/addOrder", orderData)
      .then((res) => {
        console.log("Order submitted successfully");
        setValid(true);

        setOrders({
          fullName: "",
          email: "",
          address: "",
          phoneNumber: "",
          city: "",
          paymentMethod: "Cash only",
        });
        clearCart();

        setTimeout(() => {
          handleClose();
        }, 1500);
      })
      .catch((err) => {
        console.log("Error submitting order:", err);
        setValid(false);
      });
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header
        closeButton
        className="d-flex flex-column align-items-start"
      >
        <Modal.Title>Checkout</Modal.Title>
        <p>Total amount: {total} €</p>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {valid !== null && (
            <Alert variant={valid ? "success" : "danger"}>
              {valid
                ? "Order submitted successfully!"
                : "Order failed to submit!"}
            </Alert>
          )}
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              name="fullName"
              value={orders.fullName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={orders.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              name="address"
              value={orders.address}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                placeholder="Enter phone number"
                name="phoneNumber"
                value={orders.phoneNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                placeholder="Enter city"
                name="city"
                value={orders.city}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Payment Method</Form.Label>
            <Form.Control value="Cash only" readOnly />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} >
          Close
        </Button>

        <Button variant="danger" type="submit" onClick={handleSubmit}>
          Submit Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CheckoutForm;
