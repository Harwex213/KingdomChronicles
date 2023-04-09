import { RESOURCE_NAMES } from "../game/resources/resources";

export const WORKSHOP_VALUES = {
    COST: {
        [RESOURCE_NAMES.MONEY]: 250,
        [RESOURCE_NAMES.STONE]: 50,
        [RESOURCE_NAMES.WOOD_BOARDS]: 50,
    },
    PRODUCTION_BONUS: 1.5,
    TICKS_BUILD_TIME: 5,
};

export const TAX_OFFICE_VALUES = {
    COST: {
        [RESOURCE_NAMES.MONEY]: 250,
        [RESOURCE_NAMES.STONE]: 50,
        [RESOURCE_NAMES.WOOD_BOARDS]: 50,
    },
    PRODUCTION_BONUS: 1.5,
    TICKS_BUILD_TIME: 5,
};

export const WAREHOUSE_VALUES = {
    COST: {
        [RESOURCE_NAMES.MONEY]: 200,
        [RESOURCE_NAMES.STONE]: 30,
        [RESOURCE_NAMES.WOOD_BOARDS]: 30,
    },
    STORE_BONUS: 150,
    TICKS_BUILD_TIME: 5,
};
