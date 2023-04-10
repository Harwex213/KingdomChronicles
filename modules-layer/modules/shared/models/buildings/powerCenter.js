import { action, makeObservable, observable } from "mobx";
import { EXTERNAL_BUILDING_TYPES } from "./externalBuildingTypes";
import { EXTERNAL_BUILDING_TYPE_NAMES, RESOURCE_LAYER_INDEXES } from "../../enums";
import {
    POWER_CENTER_TIER_TO_INCREASE_LEVEL,
    POWER_CENTER_TIER_UPGRADE_THRESHOLD,
    POWER_CENTER_VALUES,
} from "../../constants";
import { RESOURCE_LAYERS } from "../resource/resources";

class PowerCenter {
    constructor({
        id,
        row,
        col,
        ownerIndex,
        possibleControlArea,

        tier = POWER_CENTER_VALUES.INITIAL_TIER,
        currentLevel = POWER_CENTER_VALUES.INITIAL_LEVEL,

        controlArea = [],
        storageCapacity = POWER_CENTER_VALUES.INITIAL_STORAGE_CAPACITY,
        storage = POWER_CENTER_VALUES.INITIAL_STORAGE,
        economic = {
            income: 0,
            outcome: 0,
        },
        people = {
            growth: 0,
            civilians: POWER_CENTER_VALUES.INITIAL_CIVILIANS,
            recruits: 0,
        },
        externalBuildingsAmount = {
            [EXTERNAL_BUILDING_TYPE_NAMES.FARM]: 0,
            [EXTERNAL_BUILDING_TYPE_NAMES.WOODCUTTER]: 0,
            [EXTERNAL_BUILDING_TYPE_NAMES.STONE_QUARRY]: 0,
            [EXTERNAL_BUILDING_TYPE_NAMES.SAWMILL]: 0,
        },
        placementCellsMaxAmount = 0,
        internalBuildings = [],
    }) {
        this.id = id;
        this.ownerIndex = ownerIndex;
        this.row = row;
        this.col = col;

        this.tier = tier;
        this.currentLevel = currentLevel;

        this.people = people;
        this.economic = economic;

        this.storageCapacity = storageCapacity;
        this.storage = storage;

        this.controlArea = controlArea;
        this.possibleControlArea = possibleControlArea;
        this.externalBuildingsAmount = externalBuildingsAmount;

        this.placementCellsMaxAmount = placementCellsMaxAmount;
        this.internalBuildings = internalBuildings;

        makeObservable(this, {
            tier: observable,
            currentLevel: observable,
            people: observable,
            economic: observable,
            storageCapacity: observable,
            storage: observable,
            controlArea: observable,
            externalBuildingsAmount: observable,
            placementCellsMaxAmount: observable,
            internalBuildings: observable,

            increaseLevel: action,
        });
    }

    getTile(map) {
        return map.matrix[this.row][this.col];
    }

    getControlArea(map) {
        return this.controlArea.map((point) => map.matrix[point[0]][point[1]]);
    }

    #increaseControlArea(tilePoints) {
        this.controlArea.push(...tilePoints);
    }

    #calcStorageCapacity() {
        this.storageCapacity = this.tier * POWER_CENTER_VALUES.INITIAL_STORAGE_CAPACITY;
    }

    #calcIncome() {
        this.economic.income = this.people.civilians * this.tier;
    }

    #increaseTier() {
        this.tier++;
        this.placementCellsMaxAmount = this.tier - 1;
        this.#increaseControlArea(this.possibleControlArea[this.tier]);
        this.#calcStorageCapacity();
        this.#calcIncome();
    }

    #subtractLevelIncreaseCost() {
        const subtractMetaInfo = POWER_CENTER_TIER_TO_INCREASE_LEVEL[this.tier];
        for (const [resourceName, initialValue] of Object.entries(subtractMetaInfo.COST)) {
            const value = initialValue * Math.pos(subtractMetaInfo.RATIOS[resourceName], this.currentLevel);
            this.storage[resourceName] -= value;
        }
    }

    increaseLevel() {
        this.#subtractLevelIncreaseCost();

        this.currentLevel++;

        if (this.currentLevel >= POWER_CENTER_TIER_UPGRADE_THRESHOLD[this.tier]) {
            this.#increaseTier();
        }
    }

    grow() {
        const requiredFoodAmount = this.people.civilians / POWER_CENTER_VALUES.PEOPLE_FOOD_PROVISION_RATIO;

        this.people.civilians += this.people.growth;
        this.#calcIncome();
    }

    produce() {
        let storageCapacityLeft;
        let producedAmount;
        let externalBuildingType;
        for (const resource of RESOURCE_LAYERS[RESOURCE_LAYER_INDEXES.FIRST]) {
            if (this.storageCapacity - this.storage[resource.name] === 0) {
                continue;
            }

            externalBuildingType = EXTERNAL_BUILDING_TYPES[resource.producedOn];

            producedAmount =
                externalBuildingType.production.producedAmountPerTick *
                this.externalBuildingsAmount[resource.name];
            storageCapacityLeft = this.storageCapacity - this.storage[resource.name];
            this.storage[resource.name] += Math.min(producedAmount, storageCapacityLeft);
        }

        let conversionRatio;
        let requiredRawAmount;
        let actuallyRawAmount;
        for (let i = RESOURCE_LAYER_INDEXES.SECOND; i < RESOURCE_LAYERS.length; i++) {
            for (const resource of RESOURCE_LAYERS[i]) {
                if (this.storageCapacity - this.storage[resource.name] === 0) {
                    continue;
                }

                externalBuildingType = EXTERNAL_BUILDING_TYPES[resource.producedOn];

                requiredRawAmount =
                    externalBuildingType.production.requiredAmountPerTick *
                    this.externalBuildingsAmount[resource.name];
                actuallyRawAmount = Math.min(this.storage[resource.name], requiredRawAmount);
                this.storage[externalBuildingType.production.requiredResource] -= actuallyRawAmount;

                conversionRatio =
                    externalBuildingType.production.producedAmountPerTick /
                    externalBuildingType.production.requiredAmountPerTick;
                producedAmount = actuallyRawAmount * conversionRatio;
                storageCapacityLeft = this.storageCapacity - this.storage[resource.name];
                this.storage[resource.name] += Math.min(producedAmount, storageCapacityLeft);
            }
        }
    }

    buildExternalBuilding(type) {
        const externalBuildingType = EXTERNAL_BUILDING_TYPES[type];
        for (const [resourceName, value] of Object.entries(externalBuildingType.buildCost)) {
            this.storage[resourceName] -= value;
        }

        this.externalBuildingsAmount[type]++;
        this.outcome += externalBuildingType.costPerTick;
    }

    destroyExternalBuilding(type) {
        this.externalBuildingsAmount[type]--;
        this.outcome -= EXTERNAL_BUILDING_TYPES[type].costPerTick;
    }
}
export { PowerCenter };
