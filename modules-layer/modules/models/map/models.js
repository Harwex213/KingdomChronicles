import { tileTypes, biomTypes, areaTypes } from "./enums.js";
import { ODDR_DIRECTION_DIFFERENCES } from "./constants.js";
import { makeObservable, observable } from "mobx";

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
        this.forDevOnly = { temperature: null, moisture: null };
    }

    addRegionToMapTile(region, index) {
        this.partRegion = { regionIndex: index };
        region.tilesRegion.push([this.row, this.col]);
        region.index = index;
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
