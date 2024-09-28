
import './App.css';
import io from 'socket.io-client'
import { useState } from "react";
import Chat from "./Chat";

const socket= io.connect("http://localhost:3001");
function App() {

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);


  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };



  return (
    <div>
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join</h3>
          <input
            type="text"
            placeholder="eman..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Lets Start</button>
        </div>
       ) : ( 
        <Chat socket={socket} username={username} room={room} />
      )} 
    </div>
    </div>
  );
}

export default App;
