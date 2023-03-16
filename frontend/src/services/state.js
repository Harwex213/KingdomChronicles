import { makeAutoObservable } from "mobx";

export class State {
    constructor(initialState) {
        this.current = initialState;

        makeAutoObservable(this);
    }

    setState(newState) {
        this.current = newState;
    }
}

export const API_STATUS_STATES = {
    AVAILABLE: "AVAILABLE",
    NOT_AVAILABLE: "NOT_AVAILABLE",
};

export const USER_STATES = {
    LOADING: "LOADING",
    AUTHORIZED: "AUTHORIZED",
    NOT_AUTHORIZED: "NOT_AUTHORIZED",
};
