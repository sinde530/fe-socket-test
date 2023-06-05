import { useEffect, useState } from "react";

const ChatWebSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080/ws");

    setSocket(newSocket);

    newSocket.onmessage = (event) => {
      const received = event.data;
      setMessages((prevMessages) => [...prevMessages, received]);
    };

    // console error 방지하기 위해 주석.
    // newSocket.onerror = (error) => {
    //   console.error('WebSocket error:', error);
    // };

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
      setMessage("");
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatWebSocket;
