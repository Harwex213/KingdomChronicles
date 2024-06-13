import { AREA_TYPES, BIOM_TYPES, TILE_TYPES } from "shared/enums";

export const renderDevBioms = (map) => {
    let row = 0;
    const createTileFiller = (areaType) => {
        const scopeRow = row++;
        let scopeCol = 0;
        return (biomType) => {
            map.matrix[scopeRow][scopeCol].tileType = TILE_TYPES.LAND;
            map.matrix[scopeRow][scopeCol].biomType = biomType;
            map.matrix[scopeRow][scopeCol].areaType = areaType;
            scopeCol++;
        };
    };

    for (const tilesRow of map.matrix) {
        for (const mapTile of tilesRow) {
            mapTile.tileType = TILE_TYPES.SEA;
            mapTile.biomType = BIOM_TYPES.NONE;
            mapTile.areaType = AREA_TYPES.NONE;
        }
    }

    const setTileWithoutArea = createTileFiller(AREA_TYPES.NONE);
    setTileWithoutArea(BIOM_TYPES.GRASSLAND);
    setTileWithoutArea(BIOM_TYPES.FLATLAND);
    setTileWithoutArea(BIOM_TYPES.DESERT);
    setTileWithoutArea(BIOM_TYPES.TUNDRA);
    setTileWithoutArea(BIOM_TYPES.JUNGLE);

    const setTileWithMountain = createTileFiller(AREA_TYPES.MOUNTAIN);
    setTileWithMountain(BIOM_TYPES.FLATLAND);

    const setTileWithForest = createTileFiller(AREA_TYPES.FOREST);
    setTileWithForest(BIOM_TYPES.GRASSLAND);
    setTileWithForest(BIOM_TYPES.FLATLAND);
    setTileWithForest(BIOM_TYPES.TUNDRA);

    const setTileWithForestAndHills = createTileFiller(AREA_TYPES.FOREST_HILLS);
    setTileWithForestAndHills(BIOM_TYPES.GRASSLAND);
    setTileWithForestAndHills(BIOM_TYPES.FLATLAND);
    setTileWithForestAndHills(BIOM_TYPES.TUNDRA);

    const setTileWithHills = createTileFiller(AREA_TYPES.HILLS);
    setTileWithHills(BIOM_TYPES.GRASSLAND);
    setTileWithHills(BIOM_TYPES.FLATLAND);
    setTileWithHills(BIOM_TYPES.DESERT);
    setTileWithHills(BIOM_TYPES.TUNDRA);
};
