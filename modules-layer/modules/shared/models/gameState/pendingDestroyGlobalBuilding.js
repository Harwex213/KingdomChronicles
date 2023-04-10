class PendingDestroyGlobalBuilding {
    constructor({
        id,
        type,
        row,
        col,
        totalTicks,
        remainedTicks,

        externalBuilding = null,
    }) {
        this.id = id;
        this.type = type;
        this.row = row;
        this.col = col;
        this.totalTicks = totalTicks;
        this.remainedTicks = remainedTicks;
        this.externalBuilding = externalBuilding;
    }

    getTile(map) {
        return map.matrix[this.row][this.col];
    }
}
export { PendingDestroyGlobalBuilding };
