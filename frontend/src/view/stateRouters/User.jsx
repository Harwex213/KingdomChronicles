import internalization from "../../common/internalization/internalization.json";
import { useLayoutEffect } from "react";
import { observer } from "mobx-react-lite";
import { authService, AUTH_SERVICE_STATES, AUTH_SERVICE_ACTIONS } from "../../services/auth";
import { AuthorizedRoutes } from "../screens/AuthorizedRoutes";
import { NotAuthorizedRoutes } from "../screens/NotAuthorizedRoutes";

const UserStateRouter = observer(() => {
    useLayoutEffect(() => {
        authService.dispatch(AUTH_SERVICE_ACTIONS.DESCRIBE);
    }, []);

    if (authService.state.current === AUTH_SERVICE_STATES.TRY_DESCRIBE) {
        return <div>{internalization.components.siteLoading}</div>;
    }
    if (authService.state.current === AUTH_SERVICE_STATES.USER_LOGGED) {
        return <AuthorizedRoutes />;
    }
    if (authService.state.current === AUTH_SERVICE_STATES.USER_NOT_LOGGED) {
        return <NotAuthorizedRoutes />;
    }
});

export { UserStateRouter };
