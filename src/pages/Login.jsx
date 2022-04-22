import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // login logic
  };

  return (
    <Container>
      <Row>
        <Col md={5} className="login__bg"></Col>
        <Col md={6} className="login__form ">
          <Form className="login__form-box" onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicCheckbox"
            ></Form.Group>
            <Button variant="primary" type="submit">
              Ingresar
            </Button>
            <div className="py-4">
              <p className="text-center">
                ¿No tienes cuenta? <Link to="/signup">Registrarse</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
