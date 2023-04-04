import { MapRenderer, MapRendererConfig } from "map-renderer";
import { renderDevBioms } from "./renderDevBioms.js";

export const mapRendererConfig = new MapRendererConfig();
mapRendererConfig.spriteSheetPath = "/spritesheets/bioms.json";
mapRendererConfig.viewport = {
    minScale: null,
    maxScale: null,
};

let mapRenderer = null;

const initRenderer = ({ containerSelector }) => {
    mapRenderer = new MapRenderer(mapRendererConfig);
    mapRenderer.mountView(containerSelector);
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
