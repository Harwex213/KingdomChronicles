import { EXTERNAL_BUILDING_TYPES, PendingDestroyGlobalBuilding } from "shared/models";
import { GLOBAL_BUILDING_TYPES } from "shared/enums";

const destroyExternalBuilding = (gameState, externalBuilding) => {
    const powerCenter = gameState.powerCenters[externalBuilding.powerCenterId];

    const pendingDestroyGlobalBuilding = new PendingDestroyGlobalBuilding({
        id: externalBuilding.id,
        type: GLOBAL_BUILDING_TYPES.EXTERNAL_BUILDING,
        row: externalBuilding.row,
        col: externalBuilding.col,
        totalTicks: EXTERNAL_BUILDING_TYPES[externalBuilding.typeName].ticksAmountToDestroy,
        remainedTicks: EXTERNAL_BUILDING_TYPES[externalBuilding.typeName].ticksAmountToDestroy,
        externalBuilding: {
            typeName: externalBuilding.typeName,
            powerCenterId: externalBuilding.powerCenterId,
        },
    });

    pendingDestroyGlobalBuilding
        .getTile(gameState.map)
        .onStartDestroyGlobalBuilding(pendingDestroyGlobalBuilding.remainedTicks);
    powerCenter.onExternalBuildingDestroyed(externalBuilding);
    gameState.players[powerCenter.ownerIndex].onExternalBuildingDestroyed(externalBuilding);
    gameState.pendingDestroy.globalBuildings[pendingDestroyGlobalBuilding.id] = pendingDestroyGlobalBuilding;
    delete gameState.externalBuildings[externalBuilding.id];
};

export { destroyExternalBuilding };
