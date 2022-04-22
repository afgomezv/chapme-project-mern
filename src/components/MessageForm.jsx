import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { FaPaperPlane } from "react-icons/fa";
import "./MessageForm.css";

const MessageForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="messages-output"></div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={11}>
            <Form.Control type="text" placeholder="Tu mensaje"></Form.Control>
          </Col>
          <Col md={1}>
            <Button variant="primary" type="submit" className="btn-message">
              <FaPaperPlane className="btn-icon" />
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default MessageForm;
