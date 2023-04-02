import { spritesheetTextureTypes } from "../constants.js";

export class MapRendererConfig {
    tileDimensions = {
        width: null,
        height: null,
    };
    viewport = {
        minScale: null,
        maxScale: null,
    };
    spriteSheet = {
        path: null,
        textureNames: {
            [spritesheetTextureTypes.LAND]: null,
            [spritesheetTextureTypes.WATER]: null,

            [spritesheetTextureTypes.DESERT]: null,
            [spritesheetTextureTypes.FLATLAND]: null,
            [spritesheetTextureTypes.GRASSLAND]: null,
            [spritesheetTextureTypes.MOUNTAIN]: null,
            [spritesheetTextureTypes.JUNGLE]: null,
            [spritesheetTextureTypes.TUNDRA]: null,

            [spritesheetTextureTypes.FOREST_FLATLAND]: null,
            [spritesheetTextureTypes.FOREST_HILLS_FLATLAND]: null,
            [spritesheetTextureTypes.FOREST_GRASSLAND]: null,
            [spritesheetTextureTypes.FOREST_HILLS_GRASSLAND]: null,
            [spritesheetTextureTypes.FOREST_TUNDRA]: null,
            [spritesheetTextureTypes.FOREST_HILLS_TUNDRA]: null,

            [spritesheetTextureTypes.HILLS_GRASSLAND]: null,
            [spritesheetTextureTypes.HILLS_FLATLAND]: null,
            [spritesheetTextureTypes.HILLS_TUNDRA]: null,
            [spritesheetTextureTypes.HILLS_DESERT]: null,
        },
    };
}
