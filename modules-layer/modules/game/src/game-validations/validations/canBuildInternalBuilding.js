import { INTERNAL_BUILDING_TYPES } from "shared/models";
import { RESOURCE_NAMES } from "shared/enums";

const canBuildInternalBuilding = ({
    gameState,
    playerIndex,
    placementCellPos,
    powerCenterId,
    internalBuildingTypeName,
}) => {
    const player = gameState.players[playerIndex];
    const powerCenter = gameState.powerCenters[powerCenterId];
    const internalBuildingType = INTERNAL_BUILDING_TYPES[internalBuildingTypeName];

    if (!powerCenter && powerCenter.ownerIndex !== playerIndex) {
        return false;
    }

    if (powerCenter.tier < internalBuildingType.minRequiredTier) {
        return false;
    }

    if (placementCellPos < 0 || powerCenter.placementCellsMaxAmount < placementCellPos + 1) {
        return false;
    }

    for (const [resourceName, value] of Object.entries(internalBuildingType.buildCost)) {
        if (resourceName === RESOURCE_NAMES.MONEY) {
            if (player.economic.treasure - value < 0) {
                return false;
            }
            continue;
        }

        if (powerCenter.storage[resourceName] - value < 0) {
            return false;
        }
    }
};

export { canBuildInternalBuilding };
