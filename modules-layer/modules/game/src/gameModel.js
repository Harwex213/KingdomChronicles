import { generateMap, MapGenerationConfig } from "map-generator";

class GameModel {
    map;

    constructor({ map }) {
        this.map = map;
    }

    static fromJson() {
        // create from json
    }

    static createNew({ seedRandom, mapSizeType }) {
        const mapGenerationConfig = new MapGenerationConfig();
        mapGenerationConfig.randomSeed = seedRandom;
        mapGenerationConfig.mapSizeType = mapSizeType;

        const map = generateMap(mapGenerationConfig);

        return new GameModel({
            map,
        });
    }
}

export { GameModel };
