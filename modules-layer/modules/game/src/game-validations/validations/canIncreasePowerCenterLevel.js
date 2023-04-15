import { isPlayerOwnPowerCenter } from "./isPlayerOwnPowerCenter";
import { RESOURCE_NAMES } from "shared/enums";

const canIncreasePowerCenterLevel = ({ gameState, playerIndex, powerCenterId }) => {
    if (isPlayerOwnPowerCenter({ gameState, playerIndex, powerCenterId }) === false) {
        return false;
    }

    const powerCenter = gameState.powerCenters[powerCenterId];
    const player = gameState.players[playerIndex];
    const levelIncreaseCost = powerCenter.levelIncreaseCost;
    for (const [resourceName, value] of Object.entries(levelIncreaseCost)) {
        if (resourceName === RESOURCE_NAMES.MONEY) {
            if (player.treasure - value < 0) {
                return false;
            }
            continue;
        }
        if (powerCenter.storage[resourceName] - value < 0) {
            return false;
        }
    }

    return true;
};

export { canIncreasePowerCenterLevel };
