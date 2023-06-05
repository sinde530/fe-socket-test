import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { w3cwebsocket as WebSocket } from 'websocket';
import RoomSelector from '../RoomSelector';

const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
`;

const RoomContainer = styled.div`
    margin-bottom: 20px;
`;

const MessageList = styled.div`
    height: 200px;
    overflow-y: auto;
    border: 1px solid lightgray;
    padding: 10px;
`;

const MessageItem = styled.div`
    margin-bottom: 10px;
`;

const MessageInputContainer = styled.div`
    display: flex;
    margin-top: 10px;

    input {
        flex-grow: 1;
        margin-right: 10px;
    }

    button {
        background-color: lightblue;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
    }
`;

const Alert = styled.div`
    background-color: lightpink;
    padding: 10px;
    margin-top: 10px;
    text-align: center;
`;

export default function Room() {
    const [selectedRoom, setSelectedRoom] = useState('');
    const [rooms, setRooms] = useState<string[]>([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [messages, setMessages] = useState<React.ReactNode[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [roomUserCounts, setRoomUserCounts] = useState<{
        [key: string]: number;
    }>({});

    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        // setRooms(['room1', 'room2']);
        const predefinedRooms = ['room1', 'room2'];
        setRooms(predefinedRooms);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/rooms');
                const contentType = response.headers.get('content-type');
                if (
                    contentType &&
                    contentType.indexOf('application/json') !== -1
                ) {
                    if (!response.ok) {
                        throw new Error('Failed to fetch rooms');
                    }
                    const data = await response.json();
                    setRooms(data);
                } else {
                    console.error(
                        'Received non-JSON response:',
                        await response.text(),
                    );
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedRoom === '') {
            setMessages([]);
            return;
        }

        ws.current = new WebSocket(`ws://localhost:8080/ws/${selectedRoom}`);

        ws.current.onopen = () => {
            console.log('Connected to WebSocket');
        };

        ws.current.onmessage = (event) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                <>{event.data}</>, // event.data를 ReactNode로 변환
            ]);
        };

        ws.current.onclose = () => {
            console.log('Disconnected from WebSocket');
        };

        // eslint-disable-next-line consistent-return
        return () => {
            ws.current?.close();
        };
    }, [selectedRoom]);

    useEffect(() => {
        const fetchUserCount = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/api/rooms/${selectedRoom}/users`,
                );
                const data = await response.json();
                setRoomUserCounts((prev) => ({
                    ...prev,
                    [selectedRoom]: data.count,
                }));
                console.log('21312');
            } catch (error) {
                console.error(error);
            }
        };

        if (selectedRoom !== '') {
            fetchUserCount();
        }
    }, [selectedRoom]);

    const handleSelectRoom = (room: string) => {
        if (rooms.includes(room)) {
            setSelectedRoom(room);
            setAlertMessage('');
        } else {
            setAlertMessage('This room does not exist.');
        }
    };

    const handleSendMessage = () => {
        if (ws.current && inputMessage.trim() !== '') {
            ws.current.send(inputMessage);
            setInputMessage('');
        }
    };

    return (
        <Container>
            <h1>Chat App</h1>
            <RoomSelector
                rooms={rooms}
                selectedRoom={selectedRoom}
                onSelectRoom={handleSelectRoom}
                roomUserCounts={roomUserCounts}
            />
            {selectedRoom !== '' && (
                <RoomContainer>
                    <h2>Room: {selectedRoom}</h2>
                    <MessageList>
                        {messages.map((message, index) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <MessageItem key={index}>{message}</MessageItem>
                        ))}
                    </MessageList>
                    <MessageInputContainer>
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <button type="button" onClick={handleSendMessage}>
                            Send
                        </button>
                    </MessageInputContainer>
                </RoomContainer>
            )}
            {alertMessage !== '' && <Alert>{alertMessage}</Alert>}
        </Container>
    );
}
