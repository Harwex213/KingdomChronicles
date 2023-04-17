class InternalBuildingType {
    constructor({ minRequiredTier, buildCost, ticksAmountToBuild }) {
        this.minRequiredTier = minRequiredTier;
        this.buildCost = buildCost;
        this.ticksAmountToBuild = ticksAmountToBuild;
    }
}

export { InternalBuildingType };
