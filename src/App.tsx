import { Route, Routes } from 'react-router-dom';
import ChatApp from './components/ChatApp';
import Rooms from './components/Rooms';

export default function App() {
    return (
        <Routes>
            <Route path="/fe-socket-test" element={<ChatApp />} />
            <Route
                path="/fe-socket-test/rooms/:roomid/chat"
                element={<Rooms />}
            />
        </Routes>
    );
}
