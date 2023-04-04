import { generateMap, MapGenerationConfig } from "map-generator";
import { GameState } from "./gameState";
import { handleNextTick } from "./model-actions/handleNextTick";
import { ActionManager } from "./game-actions/actionManager";
import Randomizer from "models/randomizer";
import { placePlayers } from "./model-actions/placePlayers";

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

    static createNew({ seedRandom, mapSizeType, playersInfo }) {
        const randomizer = new Randomizer(seedRandom);

        const mapGenerationConfig = new MapGenerationConfig();
        mapGenerationConfig.randomizer = randomizer;
        mapGenerationConfig.mapSizeType = mapSizeType;
        const map = generateMap(mapGenerationConfig);

        const gameState = new GameState({ map });

        placePlayers({ randomizer, gameState, playersInfo });

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
