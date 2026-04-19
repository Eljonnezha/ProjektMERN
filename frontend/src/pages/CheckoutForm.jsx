import { Modal, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

function CheckoutForm({ show, handleClose, total, cart, clearCart }) {
  const [orders, setOrders] = useState({
    fullName: "",
    email: "",
    address: "",
    phoneNumber: "",
    city: "",
    paymentMethod: "",
  });

  const [valid, setValid] = useState(null);

  const handleChange = (e) => {
    setOrders({ ...orders, [e.target.name]: e.target.value });
  };

  // CASH ORDER
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !orders.fullName ||
      !orders.email ||
      !orders.address ||
      !orders.phoneNumber ||
      !orders.city ||
      !orders.paymentMethod
    ) {
      setValid(false);
      return;
    }

    if (orders.paymentMethod === "Cash") {
      const orderData = {
        ...orders,
        totalAmount: total,
        items: cart.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      };

      try {
        await axios.post("http://localhost:5000/addOrder", orderData);

        setValid(true);
        clearCart();

        setTimeout(() => {
          setValid(null);
          handleClose();
        }, 1500);
      } catch (err) {
        console.log(err);
        setValid(false);
      }
    }

    // CARD → STRIPE
    if (orders.paymentMethod === "Card") {
      try {
        localStorage.setItem("checkoutData", JSON.stringify(orders));
        localStorage.setItem("cart", JSON.stringify(cart));

        const res = await axios.post(
          "http://localhost:5000/api/payment/create-checkout-session",
          { cart }
        );

        window.location.href = res.data.url;
      } catch (err) {
        console.log(err);
      }
    }
  };



  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="d-flex flex-column align-items-start gap-2 bg-danger text-white">
        <Modal.Title>Checkout</Modal.Title>
        <p>Total: {total} €</p>
      </Modal.Header>

      <Modal.Body className="bg-light d-flex flex-column gap-3">
        <Form>
          {valid !== null && (
            <Alert variant={valid ? "success" : "danger"}>
              {valid ? "Order success!" : "Fill all fields!"}
            </Alert>
          )}

          <Form.Group className="mb-2 mt-2">
            <Form.Label>Full Name</Form.Label>
            <Form.Control name="fullName" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Address</Form.Label>
            <Form.Control name="address" onChange={handleChange} />
          </Form.Group>

          <Row className="mb-2">
            <Col>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control name="phoneNumber" onChange={handleChange} />
            </Col>
            <Col>
              <Form.Label>City</Form.Label>
              <Form.Control name="city" onChange={handleChange} />
            </Col>
          </Row>

          <Form.Group className="mb-5">
            <Form.Label>Payment Method</Form.Label>
            <Form.Select name="paymentMethod" onChange={handleChange}>
              <option value="">Select</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer className="bg-light border-0">
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>

        <Button variant="success" onClick={handleSubmit}>
          Submit Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CheckoutForm;