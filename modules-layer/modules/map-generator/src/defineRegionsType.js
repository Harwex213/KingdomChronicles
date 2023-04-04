import { tileTypes } from "models/map";

const FIRST_ROW = 0;
const FIRST_COL = 0;
let map = null;

const markRegionAsSeaByTile = (mapTile) => {
    if (mapTile.tileType === tileTypes.SEA) {
        return;
    }

    const regionIndex = mapTile.partRegion.regionIndex;
    const region = map.regions[regionIndex];
    map.seaRegions.push(regionIndex);
    region.regionType = tileTypes.SEA;
    for (const [row, col] of region.tilesRegion) {
        map.matrix[row][col].tileType = tileTypes.SEA;
    }
};

const markRegionAsLand = (regionIndex) => {
    const region = map.regions[regionIndex];
    map.landRegions.push(regionIndex);
    region.regionType = tileTypes.LAND;
    for (const [row, col] of region.tilesRegion) {
        map.matrix[row][col].tileType = tileTypes.LAND;
    }
};

const markTopBorderRegionsAsSea = () => {
    let mapTile = null;
    for (let col = FIRST_COL; col < map.width; col++) {
        mapTile = map.matrix[FIRST_ROW][col];
        markRegionAsSeaByTile(mapTile, map);
    }
};

const markLeftBorderRegionsAsSea = () => {
    let mapTile = null;
    for (let row = FIRST_ROW + 1; row < map.height; row++) {
        mapTile = map.matrix[row][FIRST_COL];
        markRegionAsSeaByTile(mapTile, map);
    }
};

const markRightBorderRegionsAsSea = () => {
    let mapTile = null;
    const lastCol = map.width - 1;
    for (let row = FIRST_ROW + 1; row < map.height; row++) {
        mapTile = map.matrix[row][lastCol];
        markRegionAsSeaByTile(mapTile, map);
    }
};

const markBottomBorderRegionsAsSea = () => {
    let mapTile = null;
    const lastRow = map.height - 1;
    for (let col = FIRST_COL; col < map.width; col++) {
        mapTile = map.matrix[lastRow][col];
        markRegionAsSeaByTile(mapTile, map);
    }
};

const defineRegionsType = (pMap) => {
    map = pMap;

    markTopBorderRegionsAsSea();
    markLeftBorderRegionsAsSea();
    markRightBorderRegionsAsSea();
    markBottomBorderRegionsAsSea();

    for (let i = 0; i < map.regions.length; i++) {
        if (map.seaRegions.includes(i) === false) {
            markRegionAsLand(i);
        }
    }
};

export { defineRegionsType };
