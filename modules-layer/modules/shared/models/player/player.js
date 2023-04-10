import { action, makeObservable, observable } from "mobx";
import { PLAYER_VALUES, POWER_CENTER_VALUES, REGION_VALUES } from "../../constants";

const sumArithmeticProgression = (firstMember, delta, n) => ((2 * firstMember + delta * (n - 1)) / 2) * n;

class Player {
    constructor({
        index,
        economic = {
            treasure: PLAYER_VALUES.INITIAL_TREASURE,
            resultIncome: 0,
            resultOutcome: 0,
        },
        income = {
            withinPowerCenters: 0,
        },
        outcome = {
            withinRegions: 0,
            withinPowerCenters: 0,
            withinExternalBuildings: 0,
        },
        info,
        regions = [],
        powerCenters = [],
    }) {
        this.index = index;
        this.economic = economic;
        this.income = income;
        this.outcome = outcome;
        this.info = info;
        this.regions = regions;
        this.powerCenters = powerCenters;

        makeObservable(this, {
            economic: observable,
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
        });
    }

    #calcResultOutcome() {
        this.economic.resultOutcome = Object.values(this.outcome).reduce((a, b) => a + b, 0);
    }

    #calcResultIncome() {
        this.economic.resultIncome = Object.values(this.income).reduce((a, b) => a + b, 0);
    }

    #recalcOutcomeWithinRegions() {
        this.outcome.withinRegions = sumArithmeticProgression(
            REGION_VALUES.INITIAL_COST,
            REGION_VALUES.COST_INCREASING_DELTA,
            this.regions.length
        );
        this.#calcResultOutcome();
    }

    #recalcOutcomeWithinPowerCenters() {
        this.outcome.withinPowerCenters = sumArithmeticProgression(
            POWER_CENTER_VALUES.INITIAL_COST,
            POWER_CENTER_VALUES.COST_INCREASING_DELTA,
            this.powerCenters.length
        );
        this.#calcResultOutcome();
    }

    onExternalBuildingBuilded(powerCenter) {
        this.outcome.withinExternalBuildings += powerCenter.economic.outcome;
        this.#calcResultOutcome();
    }

    onExternalBuildingDestroyed(powerCenter) {
        this.outcome.withinExternalBuildings -= powerCenter.economic.outcome;
        this.#calcResultOutcome();
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
        let powerCenter;
        for (const powerCenterId of this.powerCenters) {
            powerCenter = gameState.powerCenters[powerCenterId];
            this.income.withinPowerCenters += powerCenter.economic.income;
        }

        this.#calcResultIncome();
    }

    decreaseTreasure(amount) {
        this.economic.treasure -= amount;
    }

    doEconomicDelta() {
        this.economic.treasure += this.economic.resultIncome - this.economic.resultOutcome;
    }
}

export { Player };
