class TradeRoute {
    constructor({ destinationPowerCenterId, transferResourceName, transferAmount }) {
        this.destinationPowerCenterId = destinationPowerCenterId;
        this.transferResourceName = transferResourceName;
        this.transferAmount = transferAmount;
    }
}

export { TradeRoute };
