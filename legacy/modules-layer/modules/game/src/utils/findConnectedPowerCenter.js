import { findFirstPowerCenterWithinRoad } from "./findFirstPowerCenterWithinRoad";
import { GLOBAL_BUILDING_TYPES } from "shared/enums";

const findConnectedPowerCenter = (gameState, startingMapTile) => {
    const searchDirections = [];
    const connectedPowerCenters = [];

    if (startingMapTile.globalBuilding.type === GLOBAL_BUILDING_TYPES.POWER_CENTER) {
        connectedPowerCenters.push(startingMapTile.getPowerCenter(gameState));
    }

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
