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
            producedAmountPerTick: 1,
        },
        costPerTick: 15,
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
            producedAmountPerTick: 1,
        },
        costPerTick: 15,
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
            producedAmountPerTick: 1,
        },
        costPerTick: 25,
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
            requiredAmountPerTick: 1,
            producedAmountPerTick: 1,
        },
        costPerTick: 50,
    }),
};
