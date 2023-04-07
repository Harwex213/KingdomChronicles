class PendingGlobalBuilding {
    constructor({ id, type, row, col, totalTicks, remainedTicks }) {
        this.id = id;
        this.type = type;
        this.row = row;
        this.col = col;
        this.totalTicks = totalTicks;
        this.remainedTicks = remainedTicks;
    }
}
export { PendingGlobalBuilding };
