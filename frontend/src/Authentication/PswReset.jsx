import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

function PswReset({ closeModal }) {

  const [resetPsw, setResetPsw] = useState({
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setResetPsw({ ...resetPsw, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (resetPsw.email === "") {
      setError("Please enter your email");
      return;
    }
    if (resetPsw.password === "") {
      setError("Please enter a password");
      return;
    }
    setError("");

    await axios
      .put("http://localhost:5000/reset-password", resetPsw)
      .then((res) => {
        setSuccess("Password reset successfully");

        setTimeout(() => {
          closeModal();
          setSuccess("");
          setResetPsw({
            email: "",
            password: "",
          });
        }, 1500);
      })
      .catch((err) => {
        setError("Error resetting password");
        console.log(err);
      });
  };

  return (
    <Form  onSubmit={handleSubmit}>
      <Alert variant="success" show={success} className="w-100 mx-auto my-4">
        {success}
      </Alert>
      <Alert variant="danger" show={error} className="w-100 mx-auto my-4">
        {error}
      </Alert>
      <Form.Group className="mb-3 w-75 mx-auto">
        <Form.Control
          name="email"
          type="email"
          placeholder="Enter your email"
          value={resetPsw.email}
          onChange={handleChange}
          className="mb-2"
        />
        <Form.Control
          name="password"
          type="password"
          placeholder="Enter new password"
          value={resetPsw.password}
          onChange={handleChange}
        />
      </Form.Group>

      <Button type="submit" className="mb-4 w-75 mx-auto d-block">
        Reset Password
      </Button>
    </Form>
  );
}

export default PswReset;
