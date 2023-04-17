import { action, computed, makeObservable, observable } from "mobx";
import { MAX_PLAYERS_AMOUNT, TILE_TYPES } from "../../enums";
import { REGION_VALUES } from "../../constants";

class MapRegion {
    constructor({
        ownerIndex = -1,
        borderColor = 0x000,
        playerColonistsAmount = Array(MAX_PLAYERS_AMOUNT).fill(0),
        colonizationProgress = [...Array(MAX_PLAYERS_AMOUNT)].map((_, index) => ({
            progress: 0,
            playerIndex: index,
        })),
    }) {
        this.index = -1;

        this.tilesRegion = [];
        this.indicesNeighboringRegions = [];
        this.regionType = TILE_TYPES.LAND;
        this.biomType = "none";

        this.renderOptions = {
            centerX: 0,
            centerY: 0,
        };

        this.ownerIndex = ownerIndex;
        this.borderColor = borderColor;

        this.firstTopTile = null;
        this.firstLeftTile = null;

        this.playerColonistsAmount = playerColonistsAmount;
        this.colonizationProgress = colonizationProgress;

        makeObservable(this, {
            tilesRegion: observable,
            addTile: action,
            colonizationMinWeight: computed,

            ownerIndex: observable,
            assignOwner: action,
            removeOwner: action,

            playerColonistsAmount: observable,
            colonizationProgress: observable,
            addColonist: action,
            removeColonist: action,
            addColonizationProgress: action,
        });
    }

    setRenderOptions(options) {
        this.renderOptions = options;
    }

    get renderCenterPoint() {
        return {
            x: this.renderOptions.centerX,
            y: this.renderOptions.centerY,
        };
    }

    addTile(mapTile) {
        this.tilesRegion.push([mapTile.row, mapTile.col]);
    }

    get colonizationMinWeight() {
        return this.tilesRegion.length * REGION_VALUES.ONE_TILE_COLONIZATION_WEIGHT;
    }

    getNeighbors(map) {
        return this.indicesNeighboringRegions.map((i) => map.regions[i]);
    }

    assignOwner(player) {
        this.ownerIndex = player.index;
        this.borderColor = player.info.color;

        this.playerColonistsAmount = Array(MAX_PLAYERS_AMOUNT).fill(0);
        this.colonizationProgress = [...Array(MAX_PLAYERS_AMOUNT)].map((_, index) => ({
            progress: 0,
            playerIndex: index,
        }));
    }

    removeOwner() {
        this.ownerIndex = -1;
        this.borderColor = 0x000;
    }

    addColonist(playerIndex) {
        this.playerColonistsAmount[playerIndex]++;
    }

    removeColonist(playerIndex) {
        this.playerColonistsAmount[playerIndex]--;
    }

    addColonizationProgress(playerIndex, amount) {
        this.colonizationProgress[playerIndex].progress += amount;
    }
}

export { MapRegion };
