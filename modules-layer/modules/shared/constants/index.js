import { POWER_CENTER_TIERS, RESOURCE_NAMES } from "../enums";

export const PLAYER_VALUES = {
    INITIAL_TREASURE: 300,

    ONE_COLONIST_COLONIZATION_PROGRESS_PER_TICK: 10,
    ONE_COLONIST_COST: 100,
};

export const REGION_VALUES = {
    INITIAL_COST: 0,
    COST_INCREASING_DELTA: 50,

    ONE_TILE_COLONIZATION_WEIGHT: 10,
};

export const POWER_CENTER_VALUES = {
    INITIAL_LEVEL: 0,
    INITIAL_TIER: POWER_CENTER_TIERS.ZERO,

    BUILD_COST: 100,
    TICKS_BUILD_TIME: 5,
    TICKS_DESTROY_TIME: 5,

    INITIAL_COST: 0,
    COST_INCREASING_DELTA: 10,

    INITIAL_STORAGE_CAPACITY: 100,
    INITIAL_STORAGE: {
        [RESOURCE_NAMES.WOOD]: 10,
        [RESOURCE_NAMES.FOOD]: 0,
        [RESOURCE_NAMES.STONE]: 0,
        [RESOURCE_NAMES.WOOD_BOARDS]: 0,
    },
    INITIAL_CIVILIANS: 0,

    INITIAL_THROUGHPUT: 5,

    PEOPLE_FOOD_PROVISION_RATIO: 50,
    PEOPLE_FOOD_BORN_RATIO: 20,

    BASIC_PRODUCTION_PER_TICK: {
        [RESOURCE_NAMES.FOOD]: 1,
        [RESOURCE_NAMES.WOOD]: 1,
    },
};

export const POWER_CENTER_TIER_UPGRADE_THRESHOLD = {
    [POWER_CENTER_TIERS.ZERO]: 1,
    [POWER_CENTER_TIERS.FIRST]: 10,
    [POWER_CENTER_TIERS.SECOND]: null,
};

export const POWER_CENTER_TIER_TO_INCREASE_LEVEL = {
    [POWER_CENTER_TIERS.ZERO]: {
        COST: {},
        RATIOS: {},
    },
    [POWER_CENTER_TIERS.FIRST]: {
        COST: {
            [RESOURCE_NAMES.MONEY]: 100,
            [RESOURCE_NAMES.WOOD]: 10,
        },
        RATIOS: {
            [RESOURCE_NAMES.MONEY]: 1.1,
            [RESOURCE_NAMES.WOOD]: 1.1,
        },
    },
    [POWER_CENTER_TIERS.SECOND]: {
        COST: {
            [RESOURCE_NAMES.MONEY]: 100,
            [RESOURCE_NAMES.WOOD]: 10,
            [RESOURCE_NAMES.STONE]: 10,
            [RESOURCE_NAMES.WOOD_BOARDS]: 10,
        },
        RATIOS: {
            [RESOURCE_NAMES.MONEY]: 1.2,
            [RESOURCE_NAMES.WOOD]: 1.2,
            [RESOURCE_NAMES.STONE]: 1.1,
            [RESOURCE_NAMES.WOOD_BOARDS]: 1.1,
        },
    },
};

export const ROAD_VALUES = {
    BUILD_COST: 10,

    TICKS_BUILD_TIME: 1,
    TICKS_DESTROY_TIME: 1,
};

export const WORKSHOP_VALUES = {
    RESOURCE_PRODUCTION_BONUS: 1.5,
};

export const TAX_OFFICE_VALUES = {
    POWER_CENTER_TAX_BONUS: 1.5,
};

export const WAREHOUSE_VALUES = {
    STORAGE_CAPACITY_BONUS: 150,
};
