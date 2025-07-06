import './App.css'
import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import { useParams } from 'react-router-dom'

const socket = io("http://localhost:3001");

function App() {
  const { id } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    socket.emit("join", id);

    socket.on("receive-changes", (data) => {
      setContent(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    socket.emit("content-change", e.target.value);
  };

  return (
    <>
      <div>
        <textarea
          value={content}
          onChange={handleChange}
          className="w-full h-screen p-4 text-lg"
        />
      </div>
    </>
  )
}

export default App
