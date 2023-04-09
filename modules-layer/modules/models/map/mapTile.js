import { areaTypes, biomTypes, directionsTypes, tileTypes } from "./enums";
import { GLOBAL_BUILDING_TYPES } from "../game";
import { action, makeObservable, observable } from "mobx";

const offsetCoordinatesToAxial = (row, col) => {
    return {
        q: col - (row - (row & 1)) / 2,
        r: row,
    };
};

const AXIAL_NEIGHBOR_DIRECTION_VECTORS = {
    [directionsTypes.LEFT]: [-1, 0],
    [directionsTypes.RIGHT]: [1, 0],
    [directionsTypes.LEFT_UP]: [0, -1],
    [directionsTypes.RIGHT_UP]: [1, -1],
    [directionsTypes.LEFT_DOWN]: [-1, 1],
    [directionsTypes.RIGHT_DOWN]: [0, 1],
};

class MapTile {
    constructor(row = 0, col = 0, neighboringTiles) {
        this.row = row;
        this.col = col;
        this.axialCoordinates = offsetCoordinatesToAxial(row, col);
        this.tileType = tileTypes.SEA;
        this.biomType = biomTypes.NONE;
        this.areaType = areaTypes.NONE;
        this.neighboringTiles = neighboringTiles;
        this.neighboringTilesRegion = [];
        this.partRegion = "none";

        this.renderPosition = {
            x: null,
            y: null,
        };

        this.globalBuilding = {
            type: GLOBAL_BUILDING_TYPES.NONE,
            id: null,
            remainedTicksToBuild: 0,
            remainedTicksToDestroy: 0,
        };

        makeObservable(this, {
            globalBuilding: observable,
            onStartBuildingGlobalBuilding: action,
            onBuiltGlobalBuilding: action,
            decreaseRemainedTicksToBuild: action,
            decreaseRemainedTicksToDestroy: action,
        });
    }

    static axialCoordinatesToOffset(q, r) {
        return {
            row: r,
            col: q + (r - (r & 1)) / 2,
        };
    }

    static axialNeighbor(q, r, direction) {
        const delta = AXIAL_NEIGHBOR_DIRECTION_VECTORS[direction];
        return {
            q: q + delta[0],
            r: r + delta[1],
        };
    }

    addRegionToMapTile(region, index) {
        this.partRegion = { regionIndex: index };
        region.tilesRegion.push([this.row, this.col]);
        region.index = index;
    }

    onStartBuildingGlobalBuilding(type, remainedTicks) {
        this.globalBuilding.type = type;
        this.globalBuilding.remainedTicksToBuild = remainedTicks;
    }

    onBuiltGlobalBuilding(id) {
        this.globalBuilding.id = id;
    }

    decreaseRemainedTicksToBuild() {
        this.globalBuilding.remainedTicksToBuild--;
    }

    decreaseRemainedTicksToDestroy() {
        this.globalBuilding.remainedTicksToDestroy--;
        if (this.globalBuilding.remainedTicksToDestroy === 0) {
            this.globalBuilding.type = GLOBAL_BUILDING_TYPES.NONE;
            this.globalBuilding.id = null;
            this.globalBuilding.remainedTicksToBuild = 0;
        }
    }

    get isGlobalBuildingExist() {
        return (
            this.globalBuilding.id !== null &&
            this.globalBuilding.remainedTicksToBuild === 0 &&
            this.globalBuilding.remainedTicksToDestroy === 0
        );
    }
}

export { MapTile, AXIAL_NEIGHBOR_DIRECTION_VECTORS };
