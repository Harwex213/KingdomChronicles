import { Navigate, Route, Routes } from "react-router-dom";
import { AUTHORIZED_ROUTES } from "../../common/constants/routes";
import { ProfileScreen } from "../screens/profile/ProfileScreen";
import { NewGameScreen } from "../screens/new-game/NewGame";

const routes = {
    profile: `/${AUTHORIZED_ROUTES.PROFILE}/*`,
    newGame: `/${AUTHORIZED_ROUTES.NEW_GAME}`,
};

const navigateTo = {
    profile: `/${AUTHORIZED_ROUTES.PROFILE}`,
};

const AuthorizedRoutes = () => {
    return (
        <Routes>
            <Route path={routes.profile} element={<ProfileScreen />} />
            <Route path={routes.newGame} element={<NewGameScreen />} />
            <Route path="/" element={<Navigate to={navigateTo.profile} replace={true} />} />
            <Route path="*" element={<Navigate to={navigateTo.profile} replace={true} />} />
        </Routes>
    );
};

export { AuthorizedRoutes };
