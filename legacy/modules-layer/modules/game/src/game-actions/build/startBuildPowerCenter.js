import { PendingBuildGlobalBuilding } from "shared/models";
import { GAME_VALIDATIONS, GLOBAL_BUILDING_TYPES } from "shared/enums";
import { POWER_CENTER_VALUES } from "shared/constants";
import { generateRandomId, updateRoadBitmask } from "../../utils";

const startBuildPowerCenter = ({ gameState, gameValidator, playerIndex, row, col }) => {
    let canDoAction = true;

    canDoAction &&= gameValidator.validate(GAME_VALIDATIONS.CAN_BUILD_POWER_CENTER, {
        playerIndex,
    });

    canDoAction &&= gameValidator.validate(GAME_VALIDATIONS.CAN_PLACE_POWER_CENTER, {
        playerIndex,
        row,
        col,
    });

    if (canDoAction === false) {
        return;
    }

    const pendingBuildGlobalBuilding = new PendingBuildGlobalBuilding({
        id: gameState.randomizer.getRandom().toString(36).substring(0, 10),
        type: GLOBAL_BUILDING_TYPES.POWER_CENTER,
        row,
        col,
        totalTicks: POWER_CENTER_VALUES.TICKS_BUILD_TIME,
        remainedTicks: POWER_CENTER_VALUES.TICKS_BUILD_TIME,
    });

    const powerCenterMapTile = pendingBuildGlobalBuilding.getTile(gameState.map);

    powerCenterMapTile.onStartBuildGlobalBuilding(pendingBuildGlobalBuilding);

    updateRoadBitmask(gameState, powerCenterMapTile);

    gameState.players[playerIndex].decreaseTreasure(POWER_CENTER_VALUES.BUILD_COST);

    gameState.pendingBuild.globalBuildings[pendingBuildGlobalBuilding.id] = pendingBuildGlobalBuilding;
};

export { startBuildPowerCenter };
