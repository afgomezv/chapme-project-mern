import React from "react";
import { ListGroup } from "react-bootstrap";

const Sidebar = () => {
  const rooms = ["sala 1", "sala 2", "sala 3", "sala 4"];
  return (
    <>
      <h2>Salas Disponibles</h2>
      <ListGroup>
        {rooms.map((room, index) => (
          <ListGroup.Item key={index}>{room}</ListGroup.Item>
        ))}
      </ListGroup>
      <h2>Miembros</h2>
    </>
  );
};

export default Sidebar;
