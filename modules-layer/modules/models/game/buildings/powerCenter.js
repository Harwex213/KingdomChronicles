import { POWER_CENTER_TIERS } from "./buildings";
import { POWER_CENTER_VALUES } from "../../game-variables";
import { action, makeObservable, observable } from "mobx";
import { RESOURCE_NAMES } from "../resources/resources";

class PowerCenter {
    constructor({
        id,
        row,
        col,
        ownerIndex,
        possibleControlArea,
        tier = null,
        currentLevel = POWER_CENTER_VALUES.INITIAL_LEVEL,
        controlArea = [],
        economic = {},
        people = {},
        storage = {
            capacity: POWER_CENTER_VALUES.INITIAL_STORAGE_CAPACITY,
            resources: {
                [RESOURCE_NAMES.WOOD]: 0,
                [RESOURCE_NAMES.FOOD]: 0,
                [RESOURCE_NAMES.STONE]: 0,
                [RESOURCE_NAMES.WOOD_BOARDS]: 0,
            },
        },
    }) {
        this.id = id;
        this.ownerIndex = ownerIndex;
        this.tier = tier;
        this.currentLevel = currentLevel;
        this.controlArea = controlArea;
        this.possibleControlArea = possibleControlArea;
        this.tile = {
            row,
            col,
        };
        this.economic = {
            income: 0,
            outcome: 0,
        };
        this.people = {
            growth: 0,
            civilians: 0,
            recruits: 0,
        };
        this.storage = storage;

        makeObservable(this, {
            ownerIndex: observable,
            tier: observable,
            currentLevel: observable,
            controlArea: observable,
            economic: observable,
            people: observable,

            increaseLevel: action,
        });
    }

    getTile(map) {
        return map.matrix[this.tile.row][this.tile.col];
    }

    getControlArea(map) {
        return this.controlArea.map((point) => map.matrix[point[0]][point[1]]);
    }

    #increaseControlArea(tilePoints) {
        this.controlArea.push(...tilePoints);
    }

    #calculateStorageCapacity() {
        this.storage.capacity = this.tier * POWER_CENTER_VALUES.INITIAL_STORAGE_CAPACITY;
    }

    #increaseTier(tier) {
        if (this.tier === tier) {
            return;
        }
        this.tier = tier;
        this.#increaseControlArea(this.possibleControlArea[tier]);
    }

    increaseLevel() {
        // TODO: subtract resources depends on current level

        this.currentLevel++;

        if (this.currentLevel >= POWER_CENTER_VALUES.FIRST_TIER_LEVEL_THRESHOLD) {
            this.#increaseTier(POWER_CENTER_TIERS.FIRST);
        }
        if (this.currentLevel >= POWER_CENTER_VALUES.SECOND_TIER_LEVEL_THRESHOLD) {
            this.#increaseTier(POWER_CENTER_TIERS.SECOND);
        }

        // TODO: recalc income
        // TODO: recalc outcome
    }
}
export { PowerCenter };
