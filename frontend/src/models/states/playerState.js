import { makeAutoObservable } from "mobx";

const PLAYER_STATES = {
    NOT_STARTED_GAME: "NOT_STARTED_GAME",
    IN_GAME: "IN_GAME",
};

class PlayerState {
    constructor() {
        this.current = "";

        makeAutoObservable(this);
    }

    setStateInGame() {
        this.current = PLAYER_STATES.IN_GAME;
    }

    get isInGame() {
        return this.current === PLAYER_STATES.IN_GAME;
    }

    setStateNotStartedGame() {
        this.current = PLAYER_STATES.NOT_STARTED_GAME;
    }

    get isNotStartedGame() {
        return this.current === PLAYER_STATES.NOT_STARTED_GAME;
    }
}

export { PlayerState };
