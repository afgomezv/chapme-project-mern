import Navigation from "./components/Navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { AppContext, socket } from "./context/appContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import "./App.css";

function App() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setnewMessages] = useState({});
  const user = useSelector((state) => state.user);

  return (
    <AppContext.Provider
      value={{
        socket,
        rooms,
        setRooms,
        currentRoom,
        setCurrentRoom,
        members,
        setMembers,
        messages,
        setMessages,
        privateMemberMsg,
        setPrivateMemberMsg,
        newMessages,
        setnewMessages,
      }}
    >
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          {!user && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
