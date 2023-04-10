import { GLOBAL_BUILDING_TYPES } from "shared/enums";

const canDestroyPlacedExternalBuilding = ({ gameState, playerIndex, row, col }) => {
    const { map } = gameState;

    const examinedMapTile = map.matrix[row][col];
    const examinedRegion = map.regions[examinedMapTile.partRegion.regionIndex];

    if (examinedRegion.ownerIndex !== playerIndex) {
        return false;
    }

    return (
        examinedMapTile.hasGlobalBuilding &&
        examinedMapTile.globalBuilding.type === GLOBAL_BUILDING_TYPES.EXTERNAL_BUILDING
    );
};

export { canDestroyPlacedExternalBuilding };
