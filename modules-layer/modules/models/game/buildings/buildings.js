import { OuterBuildingType } from "./outerBuildingType";
import { areaTypes, biomTypes } from "../../map/enums";
import {
    FARM_VALUES,
    SAWMILL_VALUES,
    STONE_QUARRY_VALUES,
    WOODCUTTER_VALUES,
} from "../../game-variables/outerBuildingsVariables";
import { RESOURCE_NAMES } from "../resources/resources";

export const GLOBAL_BUILDING_TYPES = {
    NONE: "NONE",
    POWER_CENTER: "POWER_CENTER",
    ROAD: "ROAD",
    OUTER_BUILDING: "OUTER_BUILDING",
};

export const POWER_CENTER_MAX_TIER_NUMBER = 2;
export const POWER_CENTER_TIERS = {
    FIRST: "I",
    SECOND: "II",
};

export const OUTER_BUILDING_TYPES = {
    STONE_QUARRY: "STONE_QUARRY",
    WOODCUTTER: "WOODCUTTER",
    SAWMILL: "SAWMILL",
    FARM: "FARM",
};

export const ACTION_INNER_BUILDING_TYPES = {
    COLONIZATION_CENTER: "COLONIZATION_CENTER",
    GUILD: "GUILD",
    MARKET: "MARKET",
};

export const BONUS_INNER_BUILDING_TYPES = {
    WORKSHOP: "WORKSHOP",
    WAREHOUSE: "WAREHOUSE",
    TAX_OFFICE: "TAX_OFFICE",
};

const POWER_CENTER_FIRST_TIER_OUTER_BUILDINGS = [
    new OuterBuildingType({
        type: OUTER_BUILDING_TYPES.FARM,
        acceptableBioms: [biomTypes.FLATLAND, biomTypes.GRASSLAND, biomTypes.TUNDRA],
        acceptableAreas: [areaTypes.NONE],
        production: {
            requiredResource: null,
            requiredAmount: 0,
            producedResource: RESOURCE_NAMES.FOOD,
            producedAmount: FARM_VALUES.PRODUCTION,
        },
    }),
    new OuterBuildingType({
        type: OUTER_BUILDING_TYPES.WOODCUTTER,
        acceptableBioms: [biomTypes.FLATLAND, biomTypes.GRASSLAND, biomTypes.TUNDRA],
        acceptableAreas: [areaTypes.FOREST, areaTypes.FOREST_HILLS],
        production: {
            requiredResource: null,
            requiredAmount: 0,
            producedResource: RESOURCE_NAMES.WOOD,
            producedAmount: WOODCUTTER_VALUES.PRODUCTION,
        },
    }),
];

const POWER_CENTER_SECOND_TIER_OUTER_BUILDINGS = [
    new OuterBuildingType({
        type: OUTER_BUILDING_TYPES.STONE_QUARRY,
        acceptableBioms: [biomTypes.FLATLAND, biomTypes.GRASSLAND, biomTypes.TUNDRA, biomTypes.DESERT],
        acceptableAreas: [areaTypes.HILLS, areaTypes.FOREST_HILLS],
        production: {
            requiredResource: null,
            requiredAmount: 0,
            producedResource: RESOURCE_NAMES.STONE,
            producedAmount: STONE_QUARRY_VALUES.PRODUCTION,
        },
    }),
    new OuterBuildingType({
        type: OUTER_BUILDING_TYPES.SAWMILL,
        acceptableBioms: [biomTypes.FLATLAND, biomTypes.GRASSLAND, biomTypes.TUNDRA, biomTypes.DESERT],
        acceptableAreas: [areaTypes.NONE, areaTypes.HILLS, areaTypes.FOREST, areaTypes.FOREST_HILLS],
        production: {
            requiredResource: RESOURCE_NAMES.WOOD,
            requiredAmount: SAWMILL_VALUES.REQUIRED,
            producedResource: RESOURCE_NAMES.WOOD_BOARDS,
            producedAmount: SAWMILL_VALUES.PRODUCTION,
        },
    }),
];

export const POWER_CENTER_TIER_TO_OUTER_BUILDINGS = {
    [POWER_CENTER_TIERS.FIRST]: POWER_CENTER_FIRST_TIER_OUTER_BUILDINGS,
    [POWER_CENTER_TIERS.SECOND]: [
        ...POWER_CENTER_FIRST_TIER_OUTER_BUILDINGS,
        ...POWER_CENTER_SECOND_TIER_OUTER_BUILDINGS,
    ],
};
