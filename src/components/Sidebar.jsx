import React, { useContext, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";

const Sidebar = () => {
  //const rooms = ["General", "Tecnologia", "Finanzas", "Cripto"];
  const user = useSelector((state) => state.user);
  const {
    socket,
    rooms,
    setRooms,
    currentRoom,
    setCurrentRoom,
    members,
    setMembers,
    privateMemberMsg,
    setPrivateMemberMsg,
  } = useContext(AppContext);

  useEffect(() => {
    if (user) {
      setCurrentRoom("general");
      getRooms();
      socket.emit("join-room", "general");
      socket.emit("new-user");
    }
  }, []);

  socket.off("new-user").on("new-user", (payload) => {
    setMembers(payload);
  });
  const getRooms = () => {
    fetch("http://localhost:5050/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  };

  if (!user) {
    return <></>;
  }
  return (
    <>
      <h2>Salas Disponibles</h2>
      <ListGroup>
        {rooms.map((room, index) => (
          <ListGroup.Item key={index}>{room}</ListGroup.Item>
        ))}
      </ListGroup>
      <h2>Miembros</h2>
      {members.map((member) => (
        <ListGroup.Item key={member.id} style={{ cursor: "pointer" }}>
          {member.name}
        </ListGroup.Item>
      ))}
    </>
  );
};

export default Sidebar;
