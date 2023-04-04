import { mapSizeTypes } from "models/map";

export const getGameCreationConfig = () => {
    const gameCreationConfig = localStorage.getItem("gameCreationConfig");
    return gameCreationConfig
        ? JSON.parse(gameCreationConfig)
        : {
              seedRandom: undefined,
              mapSizeType: mapSizeTypes.SMALL,
              playersAmount: 2,
          };
};

export const saveGameCreationConfig = (gameCreationConfig) => {
    localStorage.setItem("gameCreationConfig", JSON.stringify(gameCreationConfig));
};
