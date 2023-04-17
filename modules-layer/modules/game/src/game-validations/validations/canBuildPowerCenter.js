import { POWER_CENTER_VALUES } from "shared/constants";

const canBuildPowerCenter = ({ gameState, playerIndex }) => {
    const player = gameState.players[playerIndex];

    return player.treasure - POWER_CENTER_VALUES.BUILD_COST >= 0;
};

export { canBuildPowerCenter };
