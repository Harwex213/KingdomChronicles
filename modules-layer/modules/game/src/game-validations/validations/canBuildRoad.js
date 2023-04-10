import { ROAD_VALUES } from "shared/constants";

const canBuildRoad = ({ gameState, playerIndex }) => {
    const player = gameState.players[playerIndex];

    return player.economic.treasure - ROAD_VALUES.BUILD_COST >= 0;
};

export { canBuildRoad };
