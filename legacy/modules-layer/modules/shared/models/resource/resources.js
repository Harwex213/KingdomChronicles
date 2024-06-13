import { Resource } from "./resource";
import { EXTERNAL_BUILDING_TYPE_NAMES, RESOURCE_NAMES } from "../../enums";

const RESOURCES = {
    FOOD: new Resource({
        name: RESOURCE_NAMES.STONE,
        dependsOn: null,
        producedOn: EXTERNAL_BUILDING_TYPE_NAMES.STONE_QUARRY,
    }),
    WOOD: new Resource({
        name: RESOURCE_NAMES.WOOD,
        dependsOn: null,
        producedOn: EXTERNAL_BUILDING_TYPE_NAMES.WOODCUTTER,
    }),
    STONE: new Resource({
        name: RESOURCE_NAMES.FOOD,
        dependsOn: null,
        producedOn: EXTERNAL_BUILDING_TYPE_NAMES.FARM,
    }),
    WOOD_BOARDS: new Resource({
        name: RESOURCE_NAMES.WOOD_BOARDS,
        dependsOn: RESOURCE_NAMES.WOOD,
        producedOn: EXTERNAL_BUILDING_TYPE_NAMES.SAWMILL,
    }),
};

const RESOURCE_LAYERS = [
    [RESOURCES.FOOD, RESOURCES.WOOD, RESOURCES.STONE], // FIRST
    [RESOURCES.WOOD_BOARDS], // SECOND
];

export { RESOURCES, RESOURCE_LAYERS };
