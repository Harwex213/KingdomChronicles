import { ExternalBuildingType } from "./externalBuildingType";
import { AREA_TYPES, BIOM_TYPES, EXTERNAL_BUILDING_TYPE_NAMES, RESOURCE_NAMES } from "../../enums";

export const EXTERNAL_BUILDING_TYPES = {
    [EXTERNAL_BUILDING_TYPE_NAMES.FARM]: new ExternalBuildingType({
        acceptableBioms: [BIOM_TYPES.FLATLAND, BIOM_TYPES.GRASSLAND, BIOM_TYPES.TUNDRA],
        acceptableAreas: [AREA_TYPES.NONE, AREA_TYPES.HILLS],
        buildCost: {
            [RESOURCE_NAMES.MONEY]: 100,
            [RESOURCE_NAMES.WOOD]: 20,
        },
        ticksAmountToBuild: 5,
        ticksAmountToDestroy: 2,
        production: {
            requiredResource: null,
            requiredAmountPerTick: 0,
            producedResource: RESOURCE_NAMES.FOOD,
            producedAmountPerTick: 2,
        },
        costPerTick: 15,
        typeName: EXTERNAL_BUILDING_TYPE_NAMES.FARM,
    }),
    [EXTERNAL_BUILDING_TYPE_NAMES.WOODCUTTER]: new ExternalBuildingType({
        acceptableBioms: [BIOM_TYPES.FLATLAND, BIOM_TYPES.GRASSLAND, BIOM_TYPES.TUNDRA],
        acceptableAreas: [AREA_TYPES.FOREST, AREA_TYPES.FOREST_HILLS],
        buildCost: {
            [RESOURCE_NAMES.MONEY]: 150,
        },
        ticksAmountToBuild: 5,
        ticksAmountToDestroy: 2,
        production: {
            requiredResource: null,
            requiredAmountPerTick: 0,
            producedResource: RESOURCE_NAMES.WOOD,
            producedAmountPerTick: 2,
        },
        costPerTick: 15,
        typeName: EXTERNAL_BUILDING_TYPE_NAMES.WOODCUTTER,
    }),
    [EXTERNAL_BUILDING_TYPE_NAMES.STONE_QUARRY]: new ExternalBuildingType({
        acceptableBioms: [BIOM_TYPES.FLATLAND, BIOM_TYPES.GRASSLAND, BIOM_TYPES.TUNDRA],
        acceptableAreas: [AREA_TYPES.HILLS, AREA_TYPES.FOREST_HILLS],
        buildCost: {
            [RESOURCE_NAMES.MONEY]: 300,
            [RESOURCE_NAMES.WOOD]: 50,
        },
        ticksAmountToBuild: 7,
        ticksAmountToDestroy: 7,
        production: {
            requiredResource: null,
            requiredAmountPerTick: 0,
            producedResource: RESOURCE_NAMES.STONE,
            producedAmountPerTick: 2,
        },
        costPerTick: 25,
        typeName: EXTERNAL_BUILDING_TYPE_NAMES.STONE_QUARRY,
    }),
    [EXTERNAL_BUILDING_TYPE_NAMES.SAWMILL]: new ExternalBuildingType({
        acceptableBioms: [BIOM_TYPES.FLATLAND, BIOM_TYPES.GRASSLAND, BIOM_TYPES.TUNDRA, BIOM_TYPES.DESERT],
        acceptableAreas: [AREA_TYPES.NONE, AREA_TYPES.FOREST, AREA_TYPES.FOREST_HILLS, AREA_TYPES.HILLS],
        buildCost: {
            [RESOURCE_NAMES.MONEY]: 250,
            [RESOURCE_NAMES.WOOD]: 40,
            [RESOURCE_NAMES.STONE]: 40,
        },
        ticksAmountToBuild: 7,
        ticksAmountToDestroy: 7,
        production: {
            requiredResource: RESOURCE_NAMES.WOOD,
            requiredAmountPerTick: 4,
            producedResource: RESOURCE_NAMES.WOOD_BOARDS,
            producedAmountPerTick: 2,
        },
        costPerTick: 50,
        typeName: EXTERNAL_BUILDING_TYPE_NAMES.SAWMILL,
    }),
};

export const FIRST_TIER_EXTERNAL_BUILDING_TYPES = [
    EXTERNAL_BUILDING_TYPES.WOODCUTTER,
    EXTERNAL_BUILDING_TYPES.FARM,
];

export const SECOND_TIER_EXTERNAL_BUILDING_TYPES = [
    EXTERNAL_BUILDING_TYPES.STONE_QUARRY,
    EXTERNAL_BUILDING_TYPES.SAWMILL,
];

export const EXTERNAL_BUILDING_TYPES_PER_TIER = [
    FIRST_TIER_EXTERNAL_BUILDING_TYPES,
    SECOND_TIER_EXTERNAL_BUILDING_TYPES,
];
