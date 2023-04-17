const canSendColonist = ({ gameState, playerIndex, regionIndex }) => {
    const examinedPlayer = gameState.players[playerIndex];
    const examinedRegion = gameState.map.regions[regionIndex];

    if (examinedRegion.ownerIndex !== -1) {
        return false;
    }

    if (examinedPlayer.freeColonistAmount === 0) {
        return false;
    }

    return examinedRegion.getNeighbors(gameState.map).some((region) => region.ownerIndex === playerIndex);
};

export { canSendColonist };
