import { POWER_CENTER_TIERS } from "./buildings";
import { POWER_CENTER_VALUES } from "../../game-variables";

class PowerCenter {
    constructor({
        id,
        ownerIndex,
        tier = POWER_CENTER_VALUES.INITIAL_TIER,
        currentLevel = POWER_CENTER_VALUES.INITIAL_LEVEL,
        controlArea = {
            tiles: [],
            length: 0,
        },
        possibleControlAreaTiles = {
            [POWER_CENTER_TIERS.FIRST]: [],
            [POWER_CENTER_TIERS.SECOND]: [],
        },
        row,
        col,
    }) {
        this.id = id;
        this.ownerIndex = ownerIndex;
        this.tier = tier;
        this.currentLevel = currentLevel;
        this.controlArea = controlArea;
        this.possibleControlAreaTiles = possibleControlAreaTiles;
        this.tile = {
            row,
            col,
        };
    }
}
export { PowerCenter };
