import { Route, Routes } from 'react-router-dom';
import ChatApp from './components/ChatApp';
import Rooms from './components/Rooms';

function App() {
    return (
        <Routes>
            <Route path="/fe-socket-test" element={<ChatApp />} />
            <Route
                path="/fe-socket-test/join/rooms/:roomName"
                element={<Rooms />}
            />
        </Routes>
    );
}

export default App;
