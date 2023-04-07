import { POWER_CENTER_VALUES } from "models/game-variables";

const canBuildPowerCenter = ({ gameState, playerIndex }) => {
    const player = gameState.players[playerIndex];

    return player.economic.treasure - POWER_CENTER_VALUES.COST >= 0;
};

export { canBuildPowerCenter };
