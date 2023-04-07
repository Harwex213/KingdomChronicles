import { GLOBAL_BUILDING_TYPES } from "models/game";
import { areaTypes } from "models/map";

const canPlacePowerCenter = ({ gameState, playerIndex, row, col }) => {
    const { map } = gameState;

    const examinedMapTile = map.matrix[row][col];
    const examinedRegion = map.regions[examinedMapTile.partRegion.regionIndex];

    if (examinedRegion.ownerIndex !== playerIndex) {
        return false;
    }

    if (examinedMapTile.areaType === areaTypes.MOUNTAIN) {
        return false;
    }

    if (examinedMapTile.globalBuilding.type !== GLOBAL_BUILDING_TYPES.NONE) {
        return false;
    }

    for (const [neighborRow, neighborCol] of Object.values(examinedMapTile.neighboringTiles)) {
        const examinedNeighborMapTile = map.matrix[neighborRow][neighborCol];
        if (examinedNeighborMapTile.globalBuilding.type === GLOBAL_BUILDING_TYPES.POWER_CENTER) {
            return false;
        }
    }

    return true;
};

export { canPlacePowerCenter };
