import { action, makeObservable, observable } from "mobx";
import { POWER_CENTER_VALUES, REGION_VALUES, ROAD_VALUES } from "../../game-variables";

const sumArithmeticProgression = (firstMember, delta, n) => ((2 * firstMember + delta * (n - 1)) / 2) * n;

class Player {
    constructor() {
        this.index = -1;

        this.economic = {
            income: 0,
            outcome: 0,
            treasure: 0,
        };
        this.outcome = {
            withinRegions: 0,
            withinPowerCenters: 0,
        };

        this.info = {
            name: "",
            kingdomName: "",
            motto: "",
            colorStr: "#000",
            color: 0x000,
        };

        this.domain = {
            regions: [],
            powerCenters: [],
        };

        makeObservable(this, {
            economic: observable,
            doEconomicDelta: action,

            addRegion: action,
            removeRegion: action,
            onStartBuildPowerCenter: action,
            onStartBuildRoad: action,
            addPowerCenter: action,
            removePowerCenter: action,
        });
    }

    #recalcIncome() {
        // TODO: calc income from power centers
    }

    #recalcOutcome() {
        this.outcome.withinRegions = sumArithmeticProgression(
            REGION_VALUES.INITIAL_PROVISION,
            REGION_VALUES.PROVISION_INCREASING_DELTA,
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
        region.ownerIndex = this.index;
        region.borderColor = this.info.color;

        this.#recalcOutcome();
    }

    removeRegion(region) {
        const index = this.domain.regions.findIndex((i) => i === region.index);
        if (index !== -1) {
            this.domain.regions.splice(index, 1);
            region.ownerIndex = -1;

            this.#recalcOutcome();
        }
    }

    onStartBuildPowerCenter() {
        this.economic.treasure -= POWER_CENTER_VALUES.COST;
    }

    onStartBuildRoad() {
        this.economic.treasure -= ROAD_VALUES.COST;
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
