import { areaTypes, biomTypes, tileTypes } from "./enums";
import { GLOBAL_BUILDING_TYPES } from "../game";
import { action, makeObservable, observable } from "mobx";

class MapTile {
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

export { MapTile };
