import { tileTypes, biomTypes, areaTypes } from "./enums.js";
import { ODDR_DIRECTION_DIFFERENCES } from "./constants.js";
import { action, makeObservable, observable } from "mobx";
import { GLOBAL_BUILDING_TYPES } from "../game";

export class MapTile {
    constructor(row = 0, col = 0, neighboringTiles) {
        this.row = row;
        this.col = col;
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

export class MapRegion {
    constructor() {
        this.index = -1;
        this.tilesRegion = [];
        this.indicesNeighboringRegions = [];
        this.regionType = tileTypes.LAND;
        this.biomType = "none";

        this.ownerIndex = -1;
        this.borderColor = 0x000;

        this.firstTopTile = null;
        this.firstLeftTile = null;

        makeObservable(this, {
            ownerIndex: observable,
        });
    }
}

export class Map {
    constructor(width, height) {
        this.width = Math.max(width, 0);
        this.height = Math.max(height, 0);

        this.matrix = Array.from(Array(this.height), (_, row) => {
            return Array.from(Array(this.width), (_, col) => {
                const parity = row & 1;
                const diff = ODDR_DIRECTION_DIFFERENCES[parity];
                const copyDiff = Object.assign({}, diff);

                Object.keys(copyDiff).forEach((direction) => {
                    const neighboringTile = [row + copyDiff[direction][0], col + copyDiff[direction][1]];
                    copyDiff[direction] =
                        neighboringTile[0] >= 0 &&
                        neighboringTile[0] < this.height &&
                        neighboringTile[1] >= 0 &&
                        neighboringTile[1] < this.width
                            ? [neighboringTile[0], neighboringTile[1]]
                            : "none";
                });

                return new MapTile(row, col, copyDiff);
            });
        });
        this.regions = [];
        this.seaRegions = [];
        this.landRegions = [];
    }
}
