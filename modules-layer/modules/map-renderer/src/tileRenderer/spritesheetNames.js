import { AREA_TYPES, BIOM_TYPES } from "shared/enums";
import {
    SPRITESHEET_BIOM_NAMES,
    SPRITESHEET_FARM_NAMES,
    SPRITESHEET_POWER_CENTER_NAMES,
    SPRITESHEET_SAWMILL_NAMES,
    SPRITESHEET_WOODCUTTER_NAMES,
} from "../constants";

export const AREA_TYPE_TO_BIOM_SPRITESHEET_NAME = {
    [AREA_TYPES.NONE]: {
        [BIOM_TYPES.DESERT]: SPRITESHEET_BIOM_NAMES.DESERT,
        [BIOM_TYPES.FLATLAND]: SPRITESHEET_BIOM_NAMES.FLATLAND,
        [BIOM_TYPES.GRASSLAND]: SPRITESHEET_BIOM_NAMES.GRASSLAND,
        [BIOM_TYPES.TUNDRA]: SPRITESHEET_BIOM_NAMES.TUNDRA,
        [BIOM_TYPES.JUNGLE]: SPRITESHEET_BIOM_NAMES.JUNGLE,
    },
    [AREA_TYPES.HILLS]: {
        [BIOM_TYPES.DESERT]: SPRITESHEET_BIOM_NAMES.HILLS_DESERT,
        [BIOM_TYPES.FLATLAND]: SPRITESHEET_BIOM_NAMES.HILLS_FLATLAND,
        [BIOM_TYPES.GRASSLAND]: SPRITESHEET_BIOM_NAMES.HILLS_GRASSLAND,
        [BIOM_TYPES.TUNDRA]: SPRITESHEET_BIOM_NAMES.HILLS_TUNDRA,
    },
    [AREA_TYPES.FOREST]: {
        [BIOM_TYPES.FLATLAND]: SPRITESHEET_BIOM_NAMES.FOREST_FLATLAND,
        [BIOM_TYPES.GRASSLAND]: SPRITESHEET_BIOM_NAMES.FOREST_GRASSLAND,
        [BIOM_TYPES.TUNDRA]: SPRITESHEET_BIOM_NAMES.FOREST_TUNDRA,
    },
    [AREA_TYPES.FOREST_HILLS]: {
        [BIOM_TYPES.FLATLAND]: SPRITESHEET_BIOM_NAMES.FOREST_HILLS_FLATLAND,
        [BIOM_TYPES.GRASSLAND]: SPRITESHEET_BIOM_NAMES.FOREST_HILLS_GRASSLAND,
        [BIOM_TYPES.TUNDRA]: SPRITESHEET_BIOM_NAMES.FOREST_HILLS_TUNDRA,
    },
};

export const AREA_TYPE_TO_POWER_CENTER_SPRITESHEET_NAME = {
    [AREA_TYPES.NONE]: {
        [BIOM_TYPES.DESERT]: SPRITESHEET_POWER_CENTER_NAMES.DESERT,
        [BIOM_TYPES.FLATLAND]: SPRITESHEET_POWER_CENTER_NAMES.FLATLAND,
        [BIOM_TYPES.GRASSLAND]: SPRITESHEET_POWER_CENTER_NAMES.GRASSLAND,
        [BIOM_TYPES.TUNDRA]: SPRITESHEET_POWER_CENTER_NAMES.TUNDRA,
        // [BIOM_TYPES.JUNGLE]: SPRITESHEET_POWER_CENTER_NAMES.JUNGLE,
    },
    [AREA_TYPES.HILLS]: {
        [BIOM_TYPES.DESERT]: SPRITESHEET_POWER_CENTER_NAMES.HILLS_DESERT,
        [BIOM_TYPES.FLATLAND]: SPRITESHEET_POWER_CENTER_NAMES.HILLS_FLATLAND,
        [BIOM_TYPES.GRASSLAND]: SPRITESHEET_POWER_CENTER_NAMES.HILLS_GRASSLAND,
        [BIOM_TYPES.TUNDRA]: SPRITESHEET_POWER_CENTER_NAMES.HILLS_TUNDRA,
    },
    [AREA_TYPES.FOREST]: {
        [BIOM_TYPES.FLATLAND]: SPRITESHEET_POWER_CENTER_NAMES.FOREST_FLATLAND,
        [BIOM_TYPES.GRASSLAND]: SPRITESHEET_POWER_CENTER_NAMES.FOREST_GRASSLAND,
        [BIOM_TYPES.TUNDRA]: SPRITESHEET_POWER_CENTER_NAMES.FOREST_TUNDRA,
    },
    [AREA_TYPES.FOREST_HILLS]: {
        [BIOM_TYPES.FLATLAND]: SPRITESHEET_POWER_CENTER_NAMES.FOREST_HILLS_FLATLAND,
        [BIOM_TYPES.GRASSLAND]: SPRITESHEET_POWER_CENTER_NAMES.FOREST_HILLS_GRASSLAND,
        [BIOM_TYPES.TUNDRA]: SPRITESHEET_POWER_CENTER_NAMES.FOREST_HILLS_TUNDRA,
    },
};

export const AREA_TYPE_TO_SAWMILL_NAME = {
    [AREA_TYPES.NONE]: {
        [BIOM_TYPES.DESERT]: SPRITESHEET_SAWMILL_NAMES.DESERT,
        [BIOM_TYPES.FLATLAND]: SPRITESHEET_SAWMILL_NAMES.FLATLAND,
        [BIOM_TYPES.GRASSLAND]: SPRITESHEET_SAWMILL_NAMES.GRASSLAND,
        [BIOM_TYPES.TUNDRA]: SPRITESHEET_SAWMILL_NAMES.TUNDRA,
        // [BIOM_TYPES.JUNGLE]: SPRITESHEET_SAWMILL_NAMES.JUNGLE,
    },
    [AREA_TYPES.HILLS]: {
        [BIOM_TYPES.DESERT]: SPRITESHEET_SAWMILL_NAMES.HILLS_DESERT,
        [BIOM_TYPES.FLATLAND]: SPRITESHEET_SAWMILL_NAMES.HILLS_FLATLAND,
        [BIOM_TYPES.GRASSLAND]: SPRITESHEET_SAWMILL_NAMES.HILLS_GRASSLAND,
        [BIOM_TYPES.TUNDRA]: SPRITESHEET_SAWMILL_NAMES.HILLS_TUNDRA,
    },
    [AREA_TYPES.FOREST]: {
        [BIOM_TYPES.FLATLAND]: SPRITESHEET_SAWMILL_NAMES.FOREST_FLATLAND,
        [BIOM_TYPES.GRASSLAND]: SPRITESHEET_SAWMILL_NAMES.FOREST_GRASSLAND,
        [BIOM_TYPES.TUNDRA]: SPRITESHEET_SAWMILL_NAMES.FOREST_TUNDRA,
    },
    [AREA_TYPES.FOREST_HILLS]: {
        [BIOM_TYPES.FLATLAND]: SPRITESHEET_SAWMILL_NAMES.FOREST_HILLS_FLATLAND,
        [BIOM_TYPES.GRASSLAND]: SPRITESHEET_SAWMILL_NAMES.FOREST_HILLS_GRASSLAND,
        [BIOM_TYPES.TUNDRA]: SPRITESHEET_SAWMILL_NAMES.FOREST_HILLS_TUNDRA,
    },
};

export const AREA_TYPE_TO_WOODCUTTER_SPRITESHEET_NAME = {
    [AREA_TYPES.FOREST]: {
        [BIOM_TYPES.FLATLAND]: SPRITESHEET_WOODCUTTER_NAMES.FOREST_FLATLAND,
        [BIOM_TYPES.GRASSLAND]: SPRITESHEET_WOODCUTTER_NAMES.FOREST_GRASSLAND,
        [BIOM_TYPES.TUNDRA]: SPRITESHEET_WOODCUTTER_NAMES.FOREST_TUNDRA,
    },
    [AREA_TYPES.FOREST_HILLS]: {
        [BIOM_TYPES.FLATLAND]: SPRITESHEET_WOODCUTTER_NAMES.FOREST_HILLS_FLATLAND,
        [BIOM_TYPES.GRASSLAND]: SPRITESHEET_WOODCUTTER_NAMES.FOREST_HILLS_GRASSLAND,
        [BIOM_TYPES.TUNDRA]: SPRITESHEET_WOODCUTTER_NAMES.FOREST_HILLS_TUNDRA,
    },
};

export const AREA_TYPE_TO_FARM_SPRITESHEET_NAME = {
    [AREA_TYPES.NONE]: SPRITESHEET_FARM_NAMES.PLATEAU,
    [AREA_TYPES.HILLS]: SPRITESHEET_FARM_NAMES.HILLS,
};

export const toRoadSpritesheetName = (bitmask) => bitmask.toString(2).padStart(6, "0") + ".png";
