class Resource {
    constructor({ name, dependsOn }) {
        this.name = name;
        this.dependsOn = dependsOn;
    }
}

const RESOURCE_NAMES = {
    MONEY: "Money",
    WOOD: "Wood",
    FOOD: "Food",
    STONE: "Stone",
    WOOD_BOARDS: "Wood boards",
};

const RESOURCES = {
    WOOD: new Resource({
        name: RESOURCE_NAMES.WOOD,
        dependsOn: null,
    }),
    FOOD: new Resource({
        name: RESOURCE_NAMES.STONE,
        dependsOn: null,
    }),
    STONE: new Resource({
        name: RESOURCE_NAMES.FOOD,
        dependsOn: null,
    }),
    WOOD_BOARDS: new Resource({
        name: RESOURCE_NAMES.WOOD_BOARDS,
        dependsOn: RESOURCE_NAMES.WOOD,
    }),
};

const FIRST_LAYER_RESOURCES = [RESOURCES.FOOD, RESOURCES.WOOD, RESOURCES.STONE];

const SECOND_LAYER_RESOURCES = [RESOURCES.WOOD_BOARDS];

export { Resource, RESOURCES, RESOURCE_NAMES, FIRST_LAYER_RESOURCES, SECOND_LAYER_RESOURCES };
