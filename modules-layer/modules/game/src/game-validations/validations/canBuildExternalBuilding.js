import { EXTERNAL_BUILDING_TYPES } from "shared/models";
import { RESOURCE_NAMES } from "shared/enums";

const canBuildExternalBuilding = ({ gameState, playerIndex, powerCenterId, externalBuildingTypeName }) => {
    const player = gameState.players[playerIndex];
    const powerCenter = gameState.powerCenters[powerCenterId];
    const buildCost = EXTERNAL_BUILDING_TYPES[externalBuildingTypeName].buildCost;

    if (powerCenter.ownerIndex !== playerIndex) {
        return false;
    }

    for (const [resourceName, value] of Object.entries(buildCost)) {
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

export { canBuildExternalBuilding };
