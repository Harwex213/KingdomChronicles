import { action, makeObservable, observable } from "mobx";
import { PLAYER_VALUES, POWER_CENTER_VALUES, REGION_VALUES, ROAD_VALUES } from "../../constants";
import { GAME_ACTIONS } from "../../enums";

const sumArithmeticProgression = (firstMember, delta, n) => ((2 * firstMember + delta * (n - 1)) / 2) * n;

const ACTION_NAME_TO_COST = {
    [GAME_ACTIONS.START_BUILD_POWER_CENTER]: POWER_CENTER_VALUES.BUILD_COST,
    [GAME_ACTIONS.START_BUILD_ROAD]: ROAD_VALUES.BUILD_COST,
};

class Player {
    constructor({
        index,
        economic = {
            income: 0,
            outcome: 0,
            treasure: PLAYER_VALUES.INITIAL_TREASURE,
        },
        outcome = {
            withinRegions: 0,
        },
        info,
        domain = {
            regions: [],
            powerCenters: [],
        },
    }) {
        this.index = index;
        this.economic = economic;
        this.outcome = outcome;
        this.info = info;
        this.domain = domain;

        makeObservable(this, {
            economic: observable,
            doEconomicDelta: action,
            onStartBuild: action,

            addRegion: action,
            removeRegion: action,

            addPowerCenter: action,
            removePowerCenter: action,
        });
    }

    #recalcIncome() {
        // TODO: calc income from power centers
    }

    #recalcOutcome() {
        this.outcome.withinRegions = sumArithmeticProgression(
            REGION_VALUES.INITIAL_COST,
            REGION_VALUES.COST_INCREASING_DELTA,
            this.domain.regions.length
        );
        // TODO: calc outcome from power centers
        // TODO: calc outcome from outer buildings
        this.economic.outcome = Object.values(this.outcome).reduce((a, b) => a + b, 0);
    }

    doEconomicDelta() {
        this.economic.treasure = this.economic.treasure + this.economic.income - this.economic.outcome;
    }

    addRegion(region) {
        this.domain.regions.push(region.index);
        this.#recalcOutcome();
    }

    removeRegion(region) {
        const index = this.domain.regions.findIndex((i) => i === region.index);
        if (index !== -1) {
            this.domain.regions.splice(index, 1);
            this.#recalcOutcome();
        }
    }

    onStartBuild(actionName) {
        const cost = ACTION_NAME_TO_COST[actionName];
        if (cost) {
            this.economic.treasure -= cost;
        }
    }

    addPowerCenter(powerCenterId) {
        this.domain.powerCenters.push(powerCenterId);

        this.#recalcIncome();
        this.#recalcOutcome();
    }

    removePowerCenter(powerCenterId) {
        const index = this.domain.powerCenters.findIndex((id) => id === powerCenterId);
        if (index !== -1) {
            this.domain.powerCenters.splice(index, 1);

            this.#recalcIncome();
            this.#recalcOutcome();
        }
    }
}

export { Player };
