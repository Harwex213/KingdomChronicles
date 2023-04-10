import { GLOBAL_BUILDING_TYPES, AREA_TYPES } from "shared/enums";

const canPlaceRoad = ({ gameState, playerIndex, row, col }) => {
    const { map } = gameState;

    const examinedMapTile = map.matrix[row][col];
    const examinedRegion = map.regions[examinedMapTile.partRegion.regionIndex];

    if (examinedRegion.ownerIndex !== playerIndex) {
        return false;
    }

    if (examinedMapTile.areaType === AREA_TYPES.MOUNTAIN) {
        return false;
    }

    return examinedMapTile.globalBuilding.type === GLOBAL_BUILDING_TYPES.NONE;
};

export { canPlaceRoad };
