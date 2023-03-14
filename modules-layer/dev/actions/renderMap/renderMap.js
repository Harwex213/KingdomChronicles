import { MapRenderer, MapRendererConfig, spriteSheetFrameTypes } from "map-renderer";
import { renderDevBioms } from "./renderDevBioms.js";
import { changeableConfig } from "../changeableConfig.js";

export const mapRendererConfig = new MapRendererConfig();
mapRendererConfig.tileSize = 43;
mapRendererConfig.app = {
    containerId: "container",
};
mapRendererConfig.spriteSheet = {
    path: "assets/spritesheet.json",
    textureNames: {
        [spriteSheetFrameTypes.WATER]: "water",
        [spriteSheetFrameTypes.FLATLAND]: "plainland",
        [spriteSheetFrameTypes.GRASSLAND]: "grassland",
        [spriteSheetFrameTypes.DESERT]: "desert",
        [spriteSheetFrameTypes.MOUNTAIN]: "mountain",
        [spriteSheetFrameTypes.TUNDRA]: "tundra",
        [spriteSheetFrameTypes.FOREST_GRASSLAND]: "forest_grassland",
        [spriteSheetFrameTypes.FOREST_FLATLAND]: "forest_plainland",
        [spriteSheetFrameTypes.FOREST_TUNDRA]: "forest_tundra",
        [spriteSheetFrameTypes.HILLS_DESERT]: "hills_desert",
        [spriteSheetFrameTypes.HILLS_GRASSLAND]: "hills_grassland",
        [spriteSheetFrameTypes.HILLS_FLATLAND]: "hills_plainland",
        [spriteSheetFrameTypes.HILLS_TUNDRA]: "hills_tundra",
        [spriteSheetFrameTypes.JUNGLE_GRASSLAND]: "jungle_grassland",
        [spriteSheetFrameTypes.JUNGLE_FLATLAND]: "jungle_plainland",
    }
};
mapRendererConfig.viewport = {
    minScale: null,
    maxScale: null,
};

const mapRenderer = new MapRenderer(mapRendererConfig);

export const renderMapAction = async (map) => {
    if (changeableConfig.renderDevBioms) {
        renderDevBioms(map);
    }
    await mapRenderer.render(map);
}
