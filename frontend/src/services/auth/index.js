import { AUTH_SERVICE_ACTIONS, AUTH_SERVICE_STATES } from "./meta";
import { State } from "../../models/state";
import { dispatch } from "../dispatch";
import { apiClientObserver, apiClients } from "../../apiClients";
import { User } from "../../models/user";

const userModel = new User();
const { authenticationClient } = apiClients;

const authService = {
    state: new State(AUTH_SERVICE_STATES.IDLE),
};

authService.dispatch = dispatch(authService);

authService.transitions = {
    [AUTH_SERVICE_STATES.IDLE]: {
        [AUTH_SERVICE_ACTIONS.DESCRIBE]: async () => {
            try {
                authService.state.setState(AUTH_SERVICE_STATES.TRY_DESCRIBE);

                const { payload: user } = await authenticationClient.describe();
                if (user.isLoggedIn) {
                    authService.dispatch(AUTH_SERVICE_ACTIONS.IS_DESCRIBED, user);
                } else {
                    authService.dispatch(AUTH_SERVICE_ACTIONS.IS_NOT_DESCRIBED);
                }
            } catch (e) {
                authService.dispatch(AUTH_SERVICE_ACTIONS.IS_NOT_DESCRIBED);
            }
        },
    },
    [AUTH_SERVICE_STATES.TRY_DESCRIBE]: {
        [AUTH_SERVICE_ACTIONS.IS_DESCRIBED]: async (user) => {
            userModel.setUser(user);
            authService.state.setState(AUTH_SERVICE_STATES.USER_LOGGED);
        },
        [AUTH_SERVICE_ACTIONS.IS_NOT_DESCRIBED]: async () => {
            authService.state.setState(AUTH_SERVICE_STATES.USER_NOT_LOGGED);
        },
    },
    [AUTH_SERVICE_STATES.USER_NOT_LOGGED]: {
        [AUTH_SERVICE_ACTIONS.LOGIN]: async (credentials) => {
            const { payload: user } = await authenticationClient.login(credentials);
            userModel.setUser(user);
            authService.state.setState(AUTH_SERVICE_STATES.USER_LOGGED);
        },
        [AUTH_SERVICE_ACTIONS.REGISTER]: async (credentials) => {
            const { payload: user } = await authenticationClient.register(credentials);
            userModel.setUser(user);
            authService.state.setState(AUTH_SERVICE_STATES.USER_LOGGED);
        },
    },
    [AUTH_SERVICE_STATES.USER_LOGGED]: {
        [AUTH_SERVICE_ACTIONS.LOGOUT]: async () => {
            await authenticationClient.logout();
            authService.state.setState(AUTH_SERVICE_STATES.USER_NOT_LOGGED);
        },
    },
};

apiClientObserver.subscribe(apiClientObserver.EVENT_NAMES.NOT_AUTHORIZED, () => {
    authService.dispatch(AUTH_SERVICE_ACTIONS.LOGOUT);
});

export { authService, AUTH_SERVICE_ACTIONS, AUTH_SERVICE_STATES };
