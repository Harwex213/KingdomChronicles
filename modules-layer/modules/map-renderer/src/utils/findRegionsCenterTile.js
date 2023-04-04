const SORT_BY_ROW = 0;
const SORT_BY_COL = 1;

const getAverage = (regionTiles, sortIndex) => {
    const sortedByRow = [...regionTiles];
    sortedByRow.sort((a, b) => a[sortIndex] - b[sortIndex]);

    return Math.round((sortedByRow[0][sortIndex] + sortedByRow[sortedByRow.length - 1][sortIndex]) / 2);
};

export const findRegionsCenterTile = (region) => {
    const regionTiles = region.tilesRegion;

    const averageRow = getAverage(regionTiles, SORT_BY_ROW);
    const averageCol = getAverage(regionTiles, SORT_BY_COL);

    return [averageRow, averageCol];
};
