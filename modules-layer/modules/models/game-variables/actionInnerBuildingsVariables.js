import { RESOURCE_NAMES } from "../game/resources/resources";

export const COLONIZATION_CENTER_VALUES = {
    COST: {
        [RESOURCE_NAMES.MONEY]: 500,
        [RESOURCE_NAMES.WOOD]: 70,
        [RESOURCE_NAMES.FOOD]: 50,
        [RESOURCE_NAMES.STONE]: 70,
        [RESOURCE_NAMES.WOOD_BOARDS]: 50,
    },
    TICKS_BUILD_TIME: 10,
};

export const GUILD_CENTER_VALUES = {
    COST: {
        [RESOURCE_NAMES.MONEY]: 250,
        [RESOURCE_NAMES.WOOD]: 50,
        [RESOURCE_NAMES.STONE]: 50,
    },
    TICKS_BUILD_TIME: 5,
};

export const MARKET_CENTER_VALUES = {
    COST: {
        [RESOURCE_NAMES.MONEY]: 500,
        [RESOURCE_NAMES.WOOD]: 70,
        [RESOURCE_NAMES.STONE]: 70,
        [RESOURCE_NAMES.WOOD_BOARDS]: 70,
    },
    TICKS_BUILD_TIME: 10,
};
