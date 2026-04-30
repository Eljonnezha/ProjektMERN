import { Modal, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

function CheckoutForm({ show, handleClose, total, shport, clearShport }) {
  const [orders, setOrders] = useState({
    fullName: "",
    email: "",
    address: "",
    phoneNumber: "",
    city: "",
    paymentMethod: "",
  });

  const [valid, setValid] = useState("");

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
      !orders.city ||
      !orders.paymentMethod
    ) {
      setValid("Potesoni te gjitha fushat!");
      setTimeout(() => {
        setValid("");
      }, 3000);
      return;
    }


    if (orders.paymentMethod === "Cash") {
      
      const orderData = { 
        ...orders,
        totalAmount: total,
        items: shport.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      };

      try {
        await axios.post("http://localhost:5000/addOrder", orderData);

        setValid("Porosia u krye me sukses!");
        clearShport();

        setTimeout(() => {
          setValid("");
          handleClose();
        }, 1500);
      } catch (err) {
        console.log(err);
        setValid("Ndodhi një gabim gjatë përpunimit të porosisë."); 
      }
    }

    if (orders.paymentMethod === "Card") {
      try {
        // ruajme te dhenat e porosise ne localStorage per ti perdorur ne faqen e pageses
        localStorage.setItem("checkoutData", JSON.stringify(orders));
        localStorage.setItem("shport", JSON.stringify(shport)); 

        
        const res = await axios.post(
          "http://localhost:5000/api/payment/create-checkout-session",
          { shport }
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
        <p>Totali: {total} €</p>
      </Modal.Header>

      <Modal.Body className="bg-light d-flex flex-column gap-3">
        <Form>
          {valid && (
            <Alert variant={valid === "Porosia u krye me sukses!" ? "success" : "danger"}>
              {valid}
            </Alert>
          )}

          <Form.Group className="mb-2 mt-2">
            <Form.Label>Emri i Plotë</Form.Label>
            <Form.Control name="fullName" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Adresa</Form.Label>
            <Form.Control name="address" onChange={handleChange} />
          </Form.Group>

          <Row className="mb-2">
            <Col>
              <Form.Label>Numri i Telefonit</Form.Label>
              <Form.Control name="phoneNumber" onChange={handleChange} />
            </Col>
            <Col>
              <Form.Label>Qyteti</Form.Label>
              <Form.Control name="city" onChange={handleChange} />
            </Col>
          </Row>

          <Form.Group className="mb-5">
            <Form.Label>Metoda e Pagesës</Form.Label>
            <Form.Select name="paymentMethod" onChange={handleChange}>
              <option value="">Zgjidh</option>
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