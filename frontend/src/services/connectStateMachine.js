import { State } from "../models/states/state";
import internalization from "../common/internalization/api-clients.json";

export const CONNECT_SERVICE_STATES = {
    IDLE: "IDLE",
    CONNECTING: "CONNECTING",
    CONNECTED: "CONNECTED",
    ERROR: "ERROR",
    ABORTED: "ABORTED",
};

export const CONNECT_SERVICE_ACTIONS = {
    CONNECT: "CONNECT",
    NOT_CONNECTED: "NOT_CONNECTED",
    CONNECTED: "CONNECTED",
    RECONNECT: "RECONNECT",
    DISCONNECT: "DISCONNECT",
    ABORT: "ABORT",
    TERMINATE: "TERMINATE",
};

class ConnectStateMachine {
    #state;
    #transitions;
    #customActions = {
        connect: null,
        disconnect: null,
        onSuccess: null,
        onError: null,
    };

    constructor(actions) {
        this.#state = new State(CONNECT_SERVICE_STATES.IDLE);
        this.#setCustomActions(actions);
        this.#setTransitions();
    }

    #setCustomActions(actions) {
        const {
            connect = () => {},
            disconnect = () => {},
            onSuccess = () => {},
            onError = () => {},
        } = actions;

        this.#customActions.connect = connect;
        this.#customActions.disconnect = disconnect;
        this.#customActions.onSuccess = onSuccess;
        this.#customActions.onError = onError;
    }

    #setTransitions() {
        this.#transitions = {
            [CONNECT_SERVICE_STATES.IDLE]: {
                [CONNECT_SERVICE_ACTIONS.CONNECT]: this.#connectAction,
            },
            [CONNECT_SERVICE_STATES.CONNECTING]: {
                [CONNECT_SERVICE_ACTIONS.CONNECTED]: this.#connectedAction,
                [CONNECT_SERVICE_ACTIONS.NOT_CONNECTED]: this.#notConnectedAction,
            },
            [CONNECT_SERVICE_STATES.ERROR]: {
                [CONNECT_SERVICE_ACTIONS.RECONNECT]: this.#connectAction,
            },
            [CONNECT_SERVICE_STATES.CONNECTED]: {
                [CONNECT_SERVICE_ACTIONS.RECONNECT]: this.#connectAction,
                [CONNECT_SERVICE_ACTIONS.DISCONNECT]: this.#disconnectAction,
                [CONNECT_SERVICE_ACTIONS.ABORT]: this.#abortAction,
                [CONNECT_SERVICE_ACTIONS.TERMINATE]: this.#notConnectedAction,
            },
        };
    }

    async #connectAction(params) {
        try {
            this.#state.setState(CONNECT_SERVICE_STATES.CONNECTING);

            const data = await this.#customActions.connect(params);
            this.#dispatch(CONNECT_SERVICE_ACTIONS.CONNECTED, data);
        } catch (e) {
            this.#dispatch(CONNECT_SERVICE_ACTIONS.NOT_CONNECTED, e);
        }
    }

    async #disconnectAction() {
        await this.#customActions.disconnect();
    }

    async #abortAction() {
        await this.#customActions.disconnect();
        this.#state.setState(CONNECT_SERVICE_STATES.ABORTED);
    }

    async #connectedAction(data) {
        await this.#customActions.onSuccess(data);
        this.#state.setState(CONNECT_SERVICE_STATES.CONNECTED);
    }

    async #notConnectedAction(error) {
        await this.#customActions.onError(error);
        this.#state.setState(CONNECT_SERVICE_STATES.ERROR);
    }

    #dispatch(actionName, ...payload) {
        const action = this.#transitions[this.#state.current][actionName];

        if (action) {
            action.apply(this, payload);
        }
    }

    connect(params) {
        this.#dispatch(CONNECT_SERVICE_ACTIONS.CONNECT, params);
    }

    reconnect(params) {
        this.#dispatch(CONNECT_SERVICE_ACTIONS.RECONNECT, params);
    }

    disconnect() {
        this.#dispatch(CONNECT_SERVICE_ACTIONS.DISCONNECT);
    }

    abort() {
        this.#dispatch(CONNECT_SERVICE_ACTIONS.ABORT);
    }

    onTerminated() {
        const error = {
            message: internalization.errors.serviceUnavailable,
        };
        this.#dispatch(CONNECT_SERVICE_ACTIONS.TERMINATE, error);
    }

    get isConnecting() {
        return (
            this.#state.current === CONNECT_SERVICE_STATES.IDLE ||
            this.#state.current === CONNECT_SERVICE_STATES.CONNECTING
        );
    }

    get isError() {
        return this.#state.current === CONNECT_SERVICE_STATES.ERROR;
    }

    get isSuccess() {
        return this.#state.current === CONNECT_SERVICE_STATES.CONNECTED;
    }

    get isAborted() {
        return this.#state.current === CONNECT_SERVICE_STATES.ABORTED;
    }
}

export { ConnectStateMachine };
