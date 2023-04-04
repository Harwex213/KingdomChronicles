import { GameModel } from "game";
import { makeObservable, observable, action } from "mobx";
import { mapRenderer } from "./mapRenderer";
import { getGameCreationConfig, saveGameCreationConfig } from "./utils";
import { playerInfoSamples } from "./playerInfoSamples";

class GameService {
    #gameModel = null;

    constructor() {
        this.lastGameCreated = new Date();
        this.gameCreationConfig = getGameCreationConfig();

        makeObservable(this, {
            lastGameCreated: observable,
            gameCreationConfig: observable,
            startNewGame: action,
            setMapSizeType: action,
            setSeedRandom: action,
        });
    }

    async startNewGame() {
        this.lastGameCreated = new Date();
        this.#gameModel = GameModel.createNew({
            seedRandom: this.gameCreationConfig.seedRandom,
            mapSizeType: this.gameCreationConfig.mapSizeType,
            playersInfo: playerInfoSamples.slice(0, this.gameCreationConfig.playersAmount),
        });
        saveGameCreationConfig(this.gameCreationConfig);
        await mapRenderer.render(this.#gameModel.map);
    }

    setMapSizeType(newMapSizeType) {
        this.gameCreationConfig.mapSizeType = newMapSizeType;
        this.startNewGame();
    }

    setSeedRandom(newSeedRandom) {
        if (newSeedRandom === "") {
            this.gameCreationConfig.seedRandom = null;
        } else {
            this.gameCreationConfig.seedRandom = newSeedRandom;
        }

        this.startNewGame();
    }

    setPlayersAmount(newAmount) {
        this.gameCreationConfig.playersAmount = newAmount;
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
