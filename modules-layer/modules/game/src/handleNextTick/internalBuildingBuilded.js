import { InternalBuilding } from "shared/models";

const internalBuildingBuilded = (gameState, pendingBuildInternalBuilding) => {
    const powerCenter = gameState.powerCenters[pendingBuildInternalBuilding.powerCenterId];

    const internalBuilding = new InternalBuilding({
        id: pendingBuildInternalBuilding.id,
        powerCenterId: powerCenter.id,
        placementCellPos: pendingBuildInternalBuilding.placementCellPos,
        typeName: pendingBuildInternalBuilding.type,
    });

    powerCenter.onInternalBuildingBuilded(internalBuilding);
};

export { internalBuildingBuilded };
