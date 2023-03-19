import { State } from "../models/state";

export const LOAD_SERVICE_STATES = {
    IDLE: "IDLE",
    LOADING: "LOADING",
    LOADED: "LOADED",
    ERROR: "ERROR",
};

export const LOAD_SERVICE_ACTIONS = {
    LOAD: "LOAD",
    FAILURE: "FAILURE",
    SUCCESS: "SUCCESS",
};

class LoadStateMachine {
    #state;
    #transitions;
    #customActions = {
        load: null,
        onSuccess: null,
        onError: null,
    };

    constructor(actions) {
        this.#state = new State(LOAD_SERVICE_STATES.IDLE);
        this.#setCustomActions(actions);
        this.#setTransitions();
    }

    #setCustomActions(actions) {
        const { load = () => {}, onSuccess = () => {}, onError = () => {} } = actions;
        this.#customActions.load = load;
        this.#customActions.onSuccess = onSuccess;
        this.#customActions.onError = onError;
    }

    #setTransitions() {
        this.#transitions = {
            [LOAD_SERVICE_STATES.IDLE]: {
                [LOAD_SERVICE_ACTIONS.LOAD]: this.#loadAction,
            },
            [LOAD_SERVICE_STATES.LOADING]: {
                [LOAD_SERVICE_ACTIONS.SUCCESS]: this.#successAction,
                [LOAD_SERVICE_ACTIONS.FAILURE]: this.#failureAction,
            },
            [LOAD_SERVICE_STATES.ERROR]: {
                [LOAD_SERVICE_ACTIONS.LOAD]: this.#loadAction,
            },
            [LOAD_SERVICE_STATES.LOADED]: {
                [LOAD_SERVICE_ACTIONS.LOAD]: this.#loadAction,
            },
        };
    }

    async #loadAction(params) {
        try {
            this.#state.setState(LOAD_SERVICE_STATES.LOADING);

            const data = await this.#customActions.load(params);
            this.#dispatch(LOAD_SERVICE_ACTIONS.SUCCESS, data);
        } catch (e) {
            this.#dispatch(LOAD_SERVICE_ACTIONS.FAILURE, e);
        }
    }

    async #successAction(data) {
        await this.#customActions.onSuccess(data);
        this.#state.setState(LOAD_SERVICE_STATES.LOADED);
    }

    async #failureAction(error) {
        await this.#customActions.onError(error);
        this.#state.setState(LOAD_SERVICE_STATES.ERROR);
    }

    #dispatch(actionName, ...payload) {
        const action = this.#transitions[this.#state.current][actionName];

        if (action) {
            action.apply(this, payload);
        }
    }

    load(params) {
        this.#dispatch(LOAD_SERVICE_ACTIONS.LOAD, params);
    }

    get isLoading() {
        return (
            this.#state.current === LOAD_SERVICE_STATES.IDLE ||
            this.#state.current === LOAD_SERVICE_STATES.LOADING
        );
    }

    get isError() {
        return this.#state.current === LOAD_SERVICE_STATES.ERROR;
    }

    get isSuccess() {
        return this.#state.current === LOAD_SERVICE_STATES.LOADED;
    }
}

export { LoadStateMachine };
