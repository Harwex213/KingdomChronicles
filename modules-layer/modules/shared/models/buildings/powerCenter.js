import { action, computed, makeObservable, observable } from "mobx";
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
        totalThroughput = 0,
        tradeRoutes = [],
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

        this.totalThroughput = totalThroughput;
        this.tradeRoutes = tradeRoutes;

        makeObservable(this, {
            tier: observable,
            currentLevel: observable,
            levelIncreaseCost: computed,

            people: observable,
            economic: observable,

            storageCapacity: observable,
            storage: observable,

            controlArea: observable,
            externalBuildingsAmount: observable,

            internalBuildings: observable,

            connectedPowerCenterIds: observable,
            totalThroughput: observable,
            leftThroughput: computed,
            tradeRoutes: observable,

            increaseLevel: action,

            switchCanGrow: action,
            eat: action,
            grow: action,
            produce: action,

            subtractBuildCost: action,
            subtractResourceAmount: action,
            addResourceAmount: action,
            onExternalBuildingBuilded: action,
            onExternalBuildingDestroyed: action,
            onInternalBuildingBuilded: action,

            addConnectedPowerCenterIds: action,
            removeConnectedPowerCenterIds: action,

            addTradeRoute: action,
            raiseTradeRouteOrder: action,
            lowerTradeRouteOrder: action,
            removeTradeRoute: action,
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

    getOwner(gameState) {
        return gameState.players[this.ownerIndex];
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

    #calcTotalThroughput() {
        this.totalThroughput = this.tier * POWER_CENTER_VALUES.INITIAL_THROUGHPUT;
    }

    #calcIncome() {
        this.economic.income = this.people.civilians * this.tier * POWER_CENTER_VALUES.PEOPLE_TAX_RATIO;

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
        this.#calcTotalThroughput();
    }

    get levelIncreaseCost() {
        const subtractMetaInfo = POWER_CENTER_TIER_TO_INCREASE_LEVEL[this.tier];
        const cost = {};
        for (const [resourceName, initialValue] of Object.entries(subtractMetaInfo.COST)) {
            cost[resourceName] = Number(
                (initialValue * Math.pow(subtractMetaInfo.RATIOS[resourceName], this.currentLevel)).toFixed(2)
            );
        }
        return cost;
    }

    increaseLevel() {
        this.subtractBuildCost(this.levelIncreaseCost);

        this.currentLevel++;

        if (this.currentLevel >= POWER_CENTER_TIER_UPGRADE_THRESHOLD[this.tier]) {
            this.#increaseTier();
        }
    }

    switchCanGrow() {
        this.people.canGrow = !this.people.canGrow;
    }

    eat() {
        this.people.growth = 0;

        const requiredFoodAmount =
            (this.people.civilians + this.people.recruits) * POWER_CENTER_VALUES.PEOPLE_EATS_FOOD_RATIO;
        const foodAmountDelta = this.storage[RESOURCE_NAMES.FOOD] - requiredFoodAmount;

        this.#tryDecreaseStorage(RESOURCE_NAMES.FOOD, requiredFoodAmount);
        if (foodAmountDelta < 0) {
            this.people.growth = Math.trunc(foodAmountDelta);
        }

        this.storage[RESOURCE_NAMES.FOOD] = Number(this.storage[RESOURCE_NAMES.FOOD].toFixed(2));
    }

    grow() {
        if (this.people.canGrow) {
            const availableFoodAmount = Math.trunc(this.storage[RESOURCE_NAMES.FOOD]);
            if (availableFoodAmount > 0) {
                this.people.growth = availableFoodAmount * POWER_CENTER_VALUES.FOOD_BORN_PEOPLE_RATIO;
            }
        }

        this.people.civilians += this.people.growth;
        this.#calcIncome();
    }

    #tryDecreaseStorage(resourceName, amount) {
        this.storage[resourceName] = this.storage[resourceName] - amount;
        if (this.storage[resourceName] < 0) {
            this.storage[resourceName] = 0;
        }

        this.storage[resourceName] = Number(this.storage[resourceName].toFixed(2));
    }

    #tryIncreaseStorage(resourceName, producedAmount) {
        this.storage[resourceName] += Math.min(
            producedAmount,
            this.storageCapacity - this.storage[resourceName]
        );
        this.storage[resourceName] = Number(this.storage[resourceName].toFixed(2));
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
                this.externalBuildingsAmount[resource.producedOn];
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

                const externalBuildingType = EXTERNAL_BUILDING_TYPES[resource.producedOn];

                requiredRawAmount =
                    externalBuildingType.production.requiredAmountPerTick *
                    this.externalBuildingsAmount[resource.producedOn];
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
            this.storage[resourceName] = Number(this.storage[resourceName].toFixed(2));
        }
    }

    subtractResourceAmount(resourceName, amount) {
        this.storage[resourceName] -= amount;
    }

    addResourceAmount(resourceName, amount) {
        this.#tryIncreaseStorage(resourceName, amount);
    }

    onExternalBuildingBuilded(externalBuilding) {
        this.externalBuildingIds.push(externalBuilding.id);
        this.externalBuildingsAmount[externalBuilding.typeName]++;
        this.outcome += EXTERNAL_BUILDING_TYPES[externalBuilding.typeName].costPerTick;
    }

    onExternalBuildingDestroyed(externalBuilding) {
        this.externalBuildingIds = this.externalBuildingIds.filter((id) => id !== externalBuilding.id);
        this.externalBuildingsAmount[externalBuilding.typeName]--;
        this.outcome -= EXTERNAL_BUILDING_TYPES[externalBuilding.typeName].costPerTick;
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

    get hasGuild() {
        return (
            this.internalBuildings.filter((typeName) => typeName === INTERNAL_BUILDING_TYPE_NAMES.GUILD)
                .length >= 1
        );
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

    get leftThroughput() {
        return (
            this.totalThroughput - this.tradeRoutes.reduce((a, b) => a.transferAmount + b.transferAmount, 0)
        );
    }

    addTradeRoute(tradeRoute) {
        this.tradeRoutes.push(tradeRoute);
    }

    removeTradeRoute(index) {
        this.tradeRoutes.splice(index, 1);
    }

    raiseTradeRouteOrder(tradeRouteIndex) {
        const removedRoute = this.tradeRoutes.splice(tradeRouteIndex, 1)[0];
        this.tradeRoutes.splice(tradeRouteIndex - 1, 0, removedRoute);
    }

    lowerTradeRouteOrder(tradeRouteIndex) {
        const removedRoute = this.tradeRoutes.splice(tradeRouteIndex, 1)[0];
        this.tradeRoutes.splice(tradeRouteIndex + 1, 0, removedRoute);
    }
}
export { PowerCenter };
