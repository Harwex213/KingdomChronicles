import { MapRenderer, MapRendererConfig, spritesheetTextureTypes } from "map-renderer";
import { renderDevBioms } from "./renderDevBioms.js";

export const mapRendererConfig = new MapRendererConfig();
mapRendererConfig.tileSize = 43;
mapRendererConfig.spriteSheet = {
    path: "/assets/spritesheet.json",
    textureNames: {
        [spritesheetTextureTypes.EMPTY]: "empty.png",
        [spritesheetTextureTypes.WATER]: "water.png",
        [spritesheetTextureTypes.FLATLAND]: "plainland.png",
        [spritesheetTextureTypes.GRASSLAND]: "grassland.png",
        [spritesheetTextureTypes.DESERT]: "desert.png",
        [spritesheetTextureTypes.MOUNTAIN]: "mountain.png",
        [spritesheetTextureTypes.TUNDRA]: "tundra.png",
        [spritesheetTextureTypes.FOREST_GRASSLAND]: "forest_grassland.png",
        [spritesheetTextureTypes.FOREST_FLATLAND]: "forest_plainland.png",
        [spritesheetTextureTypes.FOREST_TUNDRA]: "forest_tundra.png",
        [spritesheetTextureTypes.HILLS_DESERT]: "hills_desert.png",
        [spritesheetTextureTypes.HILLS_GRASSLAND]: "hills_grassland.png",
        [spritesheetTextureTypes.HILLS_FLATLAND]: "hills_plainland.png",
        [spritesheetTextureTypes.HILLS_TUNDRA]: "hills_tundra.png",
        [spritesheetTextureTypes.JUNGLE_GRASSLAND]: "jungle_grassland.png",
        [spritesheetTextureTypes.JUNGLE_FLATLAND]: "jungle_plainland.png",
    },
};
mapRendererConfig.viewport = {
    minScale: null,
    maxScale: null,
};

let mapRenderer = null;

const initRenderer = ({ containerSelector }) => {
    mapRendererConfig.app.containerSelector = containerSelector;
    mapRenderer = new MapRenderer(mapRendererConfig);
};

const disposeRenderer = () => {
    mapRenderer.clean();
};

const renderMap = async (map, { devBiomsRender, devRegionsRender }) => {
    if (devBiomsRender) {
        renderDevBioms(map);
    }
    if (devRegionsRender) {
        map.matrix.forEach((row) => row.forEach((mapTile) => (mapTile.tileType = null)));
        map.regions.forEach((region) => (region.tint = Math.random() * 0xffffff));
    }
    await mapRenderer.render(map);
};

export { initRenderer, disposeRenderer, renderMap };
