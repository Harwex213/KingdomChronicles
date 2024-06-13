const findFirstPowerCenterWithinRoad = (gameState, roadMapTile) => {
    const stack = [roadMapTile];
    const visitedMapTiles = new Set();

    let currentMapTile;
    let neighborMapTiles;
    while (stack.length !== 0) {
        currentMapTile = stack.pop();
        visitedMapTiles.add(currentMapTile.id);

        neighborMapTiles = currentMapTile.getNeighbors(gameState.map);
        for (const neighborMapTile of neighborMapTiles) {
            if (neighborMapTile.hasBuildedPowerCenter) {
                return gameState.powerCenters[neighborMapTile.globalBuilding.id];
            }
            if (visitedMapTiles.has(neighborMapTile.id) === false && neighborMapTile.hasBuildedRoad) {
                stack.push(neighborMapTile);
            }
        }
    }

    return null;
};

export { findFirstPowerCenterWithinRoad };
