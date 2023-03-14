import { spriteSheetFrameTypes } from "../constants.js";

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
            [spriteSheetFrameTypes.WATER]: null,
            [spriteSheetFrameTypes.FLATLAND]: null,
            [spriteSheetFrameTypes.GRASSLAND]: null,
            [spriteSheetFrameTypes.DESERT]: null,
            [spriteSheetFrameTypes.MOUNTAIN]: null,
            [spriteSheetFrameTypes.TUNDRA]: null,
            [spriteSheetFrameTypes.FOREST_GRASSLAND]: null,
            [spriteSheetFrameTypes.FOREST_FLATLAND]: null,
            [spriteSheetFrameTypes.FOREST_TUNDRA]: null,
            [spriteSheetFrameTypes.HILLS_DESERT]: null,
            [spriteSheetFrameTypes.HILLS_GRASSLAND]: null,
            [spriteSheetFrameTypes.HILLS_FLATLAND]: null,
            [spriteSheetFrameTypes.HILLS_TUNDRA]: null,
            [spriteSheetFrameTypes.JUNGLE_GRASSLAND]: null,
            [spriteSheetFrameTypes.JUNGLE_FLATLAND]: null,
        }
    };
}
