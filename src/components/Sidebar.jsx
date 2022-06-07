import React, { useContext, useEffect } from "react";
import { ListGroup, Row, Col } from "react-bootstrap";
import { BsCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import { addNotifications, resetNotifications } from "../features/userSlice.js";
import "./Sidebar.css";

const Sidebar = () => {
  //const rooms = ["General", "Tecnologia", "Finanzas", "Cripto"];
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
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

  const joinRoom = (room, isPublic = true) => {
    if (!user) {
      return alert("Please login");
    }
    socket.emit("join-room", room, currentRoom);
    setCurrentRoom(room);

    if (isPublic) {
      setPrivateMemberMsg(null);
    }
    // dispatch for notifications

    dispatch(resetNotifications(room));
  };
  socket.off("notifications").on("notifications", (room) => {
    if (currentRoom != room) dispatch(addNotifications(room));
  });

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

  const orderIds = (id1, id2) => {
    if (id1 > id2) {
      return id1 + "-" + id2;
    } else {
      return id2 + "-" + id1;
    }
  };

  const handlePrivateMemberMsg = (member) => {
    setPrivateMemberMsg(member);
    const roomId = orderIds(user._id, member._id);
    joinRoom(roomId, false);
  };

  if (!user) {
    return <></>;
  }
  return (
    <>
      <h2>Salas Disponibles</h2>
      <ListGroup>
        {rooms.map((room, idx) => (
          <ListGroup.Item
            key={idx}
            onClick={() => joinRoom(room)}
            active={room == currentRoom}
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {room}{" "}
            {currentRoom !== room && (
              <span className="badge rounded-pill bg-danger">
                {user.newMessage[room]}
              </span>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h2>Miembros</h2>
      {members.map((member) => (
        <ListGroup.Item
          key={member.id}
          style={{ cursor: "pointer" }}
          active={privateMemberMsg?._id == member?._id}
          onClick={() => handlePrivateMemberMsg(member)}
          disabled={member._id === user._id}
        >
          <Row>
            <Col xs={1} className="member-status">
              <img src={member.picture} className="member-status-img" />
              {member.status == "linea" ? (
                <i className="sidebar-online-status">
                  <BsCircleFill />
                </i>
              ) : (
                <i className="sidebar-offline-status">
                  <BsCircleFill />
                </i>
              )}
            </Col>
            <Col xs={9}>
              {member.name}
              {member._id === user?._id && " (You)"}
              {member.status == "offline" && " (Offline)"}
            </Col>
            <Col xs={1}>
              <span className="badge rounded-pill bg-danger">
                {user.newMessage[orderIds(member._id, user._id)]}
              </span>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </>
  );
};

export default Sidebar;
