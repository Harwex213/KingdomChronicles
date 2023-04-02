import { mapSizeTypes } from "models/map";

export const REGION_SIZES = {
    MIN: 14,
    MAX: 27,
};

export const MAP_SIZE_DIMENSIONS = {
    [mapSizeTypes.SMALL]: { width: 40, height: 30 },
    [mapSizeTypes.MEDIUM]: { width: 60, height: 40 },
    [mapSizeTypes.BIG]: { width: 70, height: 60 },
};
