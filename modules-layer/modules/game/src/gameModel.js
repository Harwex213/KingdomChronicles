import { generateMap, MapGenerationConfig } from "map-generator";
import { GameState } from "./gameState";
import { handleNextTick } from "./model-actions/handleNextTick";
import { ActionManager } from "./game-actions/actionManager";
import Randomizer from "models/randomizer";

class GameModel {
    gameState;
    #actionManager;

    constructor(gameState) {
        this.gameState = gameState;
        this.#actionManager = new ActionManager(this.gameState);
    }

    static fromJson() {
        // create from json
    }

    static createNew({ seedRandom, mapSizeType }) {
        const mapGenerationConfig = new MapGenerationConfig();
        const randomizer = new Randomizer(seedRandom);

        let max = 0;
        let min = 1;
        for (let i = 0; i < 10000; i++) {
            const value = randomizer.getRandom();
            if (value > max) {
                max = value;
            }
            if (value < min) {
                min = value;
            }
        }

        console.log("max", max);
        console.log("min", min);

        mapGenerationConfig.randomizer = randomizer;
        mapGenerationConfig.mapSizeType = mapSizeType;

        const map = generateMap(mapGenerationConfig);
        const gameState = new GameState({ map });

        return new GameModel(gameState);
    }

    get map() {
        return this.gameState.map;
    }

    nextTick() {
        handleNextTick(this.gameState);
    }

    applyAction(name, params) {
        this.#actionManager.handleAction(name, params);
    }
}

export { GameModel };
