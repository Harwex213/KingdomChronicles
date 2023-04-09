import { RESOURCE_NAMES } from "../game/resources/resources";

export const FARM_VALUES = {
    COST: {
        [RESOURCE_NAMES.MONEY]: 100,
        [RESOURCE_NAMES.WOOD]: 10,
    },
    PROVISION: 15,
    PRODUCTION: 1,
    TICKS_BUILD_TIME: 5,
    TICKS_DESTROY_TIME: 5,
};

export const WOODCUTTER_VALUES = {
    COST: {
        [RESOURCE_NAMES.MONEY]: 150,
    },
    PROVISION: 15,
    PRODUCTION: 1,
    TICKS_BUILD_TIME: 5,
    TICKS_DESTROY_TIME: 5,
};

export const SAWMILL_VALUES = {
    COST: {
        [RESOURCE_NAMES.MONEY]: 250,
        [RESOURCE_NAMES.FOOD]: 30,
        [RESOURCE_NAMES.WOOD]: 30,
        [RESOURCE_NAMES.STONE]: 10,
    },
    PROVISION: 50,
    REQUIRED: 1,
    PRODUCTION: 1,
    TICKS_BUILD_TIME: 7,
    TICKS_DESTROY_TIME: 7,
};

export const STONE_QUARRY_VALUES = {
    COST: {
        [RESOURCE_NAMES.MONEY]: 300,
        [RESOURCE_NAMES.WOOD]: 50,
        [RESOURCE_NAMES.FOOD]: 50,
    },
    PROVISION: 25,
    PRODUCTION: 1,
    TICKS_BUILD_TIME: 7,
    TICKS_DESTROY_TIME: 7,
};
