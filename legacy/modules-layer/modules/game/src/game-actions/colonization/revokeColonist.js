import { GAME_VALIDATIONS } from "shared/enums";

const revokeColonist = ({ gameState, gameValidator, playerIndex, regionIndex }) => {
    if (
        gameValidator.validate(GAME_VALIDATIONS.CAN_REVOKE_COLONIST, {
            playerIndex,
            regionIndex,
        }) === false
    ) {
        return;
    }

    gameState.players[playerIndex].revokeColonist(regionIndex);
    gameState.map.regions[regionIndex].removeColonist(playerIndex);
};

export { revokeColonist };
