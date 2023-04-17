import { generateMap as _generateMap, MapGenerationConfig } from "map-generator";
import { Randomizer } from "shared/models";

const mapGeneratorConfig = new MapGenerationConfig();

const generateMap = ({ seedRandom, mapSizesType }) => {
    mapGeneratorConfig.randomizer = new Randomizer(seedRandom);
    mapGeneratorConfig.mapSizeType = mapSizesType;
    return _generateMap(mapGeneratorConfig);
};

export { generateMap };
