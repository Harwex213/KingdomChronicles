import { action, makeObservable, observable, runInAction } from "mobx";
import { getGameCreationConfig, saveGameCreationConfig } from "./utils";
import { playerInfoSamples } from "./playerInfoSamples";
import { GameModel } from "game";
import { CurrentPlayer } from "game-service";
import { MapRenderer, MapRendererConfig } from "map-renderer";

class DevGameService {
    #gameModel;
    #mapRenderer;
    currentPlayer = null;

    constructor() {
        this.gameCreationConfig = getGameCreationConfig();
        this.gameProcessConfig = {
            playersAmount: this.gameCreationConfig.playersAmount,
            pointOfViewPlayerIndex: 0,
        };

        const mapRendererConfig = new MapRendererConfig();
        mapRendererConfig.spriteSheetPath = "/spritesheets/spritesheet.json";
        mapRendererConfig.viewport = {
            minScale: 0.8,
            maxScale: 1.5,
        };
        this.#mapRenderer = new MapRenderer(mapRendererConfig);

        makeObservable(this, {
            gameCreationConfig: observable,
            updateGameCreationConfig: action,

            gameProcessConfig: observable,
            changePlayerPointOfView: action,

            currentPlayer: observable,
            startNewGame: action,
        });
    }

    updateGameCreationConfig(prop, value) {
        if (prop === "seedRandom") {
            if (value === "") {
                this.gameCreationConfig.seedRandom = null;
            } else {
                this.gameCreationConfig.seedRandom = value;
            }
        } else {
            this.gameCreationConfig[prop] = value;
        }

        this.startNewGame();
    }

    changePlayerPointOfView(playerIndex) {
        this.#setPlayerPointOfView(Number(playerIndex));
    }

    #setPlayerPointOfView(playerIndex) {
        if (this.currentPlayer !== null) {
            this.currentPlayer.dispose();
        }

        this.gameProcessConfig.pointOfViewPlayerIndex = playerIndex;
        this.currentPlayer = new CurrentPlayer({
            index: playerIndex,
            gameState: this.#gameModel.gameState,
            mapRenderer: this.#mapRenderer,
            onAction: this.#handleAction.bind(this),
        });
    }

    async startNewGame() {
        await this.#mapRenderer.loadSpritesheet();

        this.#gameModel = GameModel.createNew({
            seedRandom: this.gameCreationConfig.seedRandom,
            mapSizeType: this.gameCreationConfig.mapSizeType,
            playersInfo: playerInfoSamples.slice(0, this.gameCreationConfig.playersAmount),
        });
        saveGameCreationConfig(this.gameCreationConfig);

        runInAction(() => {
            this.gameProcessConfig.playersAmount = this.#gameModel.gameState.players.length;
            this.#setPlayerPointOfView(0);
        });
    }

    #handleAction(actionName, params) {
        this.#gameModel.applyAction(actionName, params);
        this.currentPlayer.updateActionPossibilities();
    }

    handleNextTick() {
        this.#gameModel.nextTick();
        this.currentPlayer.updateActionPossibilities();
    }
}

const devGameService = new DevGameService();

export { devGameService };
