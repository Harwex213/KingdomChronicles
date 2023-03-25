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
