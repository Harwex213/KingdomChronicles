class InternalBuildingType {
    constructor({ minRequiredTier, buildCost, ticksAmountToBuild, typeName }) {
        this.minRequiredTier = minRequiredTier;
        this.buildCost = buildCost;
        this.ticksAmountToBuild = ticksAmountToBuild;
        this.typeName = typeName;
    }
}

export { InternalBuildingType };
