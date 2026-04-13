import { Col, Container, Row } from "react-bootstrap";
import MenuProps from "./MenuProps";
import { useState, useEffect} from "react";
import axios from "axios";

function Menu({ addToCart}) {

  const [meals, setMeals] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/get-menu")
    .then(res => setMeals(res.data))
    .catch(err => console.log(err));
  }, []);

  return (
    <Container>
      <h1 className="text-center my-5">Our Menu</h1>
      <Row className="mb-4 g-4">
        {meals.map((meal) => {
          return (
            <Col key={meal._id}  xs={12} sm={6} md={4} lg={3}>
              <MenuProps
                {...meal} addToCart={addToCart}
              />
            </Col>
          )
        })}
      </Row>
    </Container>
  );
}

export default Menu;
