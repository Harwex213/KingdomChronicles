import { AUTH_SERVICE_ACTIONS, AUTH_SERVICE_STATES } from "./meta";
import { State } from "../../models/states/state";
import { dispatch } from "../dispatch";
import { apiClientObserver, apiClients } from "../../apiClients";
import { User } from "../../models/user";
import { playerState } from "../states";
import { PLAYER_STATES } from "../../common/constants/states";

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
                authService.dispatch(AUTH_SERVICE_ACTIONS.IS_DESCRIBED, user);
            } catch (e) {
                authService.dispatch(AUTH_SERVICE_ACTIONS.IS_NOT_DESCRIBED);
            }
        },
    },
    [AUTH_SERVICE_STATES.TRY_DESCRIBE]: {
        [AUTH_SERVICE_ACTIONS.IS_DESCRIBED]: async (user) => {
            userModel.setUser(user);
            if (user.shouldBeInGame) {
                playerState.setState(PLAYER_STATES.IN_GAME);
            } else {
                playerState.setState(PLAYER_STATES.NOT_STARTED_GAME);
            }
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
            if (user.shouldBeInGame) {
                playerState.setState(PLAYER_STATES.IN_GAME);
            } else {
                playerState.setState(PLAYER_STATES.NOT_STARTED_GAME);
            }
            authService.state.setState(AUTH_SERVICE_STATES.USER_LOGGED);
        },
        [AUTH_SERVICE_ACTIONS.REGISTER]: async (credentials) => {
            const { payload: user } = await authenticationClient.register(credentials);
            userModel.setUser(user);
            if (user.shouldBeInGame) {
                playerState.setState(PLAYER_STATES.IN_GAME);
            } else {
                playerState.setState(PLAYER_STATES.NOT_STARTED_GAME);
            }
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

export { authService, userModel, AUTH_SERVICE_ACTIONS, AUTH_SERVICE_STATES };
