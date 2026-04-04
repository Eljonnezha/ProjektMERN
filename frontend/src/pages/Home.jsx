import HomeImage from "../image/homeimg.jpg";
import ChooseUsImg from "../image/chooseUSImg.jpg";
import { Button, Container, Image, Row, Col } from "react-bootstrap";
import meals from "../projectInfo/meals.js";
import datas from "../projectInfo/customers.js";

function Home() {
  return (
    <div id="menu">
      <div className="hero-container">
        <Image src={HomeImage} alt="Home" className="imgcover" fluid />
        <div className="hero-text text-center px-3">
          <h1 className="fw-bold text-white fs-md-1 mb-3">
            Welcome to Our Restaurant
          </h1>
          <p className="text-white fs-5 fs-md-5">
            Discover our delicious food while you order it now
          </p>
          <Button variant="danger" size="lg" href="/menu">
            View Menu
          </Button>
        </div>
      </div>

      <Container >
        <h2 className="text-center my-5">Our Specialities</h2>
        <Row className="g-4">
          {meals.slice(10, 13).map((meal, index) => (
            <Col xs={12} sm={6} md={4} key={index}>
              <div className="card h-100">
                <Image
                  src={meal.image}
                  className="card-img-top img-fluid" 
                  alt={meal.name}
                  
                />
                <div className="card-body d-flex flex-column">
                  <h5>{meal.name}</h5>
                  <p className="flex-grow-1">{meal.description}</p>
                  <p className="fw-bold">{meal.price} €</p>
                  <Button variant="danger" className="mt-auto" href="/menu">
                    View Menu
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      <Container fluid className="my-5 bg-light p-3 p-md-5">
        <h2 className="text-center py-4 py-md-5">Why Choose Us</h2>
        <Row className="align-items-center">
          {/* Foto në njërën anë */}
          <Col xs={12} md={6} className="d-none d-lg-block ps-lg-5">
            <Image
              src={ChooseUsImg}
              alt="Restaurant Interior"
              className="img-fluid  rounded shadow"
            />
          </Col>

          {/* Lista e arsyeve në anën tjetër */}
          <Col xs={12} md={6} className="px-3 px-lg-4">
            <ul className="list-unstyled  mx-auto text-start">
              <li className="mb-3">
                <h5 className="text-danger fw-bold">Fresh Ingredients</h5>
                <p>We prepare every dish using the freshest local produce.</p>
              </li>
              <li className="mb-3">
                <h5 className="text-danger fw-bold">Friendly Service</h5>
                <p>Our team welcomes you with warmth and professionalism.</p>
              </li>
              <li className="mb-3">
                <h5 className="text-danger fw-bold">Cozy Ambience</h5>
                <p>Enjoy a relaxing atmosphere perfect for any occasion.</p>
              </li>
              <li className="mb-3">
                <h5 className="text-danger fw-bold">Fast Delivery</h5>
                <p>Order online and enjoy your meal hot and fresh at home.</p>
              </li>
              <li className="mb-3">
                <h5 className="text-danger fw-bold">Great Value</h5>
                <p>Delicious meals at fair prices — quality you can trust.</p>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>

      <Container className="my-5">
        <h2 className="text-center mb-4">What Our Customers Say</h2>
        <Row className="g-4">
          {datas.map((data, index) => (
            <Col xs={12} md={4} key={index}>
              <div className="p-4 bg-light rounded shadow h-100">
                <Row className="align-items-start">
                  <Col xs="auto">
                    <Image
                      src={data.img}
                      alt={data.name}
                      className="rounded-circle shadow-sm mb-3"
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

      <footer className="bg-dark text-white py-5">
        <Container>
          <Row className="g-4 text-center text-md-start">
            {/* Contact Us */}
            <Col xs={12} md={4}>
              <h5 className="mb-3">Contact Us</h5>
              <a href="mailto:info@restaurant.com">
                Email: info@restaurant.com
              </a>
              <br />
              <a href="tel:+11234567890">Phone: (123) 456-7890</a>
              <br />
              <a
                href="https://maps.app.goo.gl/wnnrhMurzLMNH8RS6"
                target="_blank"
                rel="noopener noreferrer"
              >
                Address: 123 Main Street, Tirane
              </a>
            </Col>

            {/* Social Media */}
            <Col xs={12} md={4}>
              <h5 className="mb-3">Follow Us</h5>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-facebook p-1"></i> Facebook
              </a>
              <br />
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-instagram p-1"></i> Instagram
              </a>
              <br />
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-twitter p-1"></i> Twitter
              </a>
            </Col>

            {/* Opening Hours */}
            <Col xs={12} md={4}>
              <h5 className="mb-3">Opening Hours</h5>
              <p>Mon - Fri: 9:00 AM - 10:00 PM</p>
              <p>Sat - Sun: 10:00 AM - 11:00 PM</p>
            </Col>
          </Row>

          <hr className="bg-light" />

          {/* Copyright */}
          <p className="text-center mb-0">
            &copy; 2026 Restaurant | All rights reserved
          </p>
        </Container>
      </footer>
    </div>
  );
}

export default Home;
