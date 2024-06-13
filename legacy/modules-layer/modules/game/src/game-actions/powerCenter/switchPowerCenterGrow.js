import { GAME_VALIDATIONS } from "shared/enums";

const switchPowerCenterGrow = ({ gameState, gameValidator, playerIndex, powerCenterId }) => {
    if (
        gameValidator.validate(GAME_VALIDATIONS.IS_PLAYER_OWN_POWER_CENTER, {
            playerIndex,
            powerCenterId,
        }) === false
    ) {
        return;
    }

    gameState.powerCenters[powerCenterId].switchCanGrow();
};

export { switchPowerCenterGrow };
