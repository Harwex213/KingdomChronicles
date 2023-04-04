import { createNoise2D } from "simplex-noise";
import { normalizeNoise2D } from "./utils";
import { areaTypes, biomTypes, tileTypes } from "models/map";

let map = null;

const ACCEPTABLE_BIOMS = [biomTypes.GRASSLAND, biomTypes.FLATLAND, biomTypes.TUNDRA];
const AREA_TYPE_TRANSITION = {
    [areaTypes.NONE]: areaTypes.FOREST,
    [areaTypes.MOUNTAIN]: areaTypes.MOUNTAIN,
    [areaTypes.HILLS]: areaTypes.FOREST_HILLS,
};

const assignPlant = (plant, mapTile) => {
    if (plant > 0.5875 && ACCEPTABLE_BIOMS.includes(mapTile.biomType)) {
        mapTile.areaType = AREA_TYPE_TRANSITION[mapTile.areaType];
    }
};

const FIRST_NOISE = {
    WEIGHT: 1,
    FREQUENCY: 0.15,
};
const SECOND_NOISE = {
    WEIGHT: 0.5,
    FREQUENCY: 2,
};
const THIRD_NOISE = {
    WEIGHT: 0.25,
    FREQUENCY: 0.7,
};

const defineFlora = (pMap, randomizer) => {
    map = pMap;

    const getRandom = randomizer.getRandom.bind(randomizer);
    const createPlant = normalizeNoise2D(createNoise2D(getRandom));

    let mapTile = null;
    for (let row = 0; row < map.height; row++) {
        for (let col = 0; col < map.width; col++) {
            mapTile = map.matrix[row][col];

            if (mapTile.tileType === tileTypes.SEA) {
                continue;
            }

            const firstNoise = createPlant(FIRST_NOISE.FREQUENCY * row, FIRST_NOISE.FREQUENCY * col);
            const secondNoise = createPlant(SECOND_NOISE.FREQUENCY * row, SECOND_NOISE.FREQUENCY * col);
            const thirdNoise = createPlant(THIRD_NOISE.FREQUENCY * row, THIRD_NOISE.FREQUENCY * col);

            let plant =
                FIRST_NOISE.WEIGHT * firstNoise +
                SECOND_NOISE.WEIGHT * secondNoise +
                THIRD_NOISE.WEIGHT * thirdNoise;

            plant /= FIRST_NOISE.WEIGHT + SECOND_NOISE.WEIGHT + THIRD_NOISE.WEIGHT;

            assignPlant(plant, mapTile);
        }
    }
};

export { defineFlora };
