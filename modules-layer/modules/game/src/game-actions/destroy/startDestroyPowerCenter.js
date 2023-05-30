import { PendingDestroyGlobalBuilding } from "shared/models";
import { POWER_CENTER_VALUES } from "shared/constants";
import { destroyExternalBuilding, disconnectPowerCenters, findConnectedPowerCenter } from "../../utils";
import { GLOBAL_BUILDING_TYPES } from "shared/enums";

const startDestroyPowerCenter = ({ gameState, playerIndex, powerCenterId }) => {
    const player = gameState.players[playerIndex];
    const powerCenter = gameState.powerCenters[powerCenterId];

    if (powerCenter && powerCenter.getRegion(gameState.map).ownerIndex !== playerIndex) {
        return false;
    }

    for (const externalBuildingId of powerCenter.externalBuildingIds) {
        const externalBuilding = gameState.externalBuildings[externalBuildingId];
        destroyExternalBuilding(gameState, externalBuilding);
    }

    const pendingDestroyGlobalBuilding = new PendingDestroyGlobalBuilding({
        id: powerCenter.id,
        type: GLOBAL_BUILDING_TYPES.POWER_CENTER,
        row: powerCenter.row,
        col: powerCenter.col,
        totalTicks: POWER_CENTER_VALUES.TICKS_DESTROY_TIME,
        remainedTicks: POWER_CENTER_VALUES.TICKS_DESTROY_TIME,
    });

    const mapTile = pendingDestroyGlobalBuilding.getTile(gameState.map);

    const connectedPowerCenters = findConnectedPowerCenter(gameState, mapTile);
    disconnectPowerCenters(connectedPowerCenters);

    mapTile.onStartDestroyGlobalBuilding(pendingDestroyGlobalBuilding.remainedTicks);

    for (const controlAreaMapTile of powerCenter.getControlArea(gameState.map)) {
        controlAreaMapTile.removePowerCenterInfluence(powerCenter.id);
    }

    player.removePowerCenter(powerCenterId);

    gameState.pendingDestroy.globalBuildings[pendingDestroyGlobalBuilding.id] = pendingDestroyGlobalBuilding;
    delete gameState.powerCenters[powerCenterId];
};

export { startDestroyPowerCenter };
