import { generateMap as _generateMap, MapGenerationConfig } from "map-generator";

const mapGeneratorConfig = new MapGenerationConfig();

const generateMap = ({ seedRandom, mapSizesType }) => {
    mapGeneratorConfig.randomSeed = seedRandom;
    mapGeneratorConfig.mapSizeType = mapSizesType;
    return _generateMap(mapGeneratorConfig);
};

export { generateMap };
