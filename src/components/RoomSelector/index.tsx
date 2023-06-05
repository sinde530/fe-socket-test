import React from 'react';
import styled from '@emotion/styled';

const ContainerStyles = styled.div`
    margin-bottom: 20px;
`;

const RoomListStyles = styled.div`
    display: flex;
`;

const RoomItemStyles = styled.div<{ isSelected: boolean }>`
    padding: 10px;
    margin-right: 10px;
    background-color: ${(props) =>
        props.isSelected ? 'lightblue' : 'lightgray'};
    cursor: pointer;
`;

interface RoomSelectorProps {
    rooms: string[];
    selectedRoom: string;
    onSelectRoom: (room: string) => void;
    roomUserCounts: { [key: string]: number };
}

const RoomSelector: React.FC<RoomSelectorProps> = ({
    rooms,
    selectedRoom,
    onSelectRoom,
    roomUserCounts,
}) => {
    const handleRoomClick = (room: string) => {
        onSelectRoom(room);
    };

    const handleRoomKeyPress = (
        event: React.KeyboardEvent<HTMLDivElement>,
        room: string,
    ) => {
        if (event.key === 'Enter') {
            onSelectRoom(room);
        }
    };

    return (
        <ContainerStyles>
            <h2>Select a Room:</h2>
            <RoomListStyles>
                {rooms.map((room) => (
                    <RoomItemStyles
                        key={room}
                        isSelected={room === selectedRoom}
                        onClick={() => handleRoomClick(room)}
                        onKeyPress={(e) => handleRoomKeyPress(e, room)}
                        role="button"
                        tabIndex={0}
                    >
                        {room} ({roomUserCounts[room] || 0} users)
                    </RoomItemStyles>
                ))}
            </RoomListStyles>
        </ContainerStyles>
    );
};

export default RoomSelector;
