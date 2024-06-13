import { updateRoadBitmask } from "../../utils";

const powerCenterDestroyed = (gameState, pendingDestroyGlobalBuilding) => {
    updateRoadBitmask(gameState, pendingDestroyGlobalBuilding.getTile(gameState.map));
};

export { powerCenterDestroyed };
