import { Navigate, Route, Routes } from "react-router-dom";
import { MapScreen } from "./map-screen/MapScreen.jsx";
import { GameScreen } from "./game-screen/GameScreen.jsx";

const App = () => {
    return (
        <Routes>
            <Route path="/game" element={<GameScreen />} />
            <Route path="/map" element={<MapScreen />} />
            <Route path="/" element={<Navigate to="/map" replace />} />
            <Route path="*" element={<Navigate to="/game" replace />} />
        </Routes>
    );
};

export { App };
