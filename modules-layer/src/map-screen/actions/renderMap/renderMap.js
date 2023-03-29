import { MapRenderer, MapRendererConfig, spritesheetTextureTypes } from "map-renderer";
import { renderDevBioms } from "./renderDevBioms.js";

export const mapRendererConfig = new MapRendererConfig();
mapRendererConfig.tileSize = 43;
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
