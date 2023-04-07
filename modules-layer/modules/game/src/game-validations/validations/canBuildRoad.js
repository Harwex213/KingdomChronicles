import { ROAD_VALUES } from "models/game-variables";

const canBuildRoad = ({ gameState, playerIndex }) => {
    const player = gameState.players[playerIndex];

    return player.economic.treasure - ROAD_VALUES.COST >= 0;
};

export { canBuildRoad };
