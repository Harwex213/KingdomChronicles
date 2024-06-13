import { GAME_VALIDATIONS, GLOBAL_BUILDING_TYPES, RESOURCE_NAMES } from "shared/enums";
import { EXTERNAL_BUILDING_TYPES, PendingBuildGlobalBuilding } from "shared/models";

const startBuildExternalBuilding = ({
    gameState,
    gameValidator,

    playerIndex,
    powerCenterId,
    row,
    col,
    externalBuildingTypeName,
}) => {
    let canDoAction = true;

    canDoAction &&= gameValidator.validate(GAME_VALIDATIONS.CAN_BUILD_EXTERNAL_BUILDING, {
        playerIndex,
        powerCenterId,
        externalBuildingTypeName,
    });

    canDoAction &&= gameValidator.validate(GAME_VALIDATIONS.CAN_PLACE_EXTERNAL_BUILDING, {
        playerIndex,
        powerCenterId,
        row,
        col,
        externalBuildingTypeName,
    });

    if (canDoAction === false) {
        return;
    }

    const externalBuildingType = EXTERNAL_BUILDING_TYPES[externalBuildingTypeName];
    const pendingBuildGlobalBuilding = new PendingBuildGlobalBuilding({
        id: gameState.randomizer.getRandom().toString(36).substring(0, 10),
        type: GLOBAL_BUILDING_TYPES.EXTERNAL_BUILDING,
        row,
        col,
        totalTicks: externalBuildingType.ticksAmountToBuild,
        remainedTicks: externalBuildingType.ticksAmountToBuild,
        externalBuilding: {
            typeName: externalBuildingTypeName,
            powerCenterId: powerCenterId,
        },
    });

    const moneyCost = externalBuildingType.buildCost[RESOURCE_NAMES.MONEY];
    if (moneyCost) {
        gameState.players[playerIndex].decreaseTreasure(moneyCost);
    }
    gameState.powerCenters[powerCenterId].subtractBuildCost(externalBuildingType.buildCost);

    pendingBuildGlobalBuilding
        .getTile(gameState.map)
        .onStartBuildGlobalBuilding(pendingBuildGlobalBuilding, { externalBuildingTypeName });
    gameState.pendingBuild.globalBuildings[pendingBuildGlobalBuilding.id] = pendingBuildGlobalBuilding;
};

export { startBuildExternalBuilding };
