import { RESOURCE_NAMES } from "shared/enums";

const RESOURCE_NAMES_VALUES = Object.values(RESOURCE_NAMES);

const canSendTradeRoute = ({
    gameState,
    playerIndex,
    sourcePowerCenterId,
    destinationPowerCenterId,
    transferResourceName,
    transferAmount,
}) => {
    const sourcePowerCenter = gameState.powerCenters[sourcePowerCenterId];
    const destinationPowerCenter = gameState.powerCenters[destinationPowerCenterId];

    if (!destinationPowerCenter && destinationPowerCenter.ownerIndex !== playerIndex) {
        return false;
    }

    if (sourcePowerCenter.connectedPowerCenterIds.has(destinationPowerCenterId) === false) {
        return false;
    }

    if (
        sourcePowerCenter.getRegion(gameState.map).index !==
            destinationPowerCenter.getRegion(gameState.map).index &&
        sourcePowerCenter.hasGuild === false
    ) {
        return false;
    }

    if (sourcePowerCenter.leftThroughput - transferAmount < 0) {
        return false;
    }

    return RESOURCE_NAMES_VALUES.includes(transferResourceName);
};

export { canSendTradeRoute };
