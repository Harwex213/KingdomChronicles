import { updateRoadBitmask } from "../../utils";

const roadDestroyed = (gameState, pendingDestroyGlobalBuilding) => {
    updateRoadBitmask(gameState, pendingDestroyGlobalBuilding.getTile(gameState.map));
};

export { roadDestroyed };
