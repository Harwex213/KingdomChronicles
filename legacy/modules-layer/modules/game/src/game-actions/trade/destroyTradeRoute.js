const destroyTradeRoute = ({ gameState, gameValidator, playerIndex, powerCenterId, tradeRouteIndex }) => {
    const powerCenter = gameState.powerCenters[powerCenterId];

    if (!powerCenter && powerCenter.ownerIndex !== playerIndex) {
        return;
    }

    powerCenter.removeTradeRoute(tradeRouteIndex);
};

export { destroyTradeRoute };
