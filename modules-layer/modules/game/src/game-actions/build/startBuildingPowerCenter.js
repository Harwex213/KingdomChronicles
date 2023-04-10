import { PendingGlobalBuilding } from "shared/models";
import { GAME_ACTIONS, GAME_VALIDATIONS, GLOBAL_BUILDING_TYPES } from "shared/enums";
import { POWER_CENTER_VALUES } from "shared/constants";
import { generateRandomId } from "../../utils";

const startBuildingPowerCenter = ({ gameState, gameValidator, playerIndex, row, col }) => {
    let canDoAction = true;

    canDoAction =
        canDoAction &&
        gameValidator.validate(GAME_VALIDATIONS.CAN_BUILD_POWER_CENTER, {
            playerIndex,
        });

    canDoAction =
        canDoAction &&
        gameValidator.validate(GAME_VALIDATIONS.CAN_PLACE_POWER_CENTER, {
            playerIndex,
            row,
            col,
        });

    if (canDoAction === false) {
        return;
    }

    const pendingGlobalBuilding = new PendingGlobalBuilding({
        id: generateRandomId(),
        type: GLOBAL_BUILDING_TYPES.POWER_CENTER,
        row,
        col,
        totalTicks: POWER_CENTER_VALUES.TICKS_BUILD_TIME,
        remainedTicks: POWER_CENTER_VALUES.TICKS_BUILD_TIME,
    });
    gameState.pendingGlobalBuildings[pendingGlobalBuilding.id] = pendingGlobalBuilding;
    gameState.map.matrix[pendingGlobalBuilding.row][pendingGlobalBuilding.col].onStartBuildingGlobalBuilding(
        pendingGlobalBuilding.type,
        pendingGlobalBuilding.remainedTicks
    );
    gameState.players[playerIndex].onStartBuild(GAME_ACTIONS.START_BUILD_POWER_CENTER);
};

export { startBuildingPowerCenter };
