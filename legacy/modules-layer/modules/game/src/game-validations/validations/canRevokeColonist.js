const canRevokeColonist = ({ gameState, playerIndex, regionIndex }) => {
    const examinedRegion = gameState.map.regions[regionIndex];

    if (examinedRegion.ownerIndex !== -1) {
        return false;
    }

    return examinedRegion.playerColonistsAmount[playerIndex] !== 0;
};

export { canRevokeColonist };
