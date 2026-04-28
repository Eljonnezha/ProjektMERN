import { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

function Register({ closeModal }) {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(newUser.email)) {
      setError("Ju lutem shkruani një adresë email të vlefshme");
      return;
    }
    try {
      await axios.post("http://localhost:5000/register", newUser);
      setError("");
      setSuccess("Llogaria u regjistrua me sukses!");
      setTimeout(() => closeModal(), 2000);
    } catch (err) {
      // shfaq mesazhin nese user qe po krijon tashme ekziston ose nje mesazh gabimi qe rregjistrimi deshtoi
      setError(err.response?.data || "Regjistrimi deshtoi"); 
      setSuccess("");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="px-3">
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form.Control
        name="username"
        placeholder="Username"
        onChange={handleChange}
        className="mb-2"
        required
      />
      <Form.Control
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="mb-2"
        type="email"
        required
      />
      <Form.Control
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        className="mb-2"
        required
      />
      <Button type="submit" className="w-100">
        Register
      </Button>
    </Form>
  );
}

export default Register;
