import { action, makeObservable, observable } from "mobx";
import {
    EXTERNAL_BUILDING_TYPE_NAMES,
    INTERNAL_BUILDING_TYPE_NAMES,
    RESOURCE_LAYER_INDEXES,
    RESOURCE_NAMES,
} from "../../enums";
import {
    POWER_CENTER_TIER_TO_INCREASE_LEVEL,
    POWER_CENTER_TIER_UPGRADE_THRESHOLD,
    POWER_CENTER_VALUES,
    TAX_OFFICE_VALUES,
    WAREHOUSE_VALUES,
} from "../../constants";
import { RESOURCE_LAYERS } from "../resource/resources";
import { EXTERNAL_BUILDING_TYPES } from "./externalBuildingTypes";

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
            canGrow: true,
        },
        externalBuildingIds = [],
        externalBuildingsAmount = {
            [EXTERNAL_BUILDING_TYPE_NAMES.FARM]: 0,
            [EXTERNAL_BUILDING_TYPE_NAMES.WOODCUTTER]: 0,
            [EXTERNAL_BUILDING_TYPE_NAMES.STONE_QUARRY]: 0,
            [EXTERNAL_BUILDING_TYPE_NAMES.SAWMILL]: 0,
        },
        placementCellsMaxAmount = 0,
        internalBuildings = [],
        bonusInternalBuildingsAmount = {
            [INTERNAL_BUILDING_TYPE_NAMES.WAREHOUSE]: 0,
            [INTERNAL_BUILDING_TYPE_NAMES.TAX_OFFICE]: 0,
        },
        connectedPowerCenterIds = [],
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

        this.externalBuildingIds = externalBuildingIds;
        this.externalBuildingsAmount = externalBuildingsAmount;

        this.placementCellsMaxAmount = placementCellsMaxAmount;
        this.internalBuildings = internalBuildings;
        this.bonusInternalBuildingsAmount = bonusInternalBuildingsAmount;

        this.connectedPowerCenterIds = new Set(connectedPowerCenterIds);

        makeObservable(this, {
            tier: observable,
            currentLevel: observable,
            people: observable,
            economic: observable,
            storageCapacity: observable,
            storage: observable,
            controlArea: observable,
            externalBuildingsAmount: observable,
            internalBuildings: observable,
            connectedPowerCenterIds: observable,

            increaseLevel: action,
            grow: action,
            produce: action,
            subtractBuildCost: action,
            onExternalBuildingBuilded: action,
            onExternalBuildingDestroyed: action,
            onInternalBuildingBuilded: action,
            addConnectedPowerCenterIds: action,
            removeConnectedPowerCenterIds: action,
        });
    }

    getTile(map) {
        return map.matrix[this.row][this.col];
    }

    getRegion(map) {
        return map.regions[this.getTile(map).partRegion.regionIndex];
    }

    getControlArea(map) {
        return this.controlArea.map((point) => map.matrix[point[0]][point[1]]);
    }

    #increaseControlArea(tilePoints) {
        this.controlArea.push(...tilePoints);
    }

    #calcStorageCapacity() {
        this.storageCapacity =
            this.tier * POWER_CENTER_VALUES.INITIAL_STORAGE_CAPACITY +
            WAREHOUSE_VALUES.STORAGE_CAPACITY_BONUS *
                this.bonusInternalBuildingsAmount[INTERNAL_BUILDING_TYPE_NAMES.WAREHOUSE];
    }

    #calcIncome() {
        this.economic.income = this.people.civilians * this.tier;

        for (let i = 0; i < this.bonusInternalBuildingsAmount[INTERNAL_BUILDING_TYPE_NAMES.TAX_OFFICE]; i++) {
            this.economic.income *= TAX_OFFICE_VALUES.POWER_CENTER_TAX_BONUS;
        }
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
        const foodAmountDelta = Math.floor(this.storage[RESOURCE_NAMES.FOOD] - requiredFoodAmount);
        if (this.people.canGrow && foodAmountDelta > 0) {
            this.people.growth = foodAmountDelta * POWER_CENTER_VALUES.PEOPLE_FOOD_BORN_RATIO;
        }
        if (foodAmountDelta < 0) {
            this.storage[RESOURCE_NAMES.FOOD] = 0;
            this.people.growth = foodAmountDelta * POWER_CENTER_VALUES.PEOPLE_FOOD_BORN_RATIO;
        } else {
            this.storage[RESOURCE_NAMES.FOOD] -= requiredFoodAmount;
        }

        this.people.civilians += this.people.growth;
        this.#calcIncome();
    }

    #tryIncreaseStorage(resourceName, producedAmount) {
        this.storage[resourceName] += Math.min(
            producedAmount,
            this.storageCapacity - this.storage[resourceName]
        );
    }

    produce() {
        let producedAmount;
        for (const [resourceName, production] of Object.entries(
            POWER_CENTER_VALUES.BASIC_PRODUCTION_PER_TICK
        )) {
            producedAmount = production * this.tier;
            this.#tryIncreaseStorage(resourceName, producedAmount);
        }

        let externalBuildingType;
        for (const resource of RESOURCE_LAYERS[RESOURCE_LAYER_INDEXES.FIRST]) {
            if (this.storageCapacity - this.storage[resource.name] === 0) {
                continue;
            }

            externalBuildingType = EXTERNAL_BUILDING_TYPES[resource.producedOn];

            producedAmount =
                externalBuildingType.production.producedAmountPerTick *
                this.externalBuildingsAmount[resource.name];
            this.#tryIncreaseStorage(resource.name, producedAmount);
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
                this.#tryIncreaseStorage(resource.name, producedAmount);
            }
        }
    }

    subtractBuildCost(buildCost) {
        for (const [resourceName, value] of Object.entries(buildCost)) {
            if (resourceName === RESOURCE_NAMES.MONEY) {
                continue;
            }
            this.storage[resourceName] -= value;
        }
    }

    onExternalBuildingBuilded(externalBuilding) {
        this.externalBuildingIds.push(externalBuilding.id);
        this.externalBuildingsAmount[externalBuilding.typeName]++;
        this.outcome += EXTERNAL_BUILDING_TYPES[externalBuilding.typeName].costPerTick;
    }

    onExternalBuildingDestroyed(externalBuilding) {
        this.externalBuildingIds = this.externalBuildingIds.filter((id) => id !== externalBuilding.id);
        this.externalBuildingsAmount[externalBuilding]--;
        this.outcome -= EXTERNAL_BUILDING_TYPES[externalBuilding].costPerTick;
    }

    onInternalBuildingBuilded(internalBuilding) {
        const previousType = this.internalBuildings[internalBuilding.placementCellPos];
        if (previousType && this.bonusInternalBuildingsAmount[previousType]) {
            this.bonusInternalBuildingsAmount[previousType]--;
        }

        this.internalBuildings[internalBuilding.placementCellPos] = internalBuilding.typeName;
        if (this.bonusInternalBuildingsAmount[internalBuilding.typeName]) {
            this.bonusInternalBuildingsAmount[internalBuilding.typeName]++;
        }

        this.#calcIncome();
        this.#calcStorageCapacity();
    }

    addConnectedPowerCenterIds(connectedPowerCenterIds) {
        for (const connectedPowerCenterId of connectedPowerCenterIds) {
            this.connectedPowerCenterIds.add(connectedPowerCenterId);
        }
    }

    removeConnectedPowerCenterIds(connectedPowerCenterIds) {
        for (const connectedPowerCenterId of connectedPowerCenterIds) {
            this.connectedPowerCenterIds.delete(connectedPowerCenterId);
        }
    }
}
export { PowerCenter };
