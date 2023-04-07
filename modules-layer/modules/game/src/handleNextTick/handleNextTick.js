import { GLOBAL_BUILDING_TYPES } from "models/game";
import { powerCenterBuilded } from "./powerCenterBuilded";

const GLOBAL_BUILDING_TYPE_TO_EVENT = {
    [GLOBAL_BUILDING_TYPES.POWER_CENTER]: powerCenterBuilded,
};

const doPlayersEconomicDelta = (players) => {
    for (const player of players) {
        player.doEconomicDelta();
    }
};

const continueGlobalBuilding = (gameState) => {
    const { map, pendingGlobalBuildings } = gameState;

    const toDeletePendingGlobalBuildings = [];
    for (const pendingGlobalBuilding of Object.values(pendingGlobalBuildings)) {
        map.matrix[pendingGlobalBuilding.row][pendingGlobalBuilding.col].decreaseRemainedTicksToBuild();

        pendingGlobalBuilding.remainedTicks--;
        if (pendingGlobalBuilding.remainedTicks === 0) {
            GLOBAL_BUILDING_TYPE_TO_EVENT[pendingGlobalBuilding.type]({
                gameState,
                ...pendingGlobalBuilding,
            });

            toDeletePendingGlobalBuildings.push(pendingGlobalBuilding.id);
        }
    }

    for (const pendingGlobalBuildingsId of toDeletePendingGlobalBuildings) {
        delete pendingGlobalBuildings[pendingGlobalBuildingsId];
    }
};

const handleNextTick = (gameState) => {
    doPlayersEconomicDelta(gameState.players);

    continueGlobalBuilding(gameState);

    gameState.nextTick();
};

export { handleNextTick };
