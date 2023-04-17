import { GLOBAL_BUILDING_TYPES, AREA_TYPES, TILE_TYPES } from "shared/enums";

const canPlaceRoad = ({ gameState, playerIndex, row, col }) => {
    const { map } = gameState;

    const examinedMapTile = map.matrix[row][col];
    const examinedRegion = map.regions[examinedMapTile.partRegion.regionIndex];

    let isOkay = true;

    isOkay &&= examinedRegion.ownerIndex === playerIndex;
    isOkay &&= examinedMapTile.tileType === TILE_TYPES.LAND;
    isOkay &&= examinedMapTile.areaType !== AREA_TYPES.MOUNTAIN;
    isOkay &&= examinedMapTile.globalBuilding.type === GLOBAL_BUILDING_TYPES.NONE;

    return isOkay;
};

export { canPlaceRoad };
