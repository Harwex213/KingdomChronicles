import { MapRenderer, MapRendererConfig, spritesheetTextureTypes } from "map-renderer";

const mapRendererConfig = new MapRendererConfig();
mapRendererConfig.tileDimensions = {
    width: 43,
    height: 43,
};
mapRendererConfig.spriteSheet = {
    path: "/assets/spritesheet.json",
    textureNames: {
        [spritesheetTextureTypes.LAND]: "land.png",
        [spritesheetTextureTypes.WATER]: "sea.png",

        [spritesheetTextureTypes.DESERT]: "desert.png",
        [spritesheetTextureTypes.FLATLAND]: "flatland.png",
        [spritesheetTextureTypes.GRASSLAND]: "grassland.png",
        [spritesheetTextureTypes.MOUNTAIN]: "mountains.png",
        [spritesheetTextureTypes.JUNGLE]: "jungle.png",
        [spritesheetTextureTypes.TUNDRA]: "tundra.png",

        [spritesheetTextureTypes.FOREST_GRASSLAND]: "forest (grassland).png",
        [spritesheetTextureTypes.FOREST_HILLS_GRASSLAND]: "hills+forest (grassland).png",
        [spritesheetTextureTypes.FOREST_FLATLAND]: "forest (flatland).png",
        [spritesheetTextureTypes.FOREST_HILLS_FLATLAND]: "hills+forest (flatlandd).png",
        [spritesheetTextureTypes.FOREST_TUNDRA]: "hills+forest (tundra).png",
        [spritesheetTextureTypes.FOREST_HILLS_TUNDRA]: "forest_tundra.png",

        [spritesheetTextureTypes.HILLS_DESERT]: "hills (desert).png",
        [spritesheetTextureTypes.HILLS_GRASSLAND]: "hills (grassland).png",
        [spritesheetTextureTypes.HILLS_FLATLAND]: "hills (flatlandd).png",
        [spritesheetTextureTypes.HILLS_TUNDRA]: "hills (tundra).png",
    },
};
mapRendererConfig.viewport = {
    minScale: null,
    maxScale: null,
};

const mapRenderer = new MapRenderer(mapRendererConfig);

export { mapRenderer };
