import { GAME_VALIDATIONS, RESOURCE_NAMES } from "shared/enums";
import { INTERNAL_BUILDING_TYPES, PendingBuildInternalBuilding } from "shared/models";
import { generateRandomId } from "../../utils";

const startBuildInternalBuilding = ({
    gameState,
    gameValidator,

    playerIndex,
    powerCenterId,
    placementCellPos,
    internalBuildingTypeName,
}) => {
    if (
        gameValidator.validate(GAME_VALIDATIONS.CAN_BUILD_INTERNAL_BUILDING, {
            playerIndex,
            powerCenterId,
            placementCellPos,
            internalBuildingTypeName,
        }) === false
    ) {
        return;
    }

    const internalBuildingType = INTERNAL_BUILDING_TYPES[internalBuildingTypeName];
    const pendingBuildInternalBuilding = new PendingBuildInternalBuilding({
        id: generateRandomId(),
        type: internalBuildingTypeName,
        powerCenterId,
        placementCellPos,
        totalTicks: internalBuildingType.ticksAmountToBuild,
        remainedTicks: internalBuildingType.ticksAmountToBuild,
    });

    const moneyCost = internalBuildingType.buildCost[RESOURCE_NAMES.MONEY];
    if (moneyCost) {
        gameState.players[playerIndex].decreaseTreasure(moneyCost);
    }
    gameState.powerCenters[powerCenterId].subtractBuildCost(internalBuildingType.buildCost);

    gameState.pendingBuild.internalBuildings[pendingBuildInternalBuilding.id] = pendingBuildInternalBuilding;
};

export { startBuildInternalBuilding };
