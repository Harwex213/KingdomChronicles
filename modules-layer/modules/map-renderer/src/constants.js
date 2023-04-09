export const RENDERER_CONFIG = {
    VIEWPORT: {
        DRAG_MOUSE_BUTTON: "left",
        SMOOTH: 3.5,
    },

    TILE_DIMENSIONS: {
        WIDTH: 43,
        HEIGHT: 43,
        ODD_TILE_OFFSET_PERCENT: 0.5,
    },
    MAP_EMPTY_SPACE_BORDER_OFFSET: 200,
    LAYERS: {
        TILES: 0,
        CURRENT_PLAYER_ACTIONS: 2,
        REGION_BORDER: 1,
    },

    NEUTRAL_BORDER_STYLE: {
        COLOR: 0x000,
        ALPHA: 0.25,
    },
    REMAINED_TICKS_TOOLTIP: {
        TO_BUILD_COLOR: "#23ff00",
        TO_DESTROY_COLOR: "#ff0000",
    },
};

export const TILE_BITMASK_SIDES = {
    TOP_LEFT: 0x100000,
    LEFT: 0x010000,
    BOTTOM_LEFT: 0x001000,
    BOTTOM_RIGHT: 0x000100,
    RIGHT: 0x000010,
    TOP_RIGHT: 0x000001,
};

export const SPRITESHEET_BIOM_NAMES = {
    EMPTY: "empty.png",
    WATER: "sea.png",

    DESERT: "desert.png",
    FLATLAND: "flatland.png",
    GRASSLAND: "grassland.png",
    MOUNTAIN: "mountains.png",
    JUNGLE: "jungle.png",
    TUNDRA: "tundra.png",

    FOREST_FLATLAND: "forest (flatland).png",
    FOREST_GRASSLAND: "forest (grassland).png",
    FOREST_TUNDRA: "forest (tundra).png",

    HILLS_DESERT: "hills (desert).png",
    HILLS_GRASSLAND: "hills (grassland).png",
    HILLS_FLATLAND: "hills (flatlandd).png",
    HILLS_TUNDRA: "hills (tundra).png",

    FOREST_HILLS_FLATLAND: "hills+forest (flatlandd).png",
    FOREST_HILLS_GRASSLAND: "hills+forest (grassland).png",
    FOREST_HILLS_TUNDRA: "hills+forest (tundra).png",
};

export const SPRITESHEET_POWER_CENTER_NAMES = {
    DESERT: "power center desert.png",
    FLATLAND: "power center flatland.png",
    GRASSLAND: "power center grassland.png",
    TUNDRA: "power center tundra.png",

    HILLS_DESERT: "power center desert (hills).png",
    HILLS_GRASSLAND: "power center grassland (hills).png",
    HILLS_FLATLAND: "power center flatland (hills).png",
    HILLS_TUNDRA: "power center tundra (hills).png",

    FOREST_FLATLAND: "power center flatland (forest).png",
    FOREST_GRASSLAND: "power center grassland (forest).png",
    FOREST_TUNDRA: "power cetner tundra (forest).png",

    FOREST_HILLS_FLATLAND: "power center flatland (hills+forest).png",
    FOREST_HILLS_GRASSLAND: "power center grassland (hills+forest).png",
    FOREST_HILLS_TUNDRA: "power center tundra (hills+forest).png",
};

export const SPRITESHEET_FARM_NAMES = {
    PLATEAU: "farm noHills.png",
    HILLS: "farm hills.png",
};

export const SPRITESHEET_REGION_BORDER_NAMES = {
    BOTTOM_LEFT: "region-border-bottom-left.png",
    BOTTOM_RIGHT: "region-border-bottom-right.png",
    TOP_LEFT: "region-border-top-left.png",
    TOP_RIGHT: "region-border-top-right.png",
    LEFT: "region-border-left.png",
    RIGHT: "region-border-right.png",
};

export const SPRITESHEET_TILE_BORDER_NAMES = {
    BOTTOM_LEFT: "tile-border-bottom-left.png",
    BOTTOM_RIGHT: "tile-border-bottom-right.png",
    TOP_LEFT: "tile-border-top-left.png",
    TOP_RIGHT: "tile-border-top-right.png",
    LEFT: "tile-border-left.png",
    RIGHT: "tile-border-right.png",
};

export const SPRITESHEET_PLAYER_ACTIONS_NAMES = {
    CAN_BUILD: "can_build.png",
    CANNOT_BUILD: "cannot_build.png",
    CAN_DESTROY: "CAN_DESTROY",
};

export const SPRITESHEET_UNSORTED_NAMES = {
    GLOBAL_BUILDING_STROKE: "building_stroke.png",
};
