import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import type { Socket } from 'socket.io-client';
import Webcam from 'react-webcam';

export default function App(){
  const [streamStarted, setStreamStarted] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket>();
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    const newSocket = io('https://localhost:3001/camera', {
      secure: true, // SSL/TLS 사용
      rejectUnauthorized: false, // 인증서 오류 무시
    });
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('streamStarted', (streamPath: string) => {
        if (streamPath === 'live/stream') {
          setStreamStarted(true);
        }
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from server');
        setStreamStarted(false);
      });
    }
  }, [socket]);

  return (
    <div>
      {!streamStarted && <div>Waiting for stream to start...</div>}
      {streamStarted && (
        <Webcam
          audio={false}
          mirrored={true}
          ref={webcamRef}
          style={{
            width: '100%',
            height: 'auto',
          }}
          videoConstraints={{
            width: 1280,
            height: 720,
            facingMode: 'user',
          }}
        />
      )}
    </div>
  );
};
