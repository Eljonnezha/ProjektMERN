import { Navbar, Container, Nav, Button } from "react-bootstrap";
import logo from "../image/logo.jpg";
import { UserContext } from "../Authentication/UserContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthModal from "../Authentication/AuthModal.jsx";

function Navigationbar({ cart, openCart }) {
  // llogarisim totalin e sasis se itemeve ne cart
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  const nav = useNavigate();

  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    const userData = async () => {
      if (!userInfo.email) {
        await axios
          .get("http://localhost:5000/user/", { withCredentials: true })
          .then((res) => setUserInfo(res.data))
          .catch((err) => {
            console.log("No login");
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

  // shfaqim modalin per login dhe register kur useri klikon butonin register/login
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

              {userInfo.role === "admin" && (
                <Nav.Link
                  href="/admin/dashboard/add-item"
                >
                  AdminDashboard
              </Nav.Link>
              )}
            </Nav>
            {/* nese useri eshte i loguar shfaqet butoni i cart nese jo shfaqet butoni per login dhe register */}
            {userInfo.email && (
              <Button
                variant="danger"
                className="px-4 rounded-pill me-5"
                onClick={openCart}
              >
                <i className="bi bi-cart ms-2"></i> ({totalQuantity}) 
              </Button>
            )}
            {/* nese useri nuk eshte i loguar shfaqet butoni per login dhe register */}
            {!userInfo.email && (
              <Button
                variant="primary"
                className="rounded-pill px-4 me-5"
                onClick={() => setShowAuth(true)}
              >
                Register / Login
              </Button>
            )}
            {/* nese useri eshte i loguar shfaqet icona e userit dhe informacioni i userit dhe butoni per logout */}
            {userInfo.email ? (
              <div className="my-3 d-flex align-items-center gap-3  ">
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
