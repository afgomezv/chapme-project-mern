import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AiFillWechat } from "react-icons/ai";
import "./Home.css";

const Home = () => {
  return (
    <Row className="home__container">
      <Col>
        <div md={6} className="home__message-text">
          <h2>Comporta el mundo con tus amigos</h2>
          <p>ChatMe te permite conectarte con el mundo</p>
          <LinkContainer to="/chat">
            <Button variant="success" className="home__message-icon ">
              Empezar
              <AiFillWechat />
            </Button>
          </LinkContainer>
        </div>
      </Col>
      <Col md={6} className="home__bg"></Col>
    </Row>
  );
};

export default Home;
