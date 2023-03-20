import "./reset.css";
import { AUTH_SERVICE_ACTIONS, AUTH_SERVICE_STATES, authService } from "../services/auth";
import { Loader } from "./components/loader/Loader";
import { AuthorizedRoutes } from "./routes/AuthorizedRoutes";
import { NotAuthorizedRoutes } from "./routes/NotAuthorizedRoutes";
import { observer } from "mobx-react-lite";
import { useLayoutEffect } from "react";
import { TitlesPreLoader } from "./loaders/TitlesPreLoader";

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
                <AuthorizedRoutes />
            </TitlesPreLoader>
        );
    }
    if (authService.state.current === AUTH_SERVICE_STATES.USER_NOT_LOGGED) {
        return <NotAuthorizedRoutes />;
    }
});

export { App };
