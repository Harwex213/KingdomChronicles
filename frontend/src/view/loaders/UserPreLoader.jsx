import { useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";
import { authService, AUTH_SERVICE_STATES, AUTH_SERVICE_ACTIONS } from "../../services/auth";
import { AuthorizedRoutes } from "../routes/AuthorizedRoutes";
import { NotAuthorizedRoutes } from "../routes/NotAuthorizedRoutes";
import { Loader } from "../components/loader/Loader";

const UserPreLoader = observer(() => {
    useLayoutEffect(() => {
        authService.dispatch(AUTH_SERVICE_ACTIONS.DESCRIBE);
    }, []);

    if (authService.state.current === AUTH_SERVICE_STATES.TRY_DESCRIBE) {
        return <Loader />;
    }
    if (authService.state.current === AUTH_SERVICE_STATES.USER_LOGGED) {
        return <AuthorizedRoutes />;
    }
    if (authService.state.current === AUTH_SERVICE_STATES.USER_NOT_LOGGED) {
        return <NotAuthorizedRoutes />;
    }
});

export { UserPreLoader };
