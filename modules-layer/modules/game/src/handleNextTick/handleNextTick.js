import { GLOBAL_BUILDING_TYPES } from "shared/enums";
import { TradeRouteTransfer } from "shared/models";
import { powerCenterBuilded } from "./eventHandlers/powerCenterBuilded";
import { externalBuildingBuilded } from "./eventHandlers/externalBuildingBuilded";
import { internalBuildingBuilded } from "./eventHandlers/internalBuildingBuilded";
import { roadBuilded } from "./eventHandlers/roadBuilded";
import { roadDestroyed } from "./eventHandlers/roadDestroyed";
import { powerCenterDestroyed } from "./eventHandlers/powerCenterDestroyed";
import { continueColonization } from "./eventHandlers/continueColonization";

const createTradeRouteTransfers = (powerCenter, tradeRouteTransfers) => {
    const powerCenterStorageSnapshot = { ...powerCenter.storage };
    let actualTransferAmount = 0;
    for (const tradeRoute of powerCenter.tradeRoutes) {
        actualTransferAmount = Math.min(
            powerCenterStorageSnapshot[tradeRoute.transferResourceName],
            tradeRoute.transferAmount
        );

        if (actualTransferAmount !== 0) {
            tradeRouteTransfers.push(
                new TradeRouteTransfer({
                    affectedPowerCenterId: tradeRoute.destinationPowerCenterId,
                    resourceName: tradeRoute.transferResourceName,
                    amount: actualTransferAmount,
                })
            );

            powerCenterStorageSnapshot[tradeRoute.transferResourceName] -= actualTransferAmount;
        }
    }
};

const makeTradeRouteTransfers = (gameState, tradeRouteTransfers) => {
    for (const tradeRouteTransfer of tradeRouteTransfers) {
        tradeRouteTransfer
            .getSourcePowerCenter(gameState)
            .subtractResourceAmount(tradeRouteTransfer.resourceName, tradeRouteTransfer.amount);
        tradeRouteTransfer
            .getDestinationPowerCenter(gameState)
            .addResourceAmount(tradeRouteTransfer.resourceName, tradeRouteTransfer.amount);
    }
};

const doPlayersEconomicDelta = (gameState) => {
    for (const player of gameState.players) {
        player.recalcPowerCentersIncome(gameState);
        player.doEconomicDelta();
    }
};

const continueBuildGlobalBuildings = (gameState) => {
    const pendingBuildGlobalBuildings = gameState.pendingBuild.globalBuildings;
    const garbage = [];

    for (const pendingBuildGlobalBuilding of Object.values(pendingBuildGlobalBuildings)) {
        pendingBuildGlobalBuilding.getTile(gameState.map).decreaseRemainedTicksToBuild();

        pendingBuildGlobalBuilding.remainedTicks--;
        if (pendingBuildGlobalBuilding.remainedTicks === 0) {
            if (pendingBuildGlobalBuilding.type === GLOBAL_BUILDING_TYPES.POWER_CENTER) {
                roadBuilded(gameState, pendingBuildGlobalBuilding);
            }
            if (pendingBuildGlobalBuilding.type === GLOBAL_BUILDING_TYPES.ROAD) {
                powerCenterBuilded(gameState, pendingBuildGlobalBuilding);
            }
            if (pendingBuildGlobalBuilding.type === GLOBAL_BUILDING_TYPES.EXTERNAL_BUILDING) {
                externalBuildingBuilded(gameState, pendingBuildGlobalBuilding);
            }

            garbage.push(pendingBuildGlobalBuilding.id);
        }
    }

    for (const pendingBuildGlobalBuildingId of garbage) {
        delete pendingBuildGlobalBuildings[pendingBuildGlobalBuildingId];
    }
};

const continueBuildInternalBuildings = (gameState) => {
    const pendingBuildInternalBuildings = gameState.pendingBuild.internalBuildings;
    const garbage = [];

    for (const pendingBuildInternalBuilding of Object.values(pendingBuildInternalBuildings)) {
        pendingBuildInternalBuilding.remainedTicks--;

        if (pendingBuildInternalBuilding.remainedTicks === 0) {
            internalBuildingBuilded(gameState, pendingBuildInternalBuilding);

            garbage.push(pendingBuildInternalBuilding.id);
        }
    }

    for (const pendingBuildInternalBuildingId of garbage) {
        delete pendingBuildInternalBuildings[pendingBuildInternalBuildingId];
    }
};

const continueDestroyGlobalBuildings = (gameState) => {
    const pendingDestroyGlobalBuildings = gameState.pendingBuild.globalBuildings;
    const garbage = [];

    for (const pendingDestroyGlobalBuilding of Object.values(pendingDestroyGlobalBuildings)) {
        pendingDestroyGlobalBuilding.getTile(gameState.map).decreaseRemainedTicksToDestroy();

        pendingDestroyGlobalBuilding.remainedTicks--;
        if (pendingDestroyGlobalBuilding.remainedTicks === 0) {
            if (pendingDestroyGlobalBuilding.type === GLOBAL_BUILDING_TYPES.POWER_CENTER) {
                roadDestroyed(gameState, pendingDestroyGlobalBuilding);
            }
            if (pendingDestroyGlobalBuilding.type === GLOBAL_BUILDING_TYPES.ROAD) {
                powerCenterDestroyed(gameState, pendingDestroyGlobalBuilding);
            }
            garbage.push(pendingDestroyGlobalBuilding.id);
        }
    }

    for (const pendingDestroyGlobalBuildingId of garbage) {
        delete pendingDestroyGlobalBuildings[pendingDestroyGlobalBuildingId];
    }
};

const handleNextTick = (gameState) => {
    const tradeRouteTransfers = [];
    for (const powerCenter of Object.values(gameState.powerCenters)) {
        powerCenter.produce();
        powerCenter.grow();
        createTradeRouteTransfers(powerCenter, tradeRouteTransfers);
    }

    makeTradeRouteTransfers(gameState, tradeRouteTransfers);

    doPlayersEconomicDelta(gameState);

    continueBuildGlobalBuildings(gameState);
    continueBuildInternalBuildings(gameState);
    continueDestroyGlobalBuildings(gameState);

    continueColonization(gameState);

    gameState.nextTick();
};

export { handleNextTick };
