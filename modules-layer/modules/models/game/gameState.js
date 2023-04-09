import { makeObservable, action, observable } from "mobx";
import { GLOBAL_BUILDING_TYPES } from "./buildings/buildings";

class GameState {
    constructor({
        map,
        players = [],
        powerCenters = {},
        outerBuildings = {},
        pendingGlobalBuildings = {},
        currentTick = 1,
    }) {
        this.map = map;
        this.players = players;
        this.powerCenters = powerCenters;
        this.outerBuildings = outerBuildings;
        this.pendingGlobalBuildings = pendingGlobalBuildings;
        this.currentTick = currentTick;

        makeObservable(this, {
            currentTick: observable,
            nextTick: action,
        });
    }

    nextTick() {
        this.currentTick++;
    }

    serialize() {
        const matrixCache = [];

        for (const tilesRow of this.map.matrix) {
            for (const mapTile of tilesRow) {
                if (mapTile.globalBuilding.type === GLOBAL_BUILDING_TYPES.NONE) {
                    continue;
                }
                matrixCache.push({
                    row: mapTile.row,
                    col: mapTile.col,
                    globalBuilding: mapTile.globalBuilding,
                });
            }
        }

        const save = {
            ...this,
            mapCache: {
                matrix: matrixCache,
                regions: this.map.regions
                    .filter((region) => region.ownerIndex !== -1)
                    .map((region) => ({
                        ownerIndex: region.ownerIndex,
                        borderColor: region.borderColor,
                    })),
            },
        };
        delete save.map;
        return JSON.stringify(save);
    }
}

export { GameState };
