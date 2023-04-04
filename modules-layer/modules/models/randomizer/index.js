import seedrandom from "seedrandom";

export default class Randomizer {
    constructor(seed) {
        this._getNextRandom = seedrandom(seed);
    }

    getRangedRandom(max, min = 0) {
        return Math.floor(((this._getNextRandom() * 100000) % (max - min + 1)) + min);
    }

    getRandom() {
        return this._getNextRandom();
    }
}
