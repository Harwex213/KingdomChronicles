class ExternalBuildingType {
    constructor({
        acceptableBioms,
        acceptableAreas,
        buildCost,
        ticksAmountToBuild,
        ticksAmountToDestroy,
        production,
        costPerTick,
    }) {
        this.acceptableBioms = acceptableBioms;
        this.acceptableAreas = acceptableAreas;
        this.buildCost = buildCost;
        this.ticksAmountToBuild = ticksAmountToBuild;
        this.ticksAmountToDestroy = ticksAmountToDestroy;
        this.production = production;
        this.costPerTick = costPerTick;
    }
}

export { ExternalBuildingType };
