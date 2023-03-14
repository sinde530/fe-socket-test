import React, { useRef, useEffect } from 'react';
import io from 'socket.io-client';

function App() {
  const videoRef = useRef();

  useEffect(() => {
    const socket = io('http://localhost:3001');

    socket.on('frame', (data) => {
      const blob = new Blob([data], { type: 'video/mp4' });
      const url = URL.createObjectURL(blob);
      videoRef.current.src = url;
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay />
      <p>qwewqe</p>
    </div>
  );
}

export default App;
