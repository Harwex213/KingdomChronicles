import { MAP_SIZE_TYPES } from "shared/enums";

export const getGameCreationConfig = () => {
    const gameCreationConfig = localStorage.getItem("gameCreationConfig");
    return gameCreationConfig
        ? JSON.parse(gameCreationConfig)
        : {
              seedRandom: undefined,
              mapSizeType: MAP_SIZE_TYPES.SMALL,
              playersAmount: 2,
          };
};

export const saveGameCreationConfig = (gameCreationConfig) => {
    localStorage.setItem("gameCreationConfig", JSON.stringify(gameCreationConfig));
};
