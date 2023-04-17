const lowerTradeRouteOrder = ({ gameState, playerIndex, powerCenterId, tradeRouteIndex }) => {
    const powerCenter = gameState.powerCenters[powerCenterId];

    if (!powerCenter && powerCenter.ownerIndex !== playerIndex) {
        return;
    }

    if (tradeRouteIndex > 0) {
        powerCenter.lowerTradeRouteOrder(tradeRouteIndex);
    }
};

export { lowerTradeRouteOrder };
