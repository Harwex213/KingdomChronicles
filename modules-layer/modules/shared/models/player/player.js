import { action, computed, makeObservable, observable } from "mobx";
import { PLAYER_VALUES, POWER_CENTER_VALUES, REGION_VALUES } from "../../constants";
import { EXTERNAL_BUILDING_TYPES } from "../buildings/externalBuildingTypes";

const sumArithmeticProgression = (firstMember, delta, n) => ((2 * firstMember + delta * (n - 1)) / 2) * n;

class Player {
    constructor({
        index,
        treasure = PLAYER_VALUES.INITIAL_TREASURE,
        income = {
            withinPowerCenters: 0,
        },
        outcome = {
            withinRegions: 0,
            withinPowerCenters: 0,
            withinExternalBuildings: 0,
            withinColonization: 0,
        },
        info,
        regions = [],
        powerCenters = [],
        colonistAmount = 0,
        currentColonizationRegionIndexes = [],
    }) {
        this.index = index;
        this.treasure = treasure;
        this.income = income;
        this.outcome = outcome;
        this.info = info;
        this.regions = regions;
        this.powerCenters = powerCenters;

        this.colonistAmount = colonistAmount;
        this.currentColonizationRegionIndexes = currentColonizationRegionIndexes;

        makeObservable(this, {
            treasure: observable,
            resultOutcome: computed,
            resultIncome: computed,
            income: observable,
            outcome: observable,

            addRegion: action,
            removeRegion: action,

            addPowerCenter: action,
            removePowerCenter: action,

            onExternalBuildingBuilded: action,
            onExternalBuildingDestroyed: action,

            recalcPowerCentersIncome: action,
            decreaseTreasure: action,
            doEconomicDelta: action,

            colonistAmount: observable,
            addColonist: action,
            removeColonist: action,
            sendColonist: action,
            revokeColonist: action,
            freeColonistAmount: computed,
        });
    }

    get resultOutcome() {
        return Object.values(this.outcome).reduce((a, b) => a + b, 0);
    }

    get resultIncome() {
        return Object.values(this.income).reduce((a, b) => a + b, 0);
    }

    #recalcOutcomeWithinRegions() {
        this.outcome.withinRegions = sumArithmeticProgression(
            REGION_VALUES.INITIAL_COST,
            REGION_VALUES.COST_INCREASING_DELTA,
            this.regions.length
        );
    }

    #recalcOutcomeWithinPowerCenters() {
        this.outcome.withinPowerCenters = sumArithmeticProgression(
            POWER_CENTER_VALUES.INITIAL_COST,
            POWER_CENTER_VALUES.COST_INCREASING_DELTA,
            this.powerCenters.length
        );
    }

    #recalcOutcomeWithinColonization() {
        this.outcome.withinColonization =
            this.currentColonizationRegionIndexes.length * PLAYER_VALUES.ONE_COLONIST_COST;
    }

    onExternalBuildingBuilded(externalBuilding) {
        this.outcome.withinExternalBuildings +=
            EXTERNAL_BUILDING_TYPES[externalBuilding.typeName].costPerTick;
    }

    onExternalBuildingDestroyed(externalBuilding) {
        this.outcome.withinExternalBuildings -=
            EXTERNAL_BUILDING_TYPES[externalBuilding.typeName].costPerTick;
    }

    addRegion(region) {
        this.regions.push(region.index);
        this.#recalcOutcomeWithinRegions();
    }

    removeRegion(region) {
        const index = this.regions.findIndex((i) => i === region.index);
        if (index !== -1) {
            this.regions.splice(index, 1);
            this.#recalcOutcomeWithinRegions();
        }
    }

    addPowerCenter(powerCenterId) {
        this.powerCenters.push(powerCenterId);
        this.#recalcOutcomeWithinPowerCenters();
    }

    removePowerCenter(powerCenterId) {
        const index = this.powerCenters.findIndex((id) => id === powerCenterId);
        if (index !== -1) {
            this.powerCenters.splice(index, 1);
            this.#recalcOutcomeWithinPowerCenters();
        }
    }

    recalcPowerCentersIncome(gameState) {
        this.income.withinPowerCenters = 0;
        let powerCenter;
        for (const powerCenterId of this.powerCenters) {
            powerCenter = gameState.powerCenters[powerCenterId];
            this.income.withinPowerCenters += powerCenter.economic.income;
        }
    }

    decreaseTreasure(amount) {
        this.treasure -= amount;
    }

    doEconomicDelta() {
        this.treasure += this.resultIncome - this.resultOutcome;
    }

    addColonist() {
        this.colonistAmount++;
    }

    removeColonist() {
        this.colonistAmount--;
    }

    sendColonist(regionIndex) {
        this.currentColonizationRegionIndexes.push(regionIndex);

        this.#recalcOutcomeWithinColonization();
    }

    revokeColonist(regionIndex) {
        const foundIndex = this.currentColonizationRegionIndexes.findIndex((i) => i === regionIndex);
        this.currentColonizationRegionIndexes.splice(foundIndex, 1);

        this.#recalcOutcomeWithinColonization();
    }

    get freeColonistAmount() {
        return this.colonistAmount - this.currentColonizationRegionIndexes.length;
    }
}

export { Player };
