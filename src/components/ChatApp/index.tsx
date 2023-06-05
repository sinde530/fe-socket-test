import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    AutoBox,
    Container,
    NickName,
    PaddingTopBox,
    RoomCard,
    RoomInfo,
    RoomTitle,
    RoomsBox,
    RoomsText,
    ModalWrapper,
    ModalContent,
    ModalTitle,
    ModalInput,
    ModalButton,
} from './styled';

const socket = io('http://localhost:8080');

interface Room {
    id: string;
    title: string;
    currentUsers: number;
    maxUsers: number;
}

export default function ChatApp() {
    const navigate = useNavigate();
    const [nickName, setNickname] = useState('');
    const [rooms, setRooms] = useState<Room[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newRoomTitle, setNewRoomTitle] = useState('');
    const [newRoomMaxUsers, setNewRoomMaxUsers] = useState(0);
    const mockName = ['가나다', '라마바', '아자라', '지리아', '클아자'];

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * mockName.length);
        setNickname(mockName[randomIndex]);

        // rooms join
        socket.emit('join', '/');

        socket.on('rooms', (updatedRooms) => {
            console.log("'rooms' event received, updated rooms:", updatedRooms);
            setRooms(updatedRooms);
        });

        socket.on('roomCreated', (newRoom) => {
            console.log("'rooms' event received, updated rooms:", newRoom);
            setRooms(newRoom);
        });

        // 컴포넌트 언마운트 시 소켓 연결 해제
        return () => {
            socket.disconnect();
        };
    }, [socket]);

    const createRoom = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setNewRoomTitle('');
        setNewRoomMaxUsers(0);
    };

    const handleRoomTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewRoomTitle(e.target.value);
    };

    const handleMaxUsersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        setNewRoomMaxUsers(value);
    };

    const confirmCreateRoom = async () => {
        if (newRoomMaxUsers < 2 || Number.isNaN(newRoomMaxUsers)) {
            alert('인원은 최소 2명으로 해주세요.');
            return;
        }
        const newRoom: Room = {
            id: '',
            title: newRoomTitle,
            currentUsers: 0,
            maxUsers: newRoomMaxUsers,
        };

        try {
            const response = await axios.post<Room>(
                'http://localhost:8080/rooms',
                newRoom,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
            console.log(response.data);
            closeModal();

            socket.emit('joinRoom', response.data.id);

            // 업데이트된 방 정보를 기존 rooms 상태에 추가하여 업데이트
            socket.on('roomCreated', (newRoom) => {
                setRooms((prevRooms) => [...prevRooms, newRoom]);
            });

            navigate(`/fe-socket-test/rooms/${response.data.id}/chat`);
        } catch (error) {
            console.error('Error:', error);
            closeModal();
        }
    };

    return (
        <Container>
            <PaddingTopBox>
                <NickName
                    type="input"
                    value={nickName}
                    onChange={(e) => setNickname(e.target.value)}
                />
                <AutoBox>
                    <RoomsText>Rooms: {rooms.length}</RoomsText>
                    <button type="button" onClick={createRoom}>
                        방 생성하기
                    </button>
                </AutoBox>

                <RoomsBox>
                    {rooms.map((room, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <RoomCard key={index}>
                            <RoomTitle>{room.title}</RoomTitle>
                            <RoomInfo>
                                인원: {room.currentUsers}/{room.maxUsers}
                            </RoomInfo>
                        </RoomCard>
                    ))}
                </RoomsBox>
            </PaddingTopBox>

            {modalVisible && (
                <ModalWrapper>
                    <ModalContent>
                        <ModalTitle>방 생성</ModalTitle>
                        <ModalInput
                            type="text"
                            placeholder="방 제목"
                            value={newRoomTitle}
                            onChange={handleRoomTitleChange}
                        />
                        <ModalInput
                            type="number"
                            placeholder="최대 인원"
                            value={newRoomMaxUsers}
                            onChange={handleMaxUsersChange}
                        />
                        <ModalButton onClick={confirmCreateRoom}>
                            생성
                        </ModalButton>
                        <ModalButton onClick={closeModal}>취소</ModalButton>
                    </ModalContent>
                </ModalWrapper>
            )}
        </Container>
    );
}
