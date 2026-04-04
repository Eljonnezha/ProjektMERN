import { Col, Container, Row } from "react-bootstrap";
import MenuProps from "./MenuProps";
import meals from "../projectInfo/meals";

function Menu() {
  return (
    <Container>
      <h1 className="text-center my-5">Our Menu</h1>
      <Row className="mb-4 g-4">
        {meals.map((meal) => {
          return (
            <Col key={meal.id}  xs={12} sm={6} md={4} lg={3}>
              <MenuProps
                {...meal}
              />
            </Col>
          )
        })}
      </Row>
    </Container>
  );
}

export default Menu;
