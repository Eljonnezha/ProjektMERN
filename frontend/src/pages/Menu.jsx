import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import MenuProps from "./MenuProps";
import { useState, useEffect } from "react";
import axios from "axios";

function Menu({ addToCart }) {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/get-menu")
      .then((res) => setMeals(res.data))
      .catch((err) => console.log(err));
  }, []);

  const [showSuccessModal, setShowSuccessModal] = useState(false); 

  useEffect(() => {
    const params = new URLSearchParams(window.location.search); 
    const payment = params.get("payment");

    if (payment === "success") {
      setShowSuccessModal(true);

      const saveOrder = async () => {
        const cart = JSON.parse(localStorage.getItem("cart")); 
        const data = JSON.parse(localStorage.getItem("checkoutData")); 

        if (!cart || !data) return;

        const orderData = {
          ...data,
          paymentMethod: "Card",
          totalAmount: cart.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0,
          ),
          items: cart,
        };

        try {
          await axios.post("http://localhost:5000/addOrder", orderData);

          console.log("Order saved to MongoDB");

          localStorage.removeItem("cart");
          localStorage.removeItem("checkoutData");
        } catch (err) {
          console.log(err);
        }

        // pastron URL
        window.history.replaceState({}, document.title, "/menu");
      };

      saveOrder();
    }
  }, []);

  return (
    <Container>
      <h1 className="text-center my-5">Our Menu</h1>

      <Modal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)} // mbyll modalin kur perdoruesi klikon "OK"
        centered
      >
        <Modal.Body className="text-center my-4 ">
          <h4 className="text-success">Payment completed successfully!</h4>
          <p className="text-success">Your order has been received.</p>
        </Modal.Body>

        <Modal.Footer className="border-0">
          <Button variant="success" onClick={() => setShowSuccessModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      <Row className="mb-4 g-4">
        {meals.map((meal) => {
          return (
            <Col key={meal._id} xs={12} sm={6} md={4} lg={3}>
              <MenuProps {...meal} addToCart={addToCart} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default Menu;
