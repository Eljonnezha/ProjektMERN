import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import MenuProps from "./MenuProps";
import { useState, useEffect } from "react";
import { useRef } from "react";
import axios from "axios";

function Menu({ addToShport, clearShport }) {
  const [meals, setMeals] = useState([]);
  const orderSaved = useRef(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/get-menu")
      .then((res) => setMeals(res.data))
      .catch((err) => console.log(err));
  }, []);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Do kontrollojm nese pagesa ka qen e suksesshme dhe ruan porosin ne databaz
 useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get("payment");

    if (payment === "success" && !orderSaved.current) { 
      orderSaved.current = true;

      setShowSuccessModal(true);
     // funksioni per te ruajtur porosine ne databaz
      const saveOrder = async () => {
        // marrim te dhenat e porosise dhe shporten nga localStorage
        const cart = JSON.parse(localStorage.getItem("shport")); 
        const data = JSON.parse(localStorage.getItem("checkoutData")); 

        if (!cart || !data) return; 

        // krijojme objektin e porosise per tu ruajtur ne db
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

          console.log("Order u ruajt ne MongoDB");

          clearShport();
          localStorage.removeItem("checkoutData");
          localStorage.removeItem("shport");
        } catch (err) {
          console.log(err);
        }

        // pastron URL
        window.history.replaceState({}, document.title, "/menu");
      };

      saveOrder();
    }
  }, [clearShport]);

  return (
    <Container>
      <h1 className="text-center my-5">Our Menu</h1>

      <Modal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        centered
      >
        <Modal.Body className="text-center my-4 ">
          <h4 className="text-success">Pagesa u krye me sukses!</h4>
          <p className="text-success">Porosia juaj është pranuar.</p>
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
              <MenuProps {...meal} addToShport={addToShport} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default Menu;
