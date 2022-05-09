import React, { useContext, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { FaPaperPlane } from "react-icons/fa";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import "./MessageForm.css";

const MessageForm = () => {
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.user);
  const { socket, currentRoom, setMessages, messages, privateMemberMsg } =
    useContext(AppContext);

  const getFormattedDate = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();

    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();

    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  };

  const todayDate = getFormattedDate();

  socket.off("room-messages").on("room-messages", (roomMessages) => {
    console.log("room-messages", roomMessages);
    setMessages(roomMessages);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    const today = new Date();
    const minutes =
      today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours + ":" + minutes;
    const roomId = currentRoom;
    socket.emit("message-room", roomId, message, user, time, todayDate);
    setMessage("");
  };
  return (
    <>
      <div className="messages-output">
        {!user && <div className="alert-danger">Please login</div>}
      </div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={11}>
            <Form.Control
              type="text"
              placeholder="Tu mensaje"
              disabled={!user}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></Form.Control>
          </Col>
          <Col md={1}>
            <Button
              variant="primary"
              type="submit"
              className="btn-message"
              disabled={!user}
            >
              <FaPaperPlane className="btn-icon" />
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default MessageForm;
