import { GLOBAL_BUILDING_TYPES, TILE_TYPES } from "shared/enums";
import { EXTERNAL_BUILDING_TYPES } from "shared/models";

const canPlaceExternalBuilding = ({
    gameState,

    playerIndex,
    powerCenterId,
    row,
    col,
    externalBuildingTypeName,
}) => {
    const { map } = gameState;

    const examinedMapTile = map.matrix[row][col];
    const examinedRegion = map.regions[examinedMapTile.partRegion.regionIndex];
    const externalBuildingType = EXTERNAL_BUILDING_TYPES[externalBuildingTypeName];

    let isOkay = true;

    isOkay &&= examinedRegion.ownerIndex === playerIndex;
    isOkay &&= examinedMapTile.tileType === TILE_TYPES.LAND;
    isOkay &&= externalBuildingType.acceptableBioms.includes(examinedMapTile.biomType);
    isOkay &&= externalBuildingType.acceptableAreas.includes(examinedMapTile.areaType);
    isOkay &&= examinedMapTile.globalBuilding.type === GLOBAL_BUILDING_TYPES.NONE;
    isOkay &&= examinedMapTile.influencedPowerCenterIds.has(powerCenterId);

    return isOkay;
};

export { canPlaceExternalBuilding };
