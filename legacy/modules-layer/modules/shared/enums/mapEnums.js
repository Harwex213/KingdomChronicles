export const MAP_SIZE_TYPES = {
    SMALL: "small",
    MEDIUM: "medium",
    BIG: "big",
};

export const TILE_TYPES = {
    SEA: "sea",
    LAND: "land",
};

export const BIOM_TYPES = {
    TUNDRA: "tundra",
    DESERT: "desert",
    FLATLAND: "flatland",
    GRASSLAND: "grassland",
    JUNGLE: "jungle",
    NONE: "none",
};

export const AREA_TYPES = {
    MOUNTAIN: "mountain",
    HILLS: "hills",
    FOREST: "forest",
    FOREST_HILLS: "forestHills",
    NONE: "none",
};

export const HEXAGON_DIRECTION_TYPES = {
    RIGHT: "right",
    RIGHT_UP: "right-up",
    LEFT_UP: "left-up",
    LEFT: "left",
    LEFT_DOWN: "left-down",
    RIGHT_DOWN: "right-down",
};

export const TILE_BITMASK_SIDES = {
    [HEXAGON_DIRECTION_TYPES.LEFT_UP]: 0b100000,
    [HEXAGON_DIRECTION_TYPES.LEFT]: 0b010000,
    [HEXAGON_DIRECTION_TYPES.LEFT_DOWN]: 0b001000,
    [HEXAGON_DIRECTION_TYPES.RIGHT_DOWN]: 0b000100,
    [HEXAGON_DIRECTION_TYPES.RIGHT]: 0b000010,
    [HEXAGON_DIRECTION_TYPES.RIGHT_UP]: 0b000001,
};
