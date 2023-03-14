import { spritesheetTextureTypes } from "../constants.js";

export class MapRendererConfig {
    tileSize = null;
    app = {
        containerId: null,
        dimensions:  { width: null, height: null },
    };
    viewport = {
        minScale: null,
        maxScale: null,
    };
    spriteSheet = {
        path: null,
        textureNames: {
            [spritesheetTextureTypes.WATER]: null,
            [spritesheetTextureTypes.FLATLAND]: null,
            [spritesheetTextureTypes.GRASSLAND]: null,
            [spritesheetTextureTypes.DESERT]: null,
            [spritesheetTextureTypes.MOUNTAIN]: null,
            [spritesheetTextureTypes.TUNDRA]: null,
            [spritesheetTextureTypes.FOREST_GRASSLAND]: null,
            [spritesheetTextureTypes.FOREST_FLATLAND]: null,
            [spritesheetTextureTypes.FOREST_TUNDRA]: null,
            [spritesheetTextureTypes.HILLS_DESERT]: null,
            [spritesheetTextureTypes.HILLS_GRASSLAND]: null,
            [spritesheetTextureTypes.HILLS_FLATLAND]: null,
            [spritesheetTextureTypes.HILLS_TUNDRA]: null,
            [spritesheetTextureTypes.JUNGLE_GRASSLAND]: null,
            [spritesheetTextureTypes.JUNGLE_FLATLAND]: null,
        }
    };
}
