import { mapSizeTypes } from "models/map";

export const getMapGenerationConfig = () => {
    const mapGenerationConfig = localStorage.getItem("mapGenerationConfig");
    return mapGenerationConfig
        ? JSON.parse(mapGenerationConfig)
        : {
              seedRandom: undefined,
              mapSizeType: mapSizeTypes.SMALL,
          };
};

export const saveMapGenerationConfig = (mapGenerationConfig) => {
    localStorage.setItem("mapGenerationConfig", JSON.stringify(mapGenerationConfig));
};
