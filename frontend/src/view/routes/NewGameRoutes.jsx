import { Navigate, Route, Routes } from "react-router-dom";
import { NEW_GAME_SCREEN_ROUTES } from "../../common/constants/routes";
import { NewGameSearchSubScreen } from "../subscreens/new-game-search/NewGameSearchSubScreen";
import { NewGameCreateSubScreen } from "../subscreens/new-game-create/NewGameCreateSubScreen";

const NewGameRoutes = () => {
    return (
        <Routes>
            <Route path={NEW_GAME_SCREEN_ROUTES.SEARCH} element={<NewGameSearchSubScreen />} />
            <Route path={NEW_GAME_SCREEN_ROUTES.CREATE} element={<NewGameCreateSubScreen />} />
            <Route path="/" element={<Navigate to={NEW_GAME_SCREEN_ROUTES.SEARCH} replace={true} />} />
            <Route path="*" element={<Navigate to={NEW_GAME_SCREEN_ROUTES.SEARCH} replace={true} />} />
        </Routes>
    );
};

export { NewGameRoutes };
