import { GAME_VALIDATIONS, INTERNAL_BUILDING_TYPE_NAMES, RESOURCE_NAMES } from "shared/enums";
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

    const player = gameState.players[playerIndex];
    const powerCenter = gameState.powerCenters[powerCenterId];

    if (
        powerCenter.internalBuildings[placementCellPos] === INTERNAL_BUILDING_TYPE_NAMES.COLONIZATION_CENTER
    ) {
        if (player.currentColonizationRegionIndexes.length === player.colonistAmount) {
            const firstColonizationRegionIndex = player.currentColonizationRegionIndexes[0];
            player.revokeColonist(firstColonizationRegionIndex);
            gameState.map.regions[firstColonizationRegionIndex].removeColonist(playerIndex);
        }
        player.removeColonist();
    }

    const moneyCost = internalBuildingType.buildCost[RESOURCE_NAMES.MONEY];
    if (moneyCost) {
        player.decreaseTreasure(moneyCost);
    }
    player.subtractBuildCost(internalBuildingType.buildCost);

    gameState.pendingBuild.internalBuildings[pendingBuildInternalBuilding.id] = pendingBuildInternalBuilding;
};

export { startBuildInternalBuilding };
