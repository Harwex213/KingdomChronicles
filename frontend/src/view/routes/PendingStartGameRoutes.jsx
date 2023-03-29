import { Navigate, Route, Routes } from "react-router-dom";
import { PENDING_START_GAME_ROUTES } from "../../common/constants/routes";
import { PendingStartGameScreen } from "../screens/pending-start-game/PendingStartGameScreen";

const routes = {
    pendingStartGame: `/${PENDING_START_GAME_ROUTES.PENDING_START_GAME}`,
};

const PendingStartGame = () => {
    return (
        <Routes>
            <Route path={routes.pendingStartGame} element={<PendingStartGameScreen />} />
            <Route path="/" element={<Navigate to={routes.pendingStartGame} replace={true} />} />
            <Route path="*" element={<Navigate to={routes.pendingStartGame} replace={true} />} />
        </Routes>
    );
};

export { PendingStartGame };
