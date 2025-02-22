import { GAME_VALIDATIONS, GLOBAL_BUILDING_TYPES } from "shared/enums";
import { ROAD_VALUES } from "shared/constants";
import { PendingDestroyGlobalBuilding } from "shared/models";
import { disconnectPowerCenters, findConnectedPowerCenter, generateRandomId } from "../../utils";

const startDestroyRoad = ({ gameState, gameValidator, playerIndex, row, col }) => {
    if (
        gameValidator.validate(GAME_VALIDATIONS.CAN_DESTROY_PLACED_ROAD, {
            playerIndex,
            row,
            col,
        }) === false
    ) {
        return;
    }

    const mapTile = gameState.map.matrix[row][col];

    const connectedPowerCenters = findConnectedPowerCenter(gameState, mapTile);
    disconnectPowerCenters(connectedPowerCenters);

    const pendingDestroyGlobalBuilding = new PendingDestroyGlobalBuilding({
        id: gameState.randomizer.getRandom().toString(36).substring(0, 10),
        type: GLOBAL_BUILDING_TYPES.ROAD,
        row: row,
        col: col,
        totalTicks: ROAD_VALUES.TICKS_DESTROY_TIME,
        remainedTicks: ROAD_VALUES.TICKS_DESTROY_TIME,
    });

    mapTile.onStartDestroyGlobalBuilding(pendingDestroyGlobalBuilding.remainedTicks);

    gameState.pendingDestroy.globalBuildings[pendingDestroyGlobalBuilding.id] = pendingDestroyGlobalBuilding;
};

export { startDestroyRoad };
