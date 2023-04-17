import "./reset.css";
import { AUTH_SERVICE_ACTIONS, AUTH_SERVICE_STATES, authService } from "../services/auth";
import { Loader } from "./components/loader/Loader";
import { NotAuthorizedRoutes } from "./routes/NotAuthorizedRoutes";
import { observer } from "mobx-react-lite";
import { useLayoutEffect } from "react";
import { TitlesPreLoader } from "./loaders/TitlesPreLoader";
import { PlayerStateCheck } from "./state-checks/PlayerStateCheck";
import { GameSpritesheetPreLoader } from "./loaders/GameSpritesheetPreLoader";

const App = observer(() => {
    useLayoutEffect(() => {
        authService.dispatch(AUTH_SERVICE_ACTIONS.DESCRIBE);
    }, []);

    if (authService.state.current === AUTH_SERVICE_STATES.TRY_DESCRIBE) {
        return <Loader />;
    }
    if (authService.state.current === AUTH_SERVICE_STATES.USER_LOGGED) {
        return (
            <TitlesPreLoader>
                <GameSpritesheetPreLoader>
                    <PlayerStateCheck />
                </GameSpritesheetPreLoader>
            </TitlesPreLoader>
        );
    }
    if (authService.state.current === AUTH_SERVICE_STATES.USER_NOT_LOGGED) {
        return <NotAuthorizedRoutes />;
    }
});

export { App };
