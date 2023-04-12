const isPlayerOwnPowerCenter = ({ gameState, playerIndex, powerCenterId }) => {
    const powerCenter = gameState.powerCenters[powerCenterId];

    return powerCenter && powerCenter.ownerIndex === playerIndex;
};

export { isPlayerOwnPowerCenter };
