import { GLOBAL_BUILDING_TYPES } from "models/game";
import { areaTypes } from "models/map";

const canPlaceRoad = ({ gameState, playerIndex, row, col }) => {
    const { map } = gameState;

    const examinedMapTile = map.matrix[row][col];
    const examinedRegion = map.regions[examinedMapTile.partRegion.regionIndex];

    if (examinedRegion.ownerIndex !== playerIndex) {
        return false;
    }

    if (examinedMapTile.areaType === areaTypes.MOUNTAIN) {
        return false;
    }

    return examinedMapTile.globalBuilding.type === GLOBAL_BUILDING_TYPES.NONE;
};

export { canPlaceRoad };
