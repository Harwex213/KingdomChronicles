class GameState {
    constructor({ map, players = [], powerCenters = [] }) {
        this.map = map;
        this.players = players;
        this.powerCenters = powerCenters;
    }
}

export { GameState };
