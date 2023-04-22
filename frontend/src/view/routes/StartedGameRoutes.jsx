import { Navigate, Route, Routes } from "react-router-dom";
import { STARTED_GAME_ROUTES } from "../../common/constants/routes";
import { GameScreen } from "../screens/game/GameScreen";

const routes = {
    game: `/${STARTED_GAME_ROUTES.GAME}`,
};

const StartedGameRoutes = () => {
    return (
        <Routes>
            <Route path={routes.game} element={<GameScreen />} />
            <Route path="/" element={<Navigate to={routes.game} replace={true} />} />
            <Route path="*" element={<Navigate to={routes.game} replace={true} />} />
        </Routes>
    );
};

export { StartedGameRoutes };
