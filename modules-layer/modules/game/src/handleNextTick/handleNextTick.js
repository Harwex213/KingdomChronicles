import { GLOBAL_BUILDING_TYPES } from "shared/enums";
import { powerCenterBuilded } from "./powerCenterBuilded";
import { externalBuildingBuilded } from "./externalBuildingBuilded";
import { internalBuildingBuilded } from "./internalBuildingBuilded";

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
                powerCenterBuilded(gameState, pendingBuildGlobalBuilding);
            }
            if (pendingBuildGlobalBuilding.type === GLOBAL_BUILDING_TYPES.EXTERNAL_BUILDING) {
                externalBuildingBuilded(gameState, pendingBuildGlobalBuilding);
            }
            if (pendingBuildGlobalBuilding.type === GLOBAL_BUILDING_TYPES.ROAD) {
                // TODO
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
            garbage.push(pendingDestroyGlobalBuilding.id);
        }
    }

    for (const pendingDestroyGlobalBuildingId of garbage) {
        delete pendingDestroyGlobalBuildings[pendingDestroyGlobalBuildingId];
    }
};

const handleNextTick = (gameState) => {
    for (const powerCenter of gameState.powerCenters) {
        powerCenter.produce();
        powerCenter.grow();
    }

    doPlayersEconomicDelta(gameState.players);

    continueBuildGlobalBuildings(gameState);
    continueBuildInternalBuildings(gameState);
    continueDestroyGlobalBuildings(gameState);

    gameState.nextTick();
};

export { handleNextTick };
