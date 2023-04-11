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
    [HEXAGON_DIRECTION_TYPES.LEFT_UP]: 0x100000,
    [HEXAGON_DIRECTION_TYPES.LEFT]: 0x010000,
    [HEXAGON_DIRECTION_TYPES.LEFT_DOWN]: 0x001000,
    [HEXAGON_DIRECTION_TYPES.RIGHT_DOWN]: 0x000100,
    [HEXAGON_DIRECTION_TYPES.RIGHT]: 0x000010,
    [HEXAGON_DIRECTION_TYPES.RIGHT_UP]: 0x000001,
};
