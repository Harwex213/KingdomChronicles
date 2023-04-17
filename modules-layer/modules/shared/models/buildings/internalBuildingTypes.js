import { INTERNAL_BUILDING_TYPE_NAMES, POWER_CENTER_TIERS, RESOURCE_NAMES } from "../../enums";
import { InternalBuildingType } from "./internalBuildingType";
import { EXTERNAL_BUILDING_TYPES } from "./externalBuildingTypes";

export const INTERNAL_BUILDING_TYPES = {
    [INTERNAL_BUILDING_TYPE_NAMES.WORKSHOP]: new InternalBuildingType({
        minRequiredTier: POWER_CENTER_TIERS.FIRST,
        buildCost: {
            [RESOURCE_NAMES.MONEY]: 250,
            [RESOURCE_NAMES.STONE]: 50,
            [RESOURCE_NAMES.WOOD_BOARDS]: 50,
        },
        ticksAmountToBuild: 3,
    }),
    [INTERNAL_BUILDING_TYPE_NAMES.TAX_OFFICE]: new InternalBuildingType({
        minRequiredTier: POWER_CENTER_TIERS.FIRST,
        buildCost: {
            [RESOURCE_NAMES.MONEY]: 250,
            [RESOURCE_NAMES.STONE]: 50,
            [RESOURCE_NAMES.WOOD_BOARDS]: 50,
        },
        ticksAmountToBuild: 5,
    }),
    [INTERNAL_BUILDING_TYPE_NAMES.WAREHOUSE]: new InternalBuildingType({
        minRequiredTier: POWER_CENTER_TIERS.FIRST,
        buildCost: {
            [RESOURCE_NAMES.MONEY]: 200,
            [RESOURCE_NAMES.STONE]: 30,
            [RESOURCE_NAMES.WOOD_BOARDS]: 30,
        },
        ticksAmountToBuild: 3,
    }),
    [INTERNAL_BUILDING_TYPE_NAMES.COLONIZATION_CENTER]: new InternalBuildingType({
        minRequiredTier: POWER_CENTER_TIERS.SECOND,
        buildCost: {
            [RESOURCE_NAMES.MONEY]: 500,
            [RESOURCE_NAMES.WOOD]: 70,
            [RESOURCE_NAMES.STONE]: 70,
            [RESOURCE_NAMES.WOOD_BOARDS]: 50,
        },
        ticksAmountToBuild: 10,
    }),
    [INTERNAL_BUILDING_TYPE_NAMES.GUILD]: new InternalBuildingType({
        minRequiredTier: POWER_CENTER_TIERS.SECOND,
        buildCost: {
            [RESOURCE_NAMES.MONEY]: 250,
            [RESOURCE_NAMES.WOOD]: 50,
            [RESOURCE_NAMES.STONE]: 50,
        },
        ticksAmountToBuild: 5,
    }),
    [INTERNAL_BUILDING_TYPE_NAMES.MARKET]: new InternalBuildingType({
        minRequiredTier: POWER_CENTER_TIERS.SECOND,
        buildCost: {
            [RESOURCE_NAMES.MONEY]: 500,
            [RESOURCE_NAMES.WOOD]: 70,
            [RESOURCE_NAMES.STONE]: 70,
            [RESOURCE_NAMES.WOOD_BOARDS]: 70,
        },
        ticksAmountToBuild: 10,
    }),
};

export const FIRST_TIER_INTERNAL_BUILDING_TYPES = [
    INTERNAL_BUILDING_TYPES.TAX_OFFICE,
    INTERNAL_BUILDING_TYPES.WAREHOUSE,
];

export const SECOND_TIER_INTERNAL_BUILDING_TYPES = [
    INTERNAL_BUILDING_TYPES.COLONIZATION_CENTER,
    INTERNAL_BUILDING_TYPES.MARKET,
];

export const INTERNAL_BUILDING_TYPES_PER_TIER = [
    FIRST_TIER_INTERNAL_BUILDING_TYPES,
    SECOND_TIER_INTERNAL_BUILDING_TYPES,
];
