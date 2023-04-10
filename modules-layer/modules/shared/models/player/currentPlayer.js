import { makeObservable, action, computed, observable } from "mobx";
import { TILE_TYPES, GLOBAL_BUILDING_TYPES, CURRENT_PLAYER_SELECTED_OBJECT_STATES } from "../../enums";

class CurrentPlayer {
    #gameState;

    constructor(gameState, index) {
        this.index = index;
        this.#gameState = gameState;
        this.player = gameState.players[index];

        this.tryingPlaceGlobalBuildingActionName = null;

        this.selectedObject = {
            state: CURRENT_PLAYER_SELECTED_OBJECT_STATES.IDLE,
            identifier: null,
        };

        makeObservable(this, {
            economic: computed,

            abortAction: action,

            tryingPlaceGlobalBuildingActionName: observable,
            startPlacingGlobalBuilding: action,
            onPlacedGlobalBuilding: action,

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

    get firstRegion() {
        return this.player.domain.regions[0];
    }

    get economic() {
        return this.player.economic;
    }

    abortAction() {
        if (this.tryingPlaceGlobalBuildingActionName !== null) {
            this.tryingPlaceGlobalBuildingActionName = null;
            return;
        }

        this.abortSelectingObject();
    }

    startPlacingGlobalBuilding(actionName) {
        if (actionName !== GLOBAL_BUILDING_TYPES.OUTER_BUILDING) {
            this.abortSelectingObject();
        }
        this.tryingPlaceGlobalBuildingActionName = actionName;
    }

    onPlacedGlobalBuilding() {
        this.tryingPlaceGlobalBuildingActionName = null;
    }

    trySelectObject(tile) {
        if (
            tile.isGlobalBuildingExist &&
            tile.globalBuilding.type === GLOBAL_BUILDING_TYPES.POWER_CENTER &&
            this.#gameState.powerCenters[tile.globalBuilding.id].ownerIndex === this.index
        ) {
            this.selectedObject.state = CURRENT_PLAYER_SELECTED_OBJECT_STATES.POWER_CENTER;
            this.selectedObject.identifier = tile.globalBuilding.id;
            return;
        }

        const tileRegion = this.#gameState.map.regions[tile.partRegion.regionIndex];
        if (tileRegion.ownerIndex === -1 && tileRegion.regionType === TILE_TYPES.LAND) {
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

export { CurrentPlayer };
