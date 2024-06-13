import { Navigate, Route, Routes } from "react-router-dom";
import { NOT_IN_GAME_ROUTES, PENDING_START_GAME_ROUTES } from "../../common/constants/routes";
import { ProfileScreen } from "../screens/profile/ProfileScreen";
import { NewGameScreen } from "../screens/new-game/NewGameScreen";

const routes = {
    profile: `/${NOT_IN_GAME_ROUTES.PROFILE}/*`,
    newGame: `/${NOT_IN_GAME_ROUTES.NEW_GAME}/*`,
    pendingStartGame: `/${PENDING_START_GAME_ROUTES.PENDING_START_GAME}`,
};

const navigateTo = {
    profile: `/${NOT_IN_GAME_ROUTES.PROFILE}`,
    newGame: `/${NOT_IN_GAME_ROUTES.NEW_GAME}`,
};

const NotInGameRoutes = () => {
    return (
        <Routes>
            <Route path={routes.profile} element={<ProfileScreen />} />
            <Route path={routes.newGame} element={<NewGameScreen />} />
            <Route path={routes.pendingStartGame} element={<Navigate to={routes.newGame} replace={true} />} />
            <Route path="/" element={<Navigate to={navigateTo.profile} replace={true} />} />
            <Route path="*" element={<Navigate to={navigateTo.profile} replace={true} />} />
        </Routes>
    );
};

export { NotInGameRoutes };
