import { GLOBAL_BUILDING_TYPES, AREA_TYPES, TILE_TYPES } from "shared/enums";

const canPlacePowerCenter = ({ gameState, playerIndex, row, col }) => {
    const { map } = gameState;

    const examinedMapTile = map.matrix[row][col];
    const examinedRegion = map.regions[examinedMapTile.partRegion.regionIndex];

    let isOkay = true;

    isOkay &&= examinedRegion.ownerIndex === playerIndex;
    isOkay &&= examinedMapTile.tileType === TILE_TYPES.LAND;
    isOkay &&= examinedMapTile.areaType !== AREA_TYPES.MOUNTAIN;
    isOkay &&= examinedMapTile.globalBuilding.type === GLOBAL_BUILDING_TYPES.NONE;

    if (!isOkay) {
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
