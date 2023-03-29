import { areaTypes, biomTypes, tileTypes } from "models/map";

export const renderDevBioms = (map) => {
    let row = 0;
    const createTileFiller = (areaType) => {
        const scopeRow = row++;
        let scopeCol = 0;
        return (biomType) => {
            map.matrix[scopeRow][scopeCol].tileType = tileTypes.LAND;
            map.matrix[scopeRow][scopeCol].biomType = biomType;
            map.matrix[scopeRow][scopeCol].areaType = areaType;
            scopeCol++;
        };
    };

    for (const tilesRow of map.matrix) {
        for (const mapTile of tilesRow) {
            mapTile.tileType = tileTypes.SEA;
            mapTile.biomType = biomTypes.NONE;
            mapTile.areaType = areaTypes.NONE;
        }
    }

    const setTileWithoutArea = createTileFiller(areaTypes.NONE);
    setTileWithoutArea(biomTypes.GRASSLAND);
    setTileWithoutArea(biomTypes.FLATLAND);
    setTileWithoutArea(biomTypes.DESERT);
    setTileWithoutArea(biomTypes.TUNDRA);
    setTileWithoutArea(biomTypes.MOUNTAIN);
    setTileWithoutArea(biomTypes.JUNGLE);

    const setTileWithForest = createTileFiller(areaTypes.FOREST);
    setTileWithForest(biomTypes.GRASSLAND);
    setTileWithForest(biomTypes.FLATLAND);
    setTileWithForest(biomTypes.TUNDRA);

    const setTileWithForestAndHills = createTileFiller(areaTypes.FOREST_HILLS);
    setTileWithForestAndHills(biomTypes.GRASSLAND);
    setTileWithForestAndHills(biomTypes.FLATLAND);
    setTileWithForestAndHills(biomTypes.TUNDRA);

    const setTileWithHills = createTileFiller(areaTypes.HILLS);
    setTileWithHills(biomTypes.GRASSLAND);
    setTileWithHills(biomTypes.FLATLAND);
    setTileWithHills(biomTypes.DESERT);
    setTileWithHills(biomTypes.TUNDRA);
};
