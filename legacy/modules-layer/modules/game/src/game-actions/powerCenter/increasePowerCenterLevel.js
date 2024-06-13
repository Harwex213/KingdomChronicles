import { GAME_VALIDATIONS, RESOURCE_NAMES } from "shared/enums";

const increasePowerCenterLevel = ({ gameState, gameValidator, playerIndex, powerCenterId }) => {
    if (
        gameValidator.validate(GAME_VALIDATIONS.CAN_INCREASE_POWER_CENTER_LEVEL, {
            playerIndex,
            powerCenterId,
        }) === false
    ) {
        return;
    }

    const powerCenter = gameState.powerCenters[powerCenterId];
    const moneyCost = powerCenter.levelIncreaseCost[RESOURCE_NAMES.MONEY];
    if (moneyCost) {
        gameState.players[playerIndex].decreaseTreasure(moneyCost);
    }
    powerCenter.increaseLevel();
};

export { increasePowerCenterLevel };
