import { getGameCreationConfig, saveGameCreationConfig } from "./utils";
import { action, makeObservable, observable, runInAction } from "mobx";
import { playerInfoSamples } from "./playerInfoSamples";
import { Validator, GameModel } from "game";
import { MapRenderer, MapRendererConfig } from "map-renderer";
import { CurrentPlayer } from "shared/models";
import { GAME_ACTIONS, GAME_VALIDATIONS } from "shared/enums";

const PLACE_GLOBAL_BUILDING_ACTIONS = [GAME_ACTIONS.START_BUILD_POWER_CENTER, GAME_ACTIONS.START_BUILD_ROAD];

class GameService {
    #gameModel;
    #gameValidator;
    #mapRenderer;

    currentPlayer = null;
    canPlayerDoActionBoolMap = {};

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

        this.canPlayerDoActionBoolMap = {
            [GAME_ACTIONS.START_BUILD_POWER_CENTER]: false,
            [GAME_ACTIONS.START_BUILD_ROAD]: false,
            [GAME_ACTIONS.START_DESTROY_ROAD]: false,
        };

        makeObservable(this, {
            gameCreationConfig: observable,
            updateGameCreationConfig: action,

            gameProcessConfig: observable,
            changePlayerPointOfView: action,

            currentPlayer: observable,
            startNewGame: action,

            canPlayerDoActionBoolMap: observable,
            updateActionBoolMap: action,
        });
    }

    get gameState() {
        return this.#gameModel.gameState;
    }

    mountMapRendererView(containerSelector) {
        this.#mapRenderer.mountView(containerSelector);
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
        this.#mapRenderer.render({
            mapToRender: this.#gameModel.gameState.map,
            currentPlayer: this.currentPlayer,
            gameValidator: this.#gameValidator,
            onTileClick: this.#handleTileClick.bind(this),
        });
    }

    #setPlayerPointOfView(playerIndex) {
        this.gameProcessConfig.pointOfViewPlayerIndex = playerIndex;
        this.currentPlayer = new CurrentPlayer(this.#gameModel.gameState, playerIndex);
        this.updateActionBoolMap();
    }

    updateActionBoolMap() {
        if (!this.#gameValidator) {
            return;
        }

        this.canPlayerDoActionBoolMap[GAME_ACTIONS.START_BUILD_POWER_CENTER] = this.#gameValidator.validate(
            GAME_VALIDATIONS.CAN_BUILD_POWER_CENTER,
            { playerIndex: this.currentPlayer.index }
        );

        this.canPlayerDoActionBoolMap[GAME_ACTIONS.START_BUILD_ROAD] = this.#gameValidator.validate(
            GAME_VALIDATIONS.CAN_BUILD_ROAD,
            { playerIndex: this.currentPlayer.index }
        );

        this.canPlayerDoActionBoolMap[GAME_ACTIONS.START_DESTROY_ROAD] = true;
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

        this.#gameValidator = new Validator(this.#gameModel.gameState);
        this.#mapRenderer.render({
            mapToRender: this.#gameModel.gameState.map,
            currentPlayer: this.currentPlayer,
            gameValidator: this.#gameValidator,
            onTileClick: this.#handleTileClick.bind(this),
        });
        this.updateActionBoolMap();
    }

    #handleTileClick(tile) {
        if (tile === null) {
            this.currentPlayer.abortAction();
            return;
        }

        if (this.currentPlayer.tryingPlaceGlobalBuildingActionName !== null) {
            this.#gameModel.applyAction(this.currentPlayer.tryingPlaceGlobalBuildingActionName, {
                playerIndex: this.currentPlayer.index,
                row: tile.row,
                col: tile.col,
            });
            this.currentPlayer.onPlacedGlobalBuilding();
            this.updateActionBoolMap();
            return;
        }

        this.currentPlayer.trySelectObject(tile);
    }

    handleNextTick() {
        this.#gameModel.nextTick();

        console.log(this.#gameModel.gameState.serialize().length);
    }

    handlePlacingGlobalBuilding(actionName) {
        if (
            !(PLACE_GLOBAL_BUILDING_ACTIONS.includes(actionName) && this.canPlayerDoActionBoolMap[actionName])
        ) {
            return;
        }

        this.currentPlayer.startPlacingGlobalBuilding(actionName);
    }

    handleActionAbort() {
        this.currentPlayer.abortAction();
    }

    abortSelectingObject() {
        this.currentPlayer.abortSelectingObject();
    }
}

const gameService = new GameService();

export { gameService };
