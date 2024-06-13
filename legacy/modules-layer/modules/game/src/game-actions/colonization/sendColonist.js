import { GAME_VALIDATIONS } from "shared/enums";

const sendColonist = ({ gameState, gameValidator, playerIndex, regionIndex }) => {
    if (
        gameValidator.validate(GAME_VALIDATIONS.CAN_SEND_COLONIST, {
            playerIndex,
            regionIndex,
        }) === false
    ) {
        return;
    }

    gameState.players[playerIndex].sendColonist(regionIndex);
    gameState.map.regions[regionIndex].addColonist(playerIndex);
};

export { sendColonist };
