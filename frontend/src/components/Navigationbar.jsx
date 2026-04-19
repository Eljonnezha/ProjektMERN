import { Navbar, Container, Nav, Button } from "react-bootstrap";
import logo from "../image/logo.jpg";
import { UserContext } from "../Authentication/UserContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthModal from "../Authentication/AuthModal.jsx";

function Navigationbar({ cart, openCart }) {
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  const nav = useNavigate();

  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    const userData = async () => {
      if (!userInfo.email) {
        await axios
          .get("http://localhost:5000/user/", {
            withCredentials: true,
          })
          .then((res) => setUserInfo(res.data))
          .catch((err) => {
            console.log("No data " + err);
          });
      }
    };

    userData();
  }, [userInfo, setUserInfo]);

  const handleLogout = async () => {
    await axios
      .post("http://localhost:5000/logout/", null, { withCredentials: true })
      .then((res) => {
        setUserInfo({});
        nav("/", { replace: true });
      })
      .catch((err) => console.log("Not logout"));
  };

  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      <Navbar expand="lg" className="bg-white shadow-sm sticky-top py-3">
        <Container>
          <Navbar.Brand href="/" className="fw-bold fs-4 text-danger">
            <img
              src={logo}
              alt="Logo"
              className="me-2 img-fluid navImg rounded-circle p-2"
            />
            EatNow
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto gap-4 custom-nav mb-3">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/menu">Menu</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/contact">Contact Us</Nav.Link>

              <Nav.Link
                href="/admin/dashboard/add-item"
                target="_blank"
                rel="noopener noreferrer"
              >
                AdminDashboard
              </Nav.Link>
            </Nav>

            {userInfo.email && (
              <Button
                variant="danger"
                className="px-4 rounded-pill me-5"
                onClick={openCart}
              >
                View Cart ({totalQuantity}) <i className="bi bi-cart ms-2"></i>
              </Button>
            )}

            {!userInfo.email && (
              <Button
                variant="primary"
                className="me-2 px-4 rounded-pill"
                onClick={() => setShowAuth(true)}
              >
                Register / Login
              </Button>
            )}

            {userInfo.email ? (
              <div className="mx-3 d-flex align-items-center gap-3 ">
                <Nav.Link href="/user/">
                  <i className="bi bi-person-circle ms-2 fs-4 me-2"></i>
                  {userInfo.username}
                </Nav.Link>

                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </div>
            ) : null}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <AuthModal show={showAuth} handleClose={() => setShowAuth(false)} />
    </>
  );
}

export default Navigationbar;
