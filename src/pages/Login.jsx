import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import "../styles/Login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://404-server-production.up.railway.app/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "email": email, "password": password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("access_token", data.access_token);
        
        localStorage.setItem("role", data.role);
        // localStorage.setItem("fullName", data.user.fullName);
        localStorage.setItem("refresh_token",data.refresh_token)
        alert("Login successful!");
        navigate(`/${data.role}`);
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <motion.div
    className="login-container"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <motion.div
        className="login-card"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        <Card.Body>
          <h2 className="text-center mb-4 text-light">Sign In</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field"
              />
            </Form.Group>

            <Button variant="danger" type="submit" className="w-100 login-button">
              Sign In
            </Button>
          </Form>

          <p className="text-center mt-3 text-light">
            New to our platform? <a href="/signup" className="text-info">Sign up now</a>
          </p>
        </Card.Body>
      </motion.div>
    </Container>
  </motion.div>
  );
}

export default Login;