import { findConnectedPowerCenter, connectPowerCenters } from "../../utils";

const roadBuilded = (gameState, pendingBuildGlobalBuilding) => {
    const mapTile = pendingBuildGlobalBuilding.getTile(gameState.map);

    const connectedPowerCenters = findConnectedPowerCenter(gameState, mapTile);
    connectPowerCenters(connectedPowerCenters);
};

export { roadBuilded };
