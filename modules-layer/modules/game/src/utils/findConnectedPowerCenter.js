import { findFirstPowerCenterWithinRoad } from "./findFirstPowerCenterWithinRoad";

const findConnectedPowerCenter = (gameState, startingMapTile) => {
    const searchDirections = [];
    const connectedPowerCenters = [];

    const neighborMapTiles = startingMapTile.getNeighbors(gameState.map);
    for (const neighborMapTile of neighborMapTiles) {
        if (neighborMapTile.hasBuildedRoad) {
            searchDirections.push(neighborMapTile);
        }
        if (neighborMapTile.hasBuildedPowerCenter) {
            connectedPowerCenters.push(neighborMapTile.getPowerCenter(gameState));
        }
    }

    for (const searchDirection of searchDirections) {
        const powerCenter = findFirstPowerCenterWithinRoad(gameState, searchDirection);
        if (powerCenter !== null) {
            connectedPowerCenters.push(powerCenter);
        }
    }

    return connectedPowerCenters;
};

export { findConnectedPowerCenter };
