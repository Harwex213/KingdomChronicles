import { InternalBuilding } from "shared/models";
import { INTERNAL_BUILDING_TYPE_NAMES } from "shared/enums";

const internalBuildingBuilded = (gameState, pendingBuildInternalBuilding) => {
    const powerCenter = gameState.powerCenters[pendingBuildInternalBuilding.powerCenterId];

    const internalBuilding = new InternalBuilding({
        id: pendingBuildInternalBuilding.id,
        powerCenterId: powerCenter.id,
        placementCellPos: pendingBuildInternalBuilding.placementCellPos,
        typeName: pendingBuildInternalBuilding.type,
    });

    powerCenter.onInternalBuildingBuilded(internalBuilding);

    if (internalBuilding.typeName === INTERNAL_BUILDING_TYPE_NAMES.COLONIZATION_CENTER) {
        powerCenter.getOwner(gameState).addColonist();
    }
};

export { internalBuildingBuilded };
