import { POWER_CENTER_TIERS, PowerCenter } from "models/game";
import { generateRandomId } from "../utils";
import { AXIAL_NEIGHBOR_DIRECTION_VECTORS, directionsTypes, MapTile } from "models/map";

const getTilesRing = (map, centerTile, radius) => {
    const axialPoints = [];

    const vector = AXIAL_NEIGHBOR_DIRECTION_VECTORS[directionsTypes.LEFT_DOWN];
    let axialPoint = {
        q: centerTile.axialCoordinates.q + vector[0] * radius,
        r: centerTile.axialCoordinates.r + vector[1] * radius,
    };
    for (const direction of Object.values(directionsTypes)) {
        for (let i = 0; i < radius; i++) {
            axialPoints.push(axialPoint);
            axialPoint = MapTile.axialNeighbor(axialPoint.q, axialPoint.r, direction);
        }
    }

    const tiles = [];
    for (const examinedAxialPoint of axialPoints) {
        const tilePoint = MapTile.axialCoordinatesToOffset(examinedAxialPoint.q, examinedAxialPoint.r);
        if (
            tilePoint.row >= 0 &&
            tilePoint.row < map.height &&
            tilePoint.col >= 0 &&
            tilePoint.col < map.width
        ) {
            tiles.push(map.matrix[tilePoint.row][tilePoint.col]);
        }
    }
    return tiles;
};

const getPossibleControlArea = (map, powerCenterTile, powerCenterRegion) => {
    const canTileBeInControlArea = (tile) => {
        return tile.partRegion.regionIndex === powerCenterRegion.index;
    };
    const getTilePoint = (tile) => [tile.row, tile.col];

    return {
        [POWER_CENTER_TIERS.FIRST]: getTilesRing(map, powerCenterTile, 1)
            .filter(canTileBeInControlArea)
            .map(getTilePoint),
        [POWER_CENTER_TIERS.SECOND]: getTilesRing(map, powerCenterTile, 2)
            .filter(canTileBeInControlArea)
            .map(getTilePoint),
    };
};

const powerCenterBuilded = ({ gameState, row, col }) => {
    const mapTile = gameState.map.matrix[row][col];
    const mapRegion = gameState.map.regions[mapTile.partRegion.regionIndex];

    const powerCenter = new PowerCenter({
        id: generateRandomId(),
        row,
        col,
        ownerIndex: mapRegion.ownerIndex,
        possibleControlArea: getPossibleControlArea(
            gameState.map,
            mapTile,
            mapRegion,
            gameState.outerBuildings
        ),
    });

    gameState.powerCenters[powerCenter.id] = powerCenter;
    mapTile.onBuiltGlobalBuilding(powerCenter.id);
    powerCenter.increaseLevel();
};

export { powerCenterBuilded };
