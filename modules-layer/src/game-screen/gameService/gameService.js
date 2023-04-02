import { GameModel } from "game";
import { makeObservable, observable, action } from "mobx";
import { mapRenderer } from "./mapRenderer";
import { getMapGenerationConfig, saveMapGenerationConfig } from "./utils";

class GameService {
    #gameModel = null;

    constructor() {
        this.lastGameCreated = new Date();
        this.mapGenerationConfig = getMapGenerationConfig();

        makeObservable(this, {
            lastGameCreated: observable,
            mapGenerationConfig: observable,
            startNewGame: action,
            setMapSizeType: action,
            setSeedRandom: action,
        });
    }

    startNewGame() {
        this.lastGameCreated = new Date();
        this.#gameModel = GameModel.createNew(this.mapGenerationConfig);
        saveMapGenerationConfig(this.mapGenerationConfig);
        mapRenderer.render(this.#gameModel.map);
    }

    setMapSizeType(newMapSizeType) {
        this.mapGenerationConfig.mapSizeType = newMapSizeType;
        this.startNewGame();
    }

    setSeedRandom(newSeedRandom) {
        if (newSeedRandom === "") {
            this.mapGenerationConfig.seedRandom = null;
        } else {
            this.mapGenerationConfig.seedRandom = newSeedRandom;
        }

        this.startNewGame();
    }

    mountMapRenderer(containerSelector) {
        if (this.#gameModel === null) {
            return;
        }
        mapRenderer.mountView(containerSelector);
    }
}

export { GameService };
