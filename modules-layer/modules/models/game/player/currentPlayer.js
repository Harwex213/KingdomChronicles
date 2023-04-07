import { makeObservable, action, computed, observable } from "mobx";
import { tileTypes } from "../../map";
import { GLOBAL_BUILDING_TYPES } from "../buildings/buildings";

const CURRENT_PLAYER_SELECTED_OBJECT_STATES = {
    IDLE: "IDLE",
    POWER_CENTER: "POWER_CENTER",
    NEUTRAL_REGION: "NEUTRAL_REGION",
};

class CurrentPlayer {
    #gameState;

    constructor(gameState, index) {
        this.index = index;
        this.#gameState = gameState;
        this.player = gameState.players[index];
        this.currentActionThatRequiresConfirmationOnMap = null;

        this.selectedObject = {
            state: CURRENT_PLAYER_SELECTED_OBJECT_STATES.IDLE,
            identifier: null,
        };

        makeObservable(this, {
            economic: computed,

            currentActionThatRequiresConfirmationOnMap: observable,
            setActionThatRequiresConfirmationOnMap: action,
            clearActionThatRequiresConfirmationOnMap: action,

            selectedObject: observable,
            trySelectObject: action,
            abortSelectingObject: action,
            selectedNeutralRegion: computed,
            selectedPowerCenter: computed,
        });
    }

    get info() {
        return this.player.info;
    }

    get economic() {
        return this.player.economic;
    }

    get firstRegion() {
        return this.player.domain.regions[0];
    }

    setActionThatRequiresConfirmationOnMap(action) {
        this.currentActionThatRequiresConfirmationOnMap = action;
    }

    clearActionThatRequiresConfirmationOnMap() {
        this.currentActionThatRequiresConfirmationOnMap = null;
    }

    trySelectObject(tile) {
        if (tile.isGlobalBuildingExist && tile.globalBuilding.type === GLOBAL_BUILDING_TYPES.POWER_CENTER) {
            this.selectedObject.state = CURRENT_PLAYER_SELECTED_OBJECT_STATES.POWER_CENTER;
            this.selectedObject.identifier = tile.globalBuilding.id;
            return;
        }

        const tileRegion = this.#gameState.map.regions[tile.partRegion.regionIndex];
        if (tileRegion.ownerIndex === -1 && tileRegion.regionType === tileTypes.LAND) {
            this.selectedObject.state = CURRENT_PLAYER_SELECTED_OBJECT_STATES.NEUTRAL_REGION;
            this.selectedObject.identifier = tileRegion.index;
            return;
        }

        this.selectedObject.state = CURRENT_PLAYER_SELECTED_OBJECT_STATES.IDLE;
        this.selectedObject.identifier = null;
    }

    abortSelectingObject() {
        this.selectedObject.state = CURRENT_PLAYER_SELECTED_OBJECT_STATES.IDLE;
        this.selectedObject.identifier = null;
    }

    get selectedNeutralRegion() {
        if (this.selectedObject.state !== CURRENT_PLAYER_SELECTED_OBJECT_STATES.NEUTRAL_REGION) {
            return null;
        }
        return this.#gameState.map.regions[this.selectedObject.identifier];
    }

    get selectedPowerCenter() {
        if (this.selectedObject.state !== CURRENT_PLAYER_SELECTED_OBJECT_STATES.POWER_CENTER) {
            return null;
        }
        return this.#gameState.powerCenters[this.selectedObject.identifier];
    }
}

export { CurrentPlayer, CURRENT_PLAYER_SELECTED_OBJECT_STATES };
