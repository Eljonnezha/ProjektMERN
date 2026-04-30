import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import PswReset from "./PswReset";

function AuthModal({ show, handleClose }) {
  const [mode, setMode] = useState("login"); // state per te menaxhuar nese jemi ne modalin e login, register, ose reset password

  return (
    <Modal show={show} onHide={handleClose} centered>
      {/* header */}
      <Modal.Header closeButton className="border-0 bg-light">
        <Modal.Title className="w-100 text-center">
          {mode === "login"
            ? "Login"
            : mode === "register"
              ? "Register"
              : "Reset Password"}
        </Modal.Title>
      </Modal.Header>

      {/* body */}
      <Modal.Body className="px-4 py-3 bg-light">
        {/* kontenti ku shfaqet login ose register */}
        {mode === "login" ? (
          <Login closeModal={handleClose} />
        ) : mode === "register" ? (
          <Register closeModal={handleClose} />
        ) : (
          <PswReset closeModal={() => setMode("login")} />
        )}

        {/* butonat ku mund te kalohet nga login ne register dhe anasjelltas */}
        <div className="text-center mt-3 ">
          {mode === "login" ? (
            <span>
              Nuk keni një llogari?
              <Button className="ms-2" onClick={() => setMode("register")}>
                Regjistrohu
              </Button>
            </span>
          ) : (
            <span>
              E keni tashme nje llogari?
              <Button className="ms-2" onClick={() => setMode("login")}>
                Login
              </Button>
            </span>
          )}
          <span className="d-block mt-4 w-100 text-muted">
            Nëse keni harruar fjalëkalimin?{" "}
            <Button
              variant="link"
              className="p-0 text-decoration-none"
              onClick={() => setMode("reset")}
            >
              Forgot Password?
            </Button>
          </span>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AuthModal;
