import ChooseUsImg from "../../image/HomeImage/chooseUSImg.jpg";
import { Button, Container, Image, Row, Col } from "react-bootstrap";
import datas from "../../projectInfo/customers.js";
import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/get-menu")
      .then((res) => setMeals(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div id="menu">
      <div className="hero-container imgcover">
        <div className="hero-text text-center px-3">
          <h1 className="fw-bold text-white fs-md-1 mb-3">
            Mirësevini në EatNow
          </h1>
          <p className="text-white fs-5 fs-md-5">
            Zbuloni shijen e veçantë të ushqimit tonë duke porositur tani,
            thjesht duke u regjistruar dhe loguar në llogarinë tuaj. Shijoni një
            eksperiencë të shpejtë dhe të këndshme me ne!
          </p>
          <Button variant="danger" size="lg" href="/menu">
            Shiko Menu
          </Button>
        </div>
      </div>

      <Container>
        <h2 className="text-center my-5">Më të Porositurat</h2>
        <Row className="g-4">
          {meals.slice(10, 13).map((meal, index) => (
            <Col xs={12} sm={6} md={4} key={index}>
              <div className="card h-100 shadow-sm border-0 bg-light">
                <Image
                  src={"http://localhost:5000/images/" + meal.photo}
                  className="card-img-top img-fluid"
                  alt={meal.name}
                />
                <div className="card-body d-flex flex-column">
                  <h5>{meal.name}</h5>
                  <p className="flex-grow-1">{meal.description}</p>
                  <p className="fw-bold">{meal.price} €</p>
                  <Button variant="danger" className="mt-auto" href="/menu">
                    Shiko Menu
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      <Container fluid className="my-5 bg-light p-3 p-md-5">
        <h2 className="text-center py-4 py-md-5">Pse të Na Zgjidhni Ne</h2>
        <Row className="align-items-center">
          {/* Foto në njërën anë */}
          <Col xs={12} md={6} className="d-none d-lg-block ps-lg-5">
            <Image
              src={ChooseUsImg}
              alt="Interieri i Restorantit"
              className="img-fluid  rounded shadow"
            />
          </Col>

          {/* Lista e arsyeve në anën tjetër */}
          <Col xs={12} md={6} className="px-3 px-lg-4">
            <ul className="list-unstyled  mx-auto text-start">
              <li className="mb-3">
                <h5 className="text-danger fw-bold">Përbërës të Freskët</h5>
                <p>
                  Partnerët tanë përdorin vetëm përbërës cilësorë dhe të
                  freskët.
                </p>
              </li>
              <li className="mb-3">
                <h5 className="text-danger fw-bold">Shërbim Miqësor</h5>
                <p>
                  Mbështetje online miqësore dhe profesionale për çdo klient.
                </p>
              </li>
              <li className="mb-3">
                <h5 className="text-danger fw-bold">Dërgesë e Shpejtë</h5>
                <p>
                  Porosit online dhe shijo ushqimin tënd të ngrohtë dhe të
                  freskët në shtëpi.
                </p>
              </li>
              <li className="mb-3">
                <h5 className="text-danger fw-bold">Shërbim i Shkëlqyer</h5>
                <p>
                  Eksperiencë moderne me cilësi të besueshme dhe çmime të
                  arsyeshme.
                </p>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>

      <Container className="my-5">
        <h2 className="text-center mb-4">Çfarë Thonë Klientët Tanë</h2>
        <Row className="g-4">
          {datas.map((data, index) => (
            <Col xs={12} md={4} key={index}>
              <div className="p-4 bg-light rounded shadow h-100">
                <Row className="align-items-start">
                  <Col xs="auto">
                    <Image
                      src={data.img}
                      alt={data.name}
                      className="rounded-circle shadow-sm mb-3 "
                      width={100}
                      height={130}
                    />
                  </Col>
                  <Col>
                    <h6 className="fw-bold text-danger">{data.name}</h6>
                    <p className="mb-0">{data.text}</p>
                  </Col>
                </Row>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Home;
