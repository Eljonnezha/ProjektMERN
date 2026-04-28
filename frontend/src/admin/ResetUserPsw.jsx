import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetUserPsw() {
  const { id } = useParams();
  const nav = useNavigate();

  const [resetPsw, setResetPsw] = useState({
    password: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setResetPsw({ ...resetPsw, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (resetPsw.password === "") {
      setError("Please enter a password");
      return;
    }
    setError("");

    await axios
      .put("http://localhost:5000/reset-password/" + id, resetPsw)
      .then((res) => {
        setSuccess("Password reset successfully");
        setTimeout(() => nav("/admin/dashboard/users"), 2000);
      })
      .catch((err) => {
        setError("Error resetting password");
        console.log(err);
      });
  };

  return (
    <Container className="my-5">
      <Alert variant="success" show={success} className="w-25 mx-auto my-4">{success}</Alert>
      <Alert variant="danger" show={error} className="w-25 mx-auto my-4">{error}</Alert>
      <Form className="w-25 mx-auto p-4 bg-light rounded shadow" onSubmit={handleSubmit}>
        <h3 className="text-center fs-5 my-4">Reset User Password</h3>
       <Form.Group className="mb-4">
        <Form.Label className="text-muted">New Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          placeholder="Enter new password"
          value={resetPsw.password}
          onChange={handleChange}
        />
      </Form.Group>

        <Button type="submit" className="mb-4 w-100">
          Reset Password
        </Button>
      </Form>
    </Container>
  );
}

export default ResetUserPsw;
