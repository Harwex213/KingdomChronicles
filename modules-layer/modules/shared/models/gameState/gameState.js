import { makeObservable, action, observable } from "mobx";
import { GLOBAL_BUILDING_TYPES } from "../../enums";

class GameState {
    constructor({
        currentTick = 1,

        map,
        players = [],
        powerCenters = {},
        externalBuildings = {},

        pendingBuild = {
            globalBuildings: {},
            internalBuildings: {},
        },

        pendingDestroy = {
            globalBuildings: {},
        },
    }) {
        this.currentTick = currentTick;

        this.map = map;
        this.players = players;
        this.powerCenters = powerCenters;
        this.externalBuildings = externalBuildings;

        this.pendingBuild = pendingBuild;
        this.pendingDestroy = pendingDestroy;

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
