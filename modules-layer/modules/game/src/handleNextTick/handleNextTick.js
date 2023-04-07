import { GLOBAL_BUILDING_TYPES } from "models/game";
import { powerCenterBuilded } from "./powerCenterBuilded";

const handleNextTick = (gameState) => {
    const { map, players, pendingGlobalBuildings } = gameState;

    for (const player of players) {
        player.doEconomicDelta();
    }

    const toDeletePendingGlobalBuildings = [];
    for (const pendingGlobalBuilding of Object.values(pendingGlobalBuildings)) {
        map.matrix[pendingGlobalBuilding.row][pendingGlobalBuilding.col].decreaseRemainedTicksToBuild();

        pendingGlobalBuilding.remainedTicks--;
        if (pendingGlobalBuilding.remainedTicks === 0) {
            if (pendingGlobalBuilding.type === GLOBAL_BUILDING_TYPES.POWER_CENTER) {
                powerCenterBuilded({ gameState, ...pendingGlobalBuilding });
            }
            if (pendingGlobalBuilding.type === GLOBAL_BUILDING_TYPES.ROAD) {
                // TODO: road builded
            }

            toDeletePendingGlobalBuildings.push(pendingGlobalBuilding.id);
        }
    }
    for (const pendingGlobalBuildingsId of toDeletePendingGlobalBuildings) {
        delete pendingGlobalBuildings[pendingGlobalBuildingsId];
    }

    gameState.nextTick();
};

export { handleNextTick };
