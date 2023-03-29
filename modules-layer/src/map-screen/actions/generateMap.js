import MapGenerator, { MapGenerationConfig } from "map-generator";
import { mapSizeTypes, waterBalanceTypes } from "models/map";

const mapSizeTypeToDimensions = {
    [mapSizeTypes.SMALL]: { width: 40, height: 30 },
    [mapSizeTypes.MEDIUM]: { width: 60, height: 40 },
    [mapSizeTypes.BIG]: { width: 70, height: 60 },
};

const waterBalanceTypeToValues = {
    [waterBalanceTypes.LESS_WATER]: 0.3,
    [waterBalanceTypes.BALANCE]: 0.5,
    [waterBalanceTypes.MORE_WATER]: 0.7,
};

const mapGeneratorConfig = new MapGenerationConfig();
mapGeneratorConfig.minRegionSize = 14;
mapGeneratorConfig.maxRegionSize = 27;

const generateMap = ({ seedRandom, mapSizesType, waterBalanceType }) => {
    mapGeneratorConfig.mapSizes = mapSizeTypeToDimensions[mapSizesType];
    mapGeneratorConfig.waterBalancePercent = waterBalanceTypeToValues[waterBalanceType];
    const mapGenerator = new MapGenerator(mapGeneratorConfig);
    return mapGenerator.generateMap(seedRandom);
};

export { generateMap };
