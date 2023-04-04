import { createNoise2D } from "simplex-noise";
import { areaTypes, biomTypes, tileTypes } from "models/map";
import { normalizeNoise2D } from "./utils";

let map = null;

const assignElevation = (elevation, mapTile) => {
    if (elevation > 0.77) {
        if (mapTile.biomType !== biomTypes.DESERT) {
            mapTile.areaType = areaTypes.MOUNTAIN;
        }
    } else if (elevation > 0.65) {
        mapTile.areaType = areaTypes.HILLS;
    }
};

const FIRST_NOISE = {
    WEIGHT: 1,
    FREQUENCY: 0.1,
};
const SECOND_NOISE = {
    WEIGHT: 0.5,
    FREQUENCY: 4,
};
const THIRD_NOISE = {
    WEIGHT: 0.25,
    FREQUENCY: 4,
};

const defineElevation = (pMap, randomizer) => {
    map = pMap;

    const getRandom = randomizer.getRandom.bind(randomizer);
    const createElevation = normalizeNoise2D(createNoise2D(getRandom));

    let mapTile = null;
    for (let row = 0; row < map.height; row++) {
        for (let col = 0; col < map.width; col++) {
            mapTile = map.matrix[row][col];

            if (mapTile.tileType === tileTypes.SEA) {
                continue;
            }

            const firstNoise = createElevation(FIRST_NOISE.FREQUENCY * row, FIRST_NOISE.FREQUENCY * col);
            const secondNoise = createElevation(SECOND_NOISE.FREQUENCY * row, SECOND_NOISE.FREQUENCY * col);
            const thirdNoise = createElevation(THIRD_NOISE.FREQUENCY * row, THIRD_NOISE.FREQUENCY * col);

            let elevation =
                FIRST_NOISE.WEIGHT * firstNoise +
                SECOND_NOISE.WEIGHT * secondNoise +
                THIRD_NOISE.WEIGHT * thirdNoise;

            elevation /= FIRST_NOISE.WEIGHT + SECOND_NOISE.WEIGHT + THIRD_NOISE.WEIGHT;

            assignElevation(elevation, mapTile);
        }
    }
};

export { defineElevation };
