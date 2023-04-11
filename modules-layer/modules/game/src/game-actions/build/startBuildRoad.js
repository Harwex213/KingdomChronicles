import { GAME_VALIDATIONS, GLOBAL_BUILDING_TYPES } from "shared/enums";
import { ROAD_VALUES } from "shared/constants";
import { PendingBuildGlobalBuilding } from "shared/models";
import { generateRandomId, updateRoadBitmask } from "../../utils";

const startBuildRoad = ({ gameState, gameValidator, playerIndex, row, col }) => {
    let canDoAction = true;

    canDoAction &&= gameValidator.validate(GAME_VALIDATIONS.CAN_BUILD_ROAD, {
        playerIndex,
    });

    canDoAction &&= gameValidator.validate(GAME_VALIDATIONS.CAN_BUILD_ROAD, {
        playerIndex,
    });

    if (canDoAction === false) {
        return;
    }

    const pendingBuildGlobalBuilding = new PendingBuildGlobalBuilding({
        id: generateRandomId(),
        type: GLOBAL_BUILDING_TYPES.ROAD,
        row,
        col,
        totalTicks: ROAD_VALUES.TICKS_BUILD_TIME,
        remainedTicks: ROAD_VALUES.TICKS_BUILD_TIME,
    });

    const mapTile = pendingBuildGlobalBuilding.getTile(gameState.map);

    mapTile.onStartBuildGlobalBuilding(pendingBuildGlobalBuilding);

    updateRoadBitmask(gameState, mapTile);

    gameState.players[playerIndex].decreaseTreasure(ROAD_VALUES.BUILD_COST);

    gameState.pendingBuild.globalBuildings[pendingBuildGlobalBuilding.id] = pendingBuildGlobalBuilding;
};

export { startBuildRoad };
