import { Route, Routes } from 'react-router-dom';
import Room from './components/Room';

export default function App() {
    return (
        <Routes>
            <Route path="/fe-socket-test" element={<Room />} />
        </Routes>
    );
}
