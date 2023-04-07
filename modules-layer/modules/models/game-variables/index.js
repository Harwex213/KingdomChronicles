import { POWER_CENTER_TIERS } from "../game/buildings/buildings";

export const PLAYER_VALUES = {
    INITIAL_TREASURE: 100,
};

export const REGION_VALUES = {
    INITIAL_PROVISION: 0,
    PROVISION_INCREASING_DELTA: 10,
};

export const POWER_CENTER_VALUES = {
    COST: 100,

    INITIAL_TIER: POWER_CENTER_TIERS.FIRST,
    INITIAL_LEVEL: 1,

    TICKS_BUILD_TIME: 5,
    TICKS_DESTROY_TIME: 5,
};

export const ROAD_VALUES = {
    COST: 10,
};
