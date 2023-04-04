import { biomTypes, tileTypes } from "models/map";
import { createNoise2D } from "simplex-noise";
import { normalizeNoise2D } from "./utils";

let map = null;

const assignMoistureAndTemperature = (temperature, moisture, mapTile) => {
    if (temperature > 1.35) {
        if (moisture > 0.75) {
            mapTile.biomType = biomTypes.GRASSLAND;
        } else {
            mapTile.biomType = biomTypes.DESERT;
        }
    } else if (temperature > 0) {
        if (moisture > 0.4) {
            mapTile.biomType = biomTypes.GRASSLAND;
        } else {
            mapTile.biomType = biomTypes.FLATLAND;
        }
    } else {
        if (moisture > 0.75) {
            mapTile.biomType = biomTypes.FLATLAND;
        } else {
            mapTile.biomType = biomTypes.TUNDRA;
        }
    }
};

const POLES = -1;
const EQUATOR = 3;
const MOISTURE_FREQUENCY = 0.07;
const TEMPERATURE_FREQUENCY = 0.07;

const randomBioms = (getRandom) => {
    const createTemperature = normalizeNoise2D(createNoise2D(getRandom));
    const createMoisture = normalizeNoise2D(createNoise2D(getRandom));

    let mapTile = null;
    for (let row = 0; row < map.height; row++) {
        for (let col = 0; col < map.width; col++) {
            mapTile = map.matrix[row][col];

            if (mapTile.tileType === tileTypes.SEA) {
                continue;
            }

            const moisture = createMoisture(MOISTURE_FREQUENCY * row, MOISTURE_FREQUENCY * col);
            const temperature = createTemperature(TEMPERATURE_FREQUENCY * row, TEMPERATURE_FREQUENCY * col);
            const normalizedTemperature =
                temperature * temperature + POLES + EQUATOR * Math.sin(row / map.height);

            assignMoistureAndTemperature(normalizedTemperature, moisture, mapTile);
        }
    }
};

const markRegionBiom = (regionIndex, biomType) => {
    const region = map.regions[regionIndex];

    region.biomType = biomType;
    for (const [row, col] of region.tilesRegion) {
        map.matrix[row][col].biomType = biomType;
    }
};

const grindBioms = () => {
    let mapTile = null;
    for (const regionIndex of map.landRegions) {
        const region = map.regions[regionIndex];
        const biomCounter = {};
        let maxCount = 0;
        let maxBiomOccured = null;

        for (const [row, col] of region.tilesRegion) {
            mapTile = map.matrix[row][col];
            if (biomCounter[mapTile.biomType]) {
                biomCounter[mapTile.biomType]++;
            } else {
                biomCounter[mapTile.biomType] = 1;
            }

            if (biomCounter[mapTile.biomType] > maxCount) {
                maxCount = biomCounter[mapTile.biomType];
                maxBiomOccured = mapTile.biomType;
            }
        }

        markRegionBiom(regionIndex, maxBiomOccured);
    }
};

const defineRegionsBiom = (pMap, randomizer) => {
    map = pMap;

    const getRandom = randomizer.getRandom.bind(randomizer);
    randomBioms(getRandom);
    grindBioms();
};

export { defineRegionsBiom };
