const canCreateTradeRoute = ({ gameState, playerIndex, powerCenterId }) => {
    const powerCenter = gameState.powerCenters[powerCenterId];

    let can = powerCenter && powerCenter.ownerIndex === playerIndex;
    can &&= powerCenter.connectedPowerCenterIds.size > 0;
    can &&= powerCenter.leftThroughput !== 0;

    return can;
};

export { canCreateTradeRoute };
