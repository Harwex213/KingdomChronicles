class PendingBuildInternalBuilding {
    constructor({ id, type, powerCenterId, placementCellPos, totalTicks, remainedTicks }) {
        this.id = id;
        this.type = type;
        this.powerCenterId = powerCenterId;
        this.placementCellPos = placementCellPos;
        this.totalTicks = totalTicks;
        this.remainedTicks = remainedTicks;
    }
}

export { PendingBuildInternalBuilding };
