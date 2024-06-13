import { MAP_SIZE_TYPES } from "shared/enums";

export const REGION_SIZES = {
    MIN: 14,
    MAX: 27,
};

export const MAP_SIZE_DIMENSIONS = {
    [MAP_SIZE_TYPES.SMALL]: { width: 40, height: 30 },
    [MAP_SIZE_TYPES.MEDIUM]: { width: 60, height: 40 },
    [MAP_SIZE_TYPES.BIG]: { width: 70, height: 60 },
};
