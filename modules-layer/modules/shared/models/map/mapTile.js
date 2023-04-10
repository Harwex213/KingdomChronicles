import { action, makeObservable, observable } from "mobx";
import {
    AREA_TYPES,
    BIOM_TYPES,
    TILE_TYPES,
    HEXAGON_DIRECTION_TYPES,
    GLOBAL_BUILDING_TYPES,
} from "../../enums";

const offsetCoordinatesToAxial = (row, col) => {
    return {
        q: col - (row - (row & 1)) / 2,
        r: row,
    };
};

const AXIAL_NEIGHBOR_DIRECTION_VECTORS = {
    [HEXAGON_DIRECTION_TYPES.LEFT]: [-1, 0],
    [HEXAGON_DIRECTION_TYPES.RIGHT]: [1, 0],
    [HEXAGON_DIRECTION_TYPES.LEFT_UP]: [0, -1],
    [HEXAGON_DIRECTION_TYPES.RIGHT_UP]: [1, -1],
    [HEXAGON_DIRECTION_TYPES.LEFT_DOWN]: [-1, 1],
    [HEXAGON_DIRECTION_TYPES.RIGHT_DOWN]: [0, 1],
};

class MapTile {
    constructor(row = 0, col = 0, neighboringTiles) {
        this.row = row;
        this.col = col;
        this.axialCoordinates = offsetCoordinatesToAxial(row, col);
        this.tileType = TILE_TYPES.SEA;
        this.biomType = BIOM_TYPES.NONE;
        this.areaType = AREA_TYPES.NONE;
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

            roadBitmask: null,
            externalBuildingTypeName: null,
        };

        this.influencedPowerCenterIds = new Set();

        makeObservable(this, {
            globalBuilding: observable,
            onStartBuildGlobalBuilding: action,
            decreaseRemainedTicksToBuild: action,
            onStartDestroyGlobalBuilding: action,
            decreaseRemainedTicksToDestroy: action,
        });
    }

    static get axialNeighborDirectionVectors() {
        return AXIAL_NEIGHBOR_DIRECTION_VECTORS;
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

    addPowerCenterInfluence(powerCenterId) {
        this.influencedPowerCenterIds.add(powerCenterId);
    }

    removePowerCenterInfluence(powerCenterId) {
        this.influencedPowerCenterIds.delete(powerCenterId);
    }

    onStartBuildGlobalBuilding(pendingBuildGlobalBuilding, externalBuildingTypeName = null) {
        this.globalBuilding.id = pendingBuildGlobalBuilding.id;
        this.globalBuilding.type = pendingBuildGlobalBuilding.type;
        this.globalBuilding.remainedTicksToBuild = pendingBuildGlobalBuilding.remainedTicks;
        this.globalBuilding.externalBuildingTypeName = externalBuildingTypeName;
    }

    decreaseRemainedTicksToBuild() {
        this.globalBuilding.remainedTicksToBuild--;
    }

    onStartDestroyGlobalBuilding(remainedTicks) {
        this.globalBuilding.remainedTicksToDestroy = remainedTicks;
    }

    decreaseRemainedTicksToDestroy() {
        this.globalBuilding.remainedTicksToDestroy--;
        if (this.globalBuilding.remainedTicksToDestroy === 0) {
            this.globalBuilding.type = GLOBAL_BUILDING_TYPES.NONE;
            this.globalBuilding.id = null;
            this.globalBuilding.remainedTicksToBuild = 0;
        }
    }

    get hasGlobalBuilding() {
        return (
            this.globalBuilding.type !== GLOBAL_BUILDING_TYPES.NONE &&
            this.globalBuilding.remainedTicksToBuild === 0 &&
            this.globalBuilding.remainedTicksToDestroy === 0
        );
    }
}

export { MapTile };
