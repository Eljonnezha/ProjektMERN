import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import { Form, Button, Alert } from "react-bootstrap";

function Login({ closeModal }) {
  const { setUserInfo } = useContext(UserContext);

  const [userLog, setUserLog] = useState({
    email: "",
    password: "",
  });

  const [valid, setValid] = useState("");

  const handleChange = (e) => {
    setUserLog({
      ...userLog,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try { 
      await axios.post("http://localhost:5000/login/", userLog, {
        withCredentials: true,
      });

      const res = await axios.get("http://localhost:5000/user/", {
        withCredentials: true,
      });

      setUserInfo(res.data);

      setValid(""); // pastron çdo mesazh gabimi nese kishte me pare
      closeModal();
      
    } catch (err) {
      setValid("Invalid email or password");
    }
  };
  return (
    <Form onSubmit={handleSubmit} className="px-3">
      {valid && <Alert variant="danger">{valid}</Alert>}
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
      />

      <Button type="submit" className="w-100">
        Login
      </Button>
    </Form>
  );
}

export default Login;
