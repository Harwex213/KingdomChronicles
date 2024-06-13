class TradeRouteTransfer {
    constructor({ sourcePowerCenterId, destinationPowerCenterId, resourceName, amount }) {
        this.sourcePowerCenterId = sourcePowerCenterId;
        this.destinationPowerCenterId = destinationPowerCenterId;
        this.resourceName = resourceName;
        this.amount = amount;
    }

    getSourcePowerCenter(gameState) {
        return gameState.powerCenters[this.sourcePowerCenterId];
    }

    getDestinationPowerCenter(gameState) {
        return gameState.powerCenters[this.destinationPowerCenterId];
    }
}
export { TradeRouteTransfer };
