import { makeObservable, action, observable } from "mobx";

class GameState {
    constructor({ map, players = [], powerCenters = {}, pendingGlobalBuildings = {}, currentTick = 1 }) {
        this.map = map;
        this.players = players;
        this.powerCenters = powerCenters;
        this.pendingGlobalBuildings = pendingGlobalBuildings;
        this.currentTick = currentTick;

        makeObservable(this, {
            currentTick: observable,
            nextTick: action,
        });
    }

    nextTick() {
        this.currentTick++;
    }
}

export { GameState };
