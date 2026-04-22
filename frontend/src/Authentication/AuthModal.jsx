import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

function AuthModal({ show, handleClose }) {
  const [mode, setMode] = useState("login"); // state per te menaxhuar nese jemi ne modalin e login apo register

  return (
    <Modal show={show} onHide={handleClose} centered>
      
      {/* header */}
      <Modal.Header closeButton className="border-0 bg-light">
        <Modal.Title className="w-100 text-center">
          {mode === "login" ? "Login" : "Register"}
        </Modal.Title>
      </Modal.Header>

      {/* body */}
      <Modal.Body className="px-4 py-3 bg-light">

        {/* kontenti ku shfaqet login ose register */}
        {mode === "login" ? (
          <Login closeModal={handleClose} />
        ) : (
          <Register closeModal={handleClose} />
        )}

        {/* butonat ku mund te kalohet nga login ne register dhe anasjelltas */}
        <div className="text-center mt-3 ">
          {mode === "login" ? (
            <span
              onClick={() => setMode("register")}
            >
              Don't have an account? <Button className="ms-2" onClick={() => setMode("register")}>Register</Button>
            </span>
          ) : (
            <span>
              Already have an account?<Button className="ms-2" onClick={() => setMode("login")}>Login</Button>
            </span>
          )}
        </div>

      </Modal.Body>
    </Modal>
  );
}

export default AuthModal;