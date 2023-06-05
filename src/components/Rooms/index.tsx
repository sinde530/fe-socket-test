import { useParams } from 'react-router-dom';

export default function Rooms() {
    const { roomid } = useParams();
    return <div>Room ID: {roomid}</div>;
}
