import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ChatApp() {
    const [nickname, setNickname] = useState('');
    const [roomName, setRoomName] = useState('');
    const [maxUsers, setMaxUsers] = useState(0);
    const [rooms, setRooms] = useState<string[]>([]);
    const mockName = ['가나다', '라마바', '아자라', '지리아', '클아자'];

    useEffect(() => {
        // 무작위 닉네임 선택
        const randomIndex = Math.floor(Math.random() * mockName.length);
        setNickname(mockName[randomIndex]);

        // 서버로부터 방 목록 가져오기
        axios
            .get<string[]>('http://localhost:8080/rooms')
            .then((response) => {
                setRooms(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleJoin = () => {
        // 서버로 nickname 전송
        axios.get(`http://localhost:8080/join/${roomName}`).then((response) => {
            console.log(response.data);
        });
    };

    const handleCreateRoom = () => {
        // 서버로 roomName과 maxUsers 전송
        axios
            .post('http://localhost:8080/create-room', {
                name: roomName,
                max_users: maxUsers,
            })
            .then((response) => {
                console.log(response.data);
                // 방 생성 후 방 목록 업데이트
                setRooms([...rooms, roomName]);
            });
    };

    const handleDeleteRoom = () => {
        // 서버로 roomName 전송
        axios
            .delete(`http://localhost:8080/delete-room/${roomName}`)
            .then((response) => {
                console.log(response.data);
                // 방 삭제 후 방 목록 업데이트
                setRooms(rooms.filter((room) => room !== roomName));
            });
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
            />
            <button type="button" onClick={handleJoin}>
                Join
            </button>

            <input
                type="text"
                placeholder="Enter room name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Enter max users"
                value={maxUsers}
                onChange={(e) => setMaxUsers(parseInt(e.target.value, 10))}
            />
            <button type="button" onClick={handleCreateRoom}>
                Create Room
            </button>
            <button type="button" onClick={handleDeleteRoom}>
                Delete Room
            </button>

            <div>
                <h2>Rooms:</h2>
                {rooms.map((room, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={index}>{room}</div>
                ))}
            </div>
        </div>
    );
}
