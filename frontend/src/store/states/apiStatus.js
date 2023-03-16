import { makeAutoObservable } from "mobx";

const API_STATUS_STATES = {
    AVAILABLE: "available",
    NOT_AVAILABLE: "notAvailable",
};

class ApiStatusState {
    constructor() {
        this.state = API_STATUS_STATES.AVAILABLE;

        makeAutoObservable(this);
    }

    setState(newState) {
        this.state = newState;
    }
}

ApiStatusState.prototype.API_STATUS_STATES = API_STATUS_STATES;

export { ApiStatusState };
