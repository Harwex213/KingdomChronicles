import { makeObservable, action, computed, observable, runInAction } from "mobx";
import {
    TILE_TYPES,
    GLOBAL_BUILDING_TYPES,
    CURRENT_PLAYER_SELECTED_OBJECT_STATES,
    GAME_ACTIONS,
    EXTERNAL_BUILDING_TYPE_NAMES,
    INTERNAL_BUILDING_TYPE_NAMES,
    GAME_VALIDATIONS,
} from "shared/enums";
import { Validator } from "game";

class CurrentPlayer {
    #mapRenderer;
    #onAction;

    gameState;
    gameValidator;
    #gameValidatorParamCache;

    tryingPlaceGlobalBuildingActionName;
    placingExternalBuildingOptions;
    tryingRemovePlacedGlobalBuildingActionName;
    selectedObject;
    globalActionPossibilities;
    selectedPowerCenterActionPossibilities;
    selectedNeutralRegionActionPossibilities;

    constructor({ index, gameState, mapRenderer, onAction }) {
        this.index = index;
        this.player = gameState.players[index];

        this.tryingPlaceGlobalBuildingActionName = null;
        this.placingExternalBuildingOptions = {
            externalBuildingTypeName: "",
            powerCenterId: "",
        };
        this.tryingRemovePlacedGlobalBuildingActionName = null;
        this.selectedObject = {
            state: CURRENT_PLAYER_SELECTED_OBJECT_STATES.IDLE,
            identifier: null,
        };

        this.#mapRenderer = mapRenderer;
        this.gameState = gameState;
        this.gameValidator = new Validator(this.gameState);
        this.#gameValidatorParamCache = {
            playerIndex: this.index,
            powerCenterId: "",
            externalBuildingTypeName: "",
            internalBuildingTypeName: "",
        };
        this.#onAction = onAction;

        this.#mapRenderer.renderGame({
            currentPlayer: this,
            onTileClick: this.#handleTileClick.bind(this),
        });

        this.globalActionPossibilities = {
            [GAME_ACTIONS.START_BUILD_POWER_CENTER]: false,
            [GAME_ACTIONS.START_BUILD_ROAD]: false,
            [GAME_ACTIONS.START_DESTROY_ROAD]: true,
        };

        this.selectedPowerCenterActionPossibilities = {
            [GAME_ACTIONS.START_BUILD_EXTERNAL_BUILDING]: {},
            [GAME_ACTIONS.START_BUILD_INTERNAL_BUILDING]: {},

            [GAME_ACTIONS.CREATE_TRADE_ROUTE]: false,
            [GAME_ACTIONS.INCREASE_TRADE_ROUTE_PRIORITY]: false,
            [GAME_ACTIONS.DECREASE_TRADE_ROUTER_PRIORITY]: false,
            [GAME_ACTIONS.DESTROY_TRADE_ROUTE]: false,
        };

        this.selectedNeutralRegionActionPossibilities = {
            [GAME_ACTIONS.SEND_COLONIST]: false,
            [GAME_ACTIONS.REVOKE_COLONIST]: false,
        };

        this.#updateActionPossibilities();

        makeObservable(this, {
            tryingPlaceGlobalBuildingActionName: observable,
            startPlacingGlobalBuilding: action,

            tryingRemovePlacedGlobalBuildingActionName: observable,
            startRemovingPlacedGlobalBuilding: action,

            selectedObject: observable,
            trySelectObject: action,
            abortSelectingObject: action,
            selectedNeutralRegion: computed,
            selectedPowerCenter: computed,

            abortAction: action,

            globalActionPossibilities: observable,
            selectedPowerCenterActionPossibilities: observable,
            selectedNeutralRegionActionPossibilities: observable,
        });
    }

    mountMapRendererView(containerSelector) {
        this.#mapRenderer.mountView(containerSelector);
    }

    dispose() {
        // TODO
    }

    #handleTileClick(tile) {
        if (tile === null) {
            this.abortAction();
            return;
        }

        if (this.tryingPlaceGlobalBuildingActionName !== null) {
            this.#onAction(this.tryingPlaceGlobalBuildingActionName, {
                playerIndex: this.index,
                row: tile.row,
                col: tile.col,
            });
            runInAction(() => {
                this.tryingPlaceGlobalBuildingActionName = null;
            });
            return;
        }

        if (this.tryingRemovePlacedGlobalBuildingActionName !== null) {
            this.#onAction(this.tryingRemovePlacedGlobalBuildingActionName, {
                playerIndex: this.index,
                row: tile.row,
                col: tile.col,
            });
            runInAction(() => {
                this.tryingRemovePlacedGlobalBuildingActionName = null;
            });
            return;
        }

        this.trySelectObject(tile);
    }

    get info() {
        return this.player.info;
    }

    get treasure() {
        return this.player.treasure;
    }

    get income() {
        return this.player.resultIncome;
    }

    get outcome() {
        return this.player.resultOutcome;
    }

    get firstRegion() {
        return this.player.regions[0];
    }

    startPlacingGlobalBuilding(
        actionName,
        externalBuildingOptions = {
            externalBuildingTypeName: "",
            powerCenterId: "",
        }
    ) {
        if (actionName !== GLOBAL_BUILDING_TYPES.EXTERNAL_BUILDING) {
            this.abortSelectingObject();
        } else {
            this.placingExternalBuildingOptions = externalBuildingOptions;
        }
        this.tryingPlaceGlobalBuildingActionName = actionName;
    }

    startRemovingPlacedGlobalBuilding(actionName) {
        if (actionName !== GLOBAL_BUILDING_TYPES.EXTERNAL_BUILDING) {
            this.abortSelectingObject();
        }
        this.tryingRemovePlacedGlobalBuildingActionName = actionName;
    }

    trySelectObject(tile) {
        const tileRegion = this.gameState.map.regions[tile.partRegion.regionIndex];

        if (
            tile.hasBuildedGlobalBuilding &&
            tile.globalBuilding.type === GLOBAL_BUILDING_TYPES.POWER_CENTER &&
            tileRegion.ownerIndex === this.index
        ) {
            this.#selectObject(CURRENT_PLAYER_SELECTED_OBJECT_STATES.POWER_CENTER, tile.globalBuilding.id);
            return;
        }

        if (tileRegion.ownerIndex === -1 && tileRegion.regionType === TILE_TYPES.LAND) {
            this.#selectObject(CURRENT_PLAYER_SELECTED_OBJECT_STATES.NEUTRAL_REGION, tileRegion.index);
            return;
        }

        this.selectedObject.state = CURRENT_PLAYER_SELECTED_OBJECT_STATES.IDLE;
        this.selectedObject.identifier = null;
    }

    get selectedNeutralRegion() {
        if (this.selectedObject.state !== CURRENT_PLAYER_SELECTED_OBJECT_STATES.NEUTRAL_REGION) {
            return null;
        }
        return this.gameState.map.regions[this.selectedObject.identifier];
    }

    get selectedPowerCenter() {
        if (this.selectedObject.state !== CURRENT_PLAYER_SELECTED_OBJECT_STATES.POWER_CENTER) {
            return null;
        }
        return this.gameState.powerCenters[this.selectedObject.identifier];
    }

    abortAction() {
        if (this.tryingRemovePlacedGlobalBuildingActionName !== null) {
            this.tryingRemovePlacedGlobalBuildingActionName = null;
            return;
        }

        if (this.tryingPlaceGlobalBuildingActionName !== null) {
            this.tryingPlaceGlobalBuildingActionName = null;
            return;
        }

        this.abortSelectingObject();
    }

    #selectObject(state, identifier) {
        this.selectedObject.state = state;
        this.selectedObject.identifier = identifier;
        this.#updateActionPossibilities();
    }

    abortSelectingObject() {
        this.selectedObject.state = CURRENT_PLAYER_SELECTED_OBJECT_STATES.IDLE;
        this.selectedObject.identifier = null;
    }

    #updateActionPossibilities() {
        this.globalActionPossibilities[GAME_ACTIONS.START_BUILD_POWER_CENTER] = this.gameValidator.validate(
            GAME_VALIDATIONS.CAN_BUILD_POWER_CENTER,
            this.#gameValidatorParamCache
        );
        this.globalActionPossibilities[GAME_ACTIONS.START_BUILD_ROAD] = this.gameValidator.validate(
            GAME_VALIDATIONS.CAN_BUILD_ROAD,
            this.#gameValidatorParamCache
        );

        if (this.selectedObject.state === CURRENT_PLAYER_SELECTED_OBJECT_STATES.POWER_CENTER) {
            this.#gameValidatorParamCache.powerCenterId = this.selectedObject.identifier;

            const canBuildExternalBuilding =
                this.selectedPowerCenterActionPossibilities[GAME_ACTIONS.START_BUILD_EXTERNAL_BUILDING];
            for (const externalBuildingTypeName of Object.values(EXTERNAL_BUILDING_TYPE_NAMES)) {
                this.#gameValidatorParamCache.externalBuildingTypeName = externalBuildingTypeName;
                canBuildExternalBuilding[externalBuildingTypeName] = this.gameValidator.validate(
                    GAME_VALIDATIONS.CAN_BUILD_EXTERNAL_BUILDING,
                    this.#gameValidatorParamCache
                );
            }

            const canBuildInternalBuilding =
                this.selectedPowerCenterActionPossibilities[GAME_ACTIONS.START_BUILD_INTERNAL_BUILDING];
            for (const internalBuildingTypeName of Object.values(INTERNAL_BUILDING_TYPE_NAMES)) {
                this.#gameValidatorParamCache.internalBuildingTypeName = internalBuildingTypeName;
                canBuildInternalBuilding[internalBuildingTypeName] = this.gameValidator.validate(
                    GAME_VALIDATIONS.CAN_BUILD_EXTERNAL_BUILDING,
                    this.#gameValidatorParamCache
                );
            }
        }

        if (this.selectedObject.state === CURRENT_PLAYER_SELECTED_OBJECT_STATES.NEUTRAL_REGION) {
            this.#gameValidatorParamCache.regionIndex = this.selectedObject.identifier;

            this.selectedNeutralRegionActionPossibilities[GAME_ACTIONS.SEND_COLONIST] =
                this.gameValidator.validate(
                    GAME_VALIDATIONS.CAN_SEND_COLONIST,
                    this.#gameValidatorParamCache
                );
            this.selectedNeutralRegionActionPossibilities[GAME_ACTIONS.REVOKE_COLONIST] =
                this.gameValidator.validate(
                    GAME_VALIDATIONS.CAN_REVOKE_COLONIST,
                    this.#gameValidatorParamCache
                );
        }
    }
}

export { CurrentPlayer };
