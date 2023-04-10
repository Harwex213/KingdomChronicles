import { action, makeObservable, observable } from "mobx";
import { TILE_TYPES } from "../../enums";

class MapRegion {
    constructor() {
        this.index = -1;

        this.tilesRegion = [];
        this.indicesNeighboringRegions = [];
        this.regionType = TILE_TYPES.LAND;
        this.biomType = "none";

        this.ownerIndex = -1;
        this.borderColor = 0x000;

        this.firstTopTile = null;
        this.firstLeftTile = null;

        makeObservable(this, {
            ownerIndex: observable,
            assignOwner: action,
            removeOwner: action,
        });
    }

    assignOwner(player) {
        this.ownerIndex = player.index;
        this.borderColor = player.info.color;
    }

    removeOwner() {
        this.ownerIndex = -1;
        this.borderColor = 0x000;
    }
}

export { MapRegion };
