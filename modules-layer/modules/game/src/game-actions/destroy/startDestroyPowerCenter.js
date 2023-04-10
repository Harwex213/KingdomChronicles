import { PendingDestroyGlobalBuilding } from "shared/models";
import { destroyExternalBuilding } from "./destroyExternalBuilding";
import { POWER_CENTER_VALUES } from "shared/constants";

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
        row: powerCenter.row,
        col: powerCenter.col,
        totalTicks: POWER_CENTER_VALUES.TICKS_DESTROY_TIME,
        remainedTicks: POWER_CENTER_VALUES.TICKS_DESTROY_TIME,
    });

    player.removePowerCenter(powerCenterId);
    gameState.pendingDestroy.globalBuildings[pendingDestroyGlobalBuilding.id] = pendingDestroyGlobalBuilding;
    delete this.powerCenters[powerCenterId];
};

export { startDestroyPowerCenter };
