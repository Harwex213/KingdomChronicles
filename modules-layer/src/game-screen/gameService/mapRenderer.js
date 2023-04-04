import { MapRenderer, MapRendererConfig } from "map-renderer";

const mapRendererConfig = new MapRendererConfig();
mapRendererConfig.spriteSheetPath = "/spritesheets/bioms.json";
mapRendererConfig.viewport = {
    minScale: null,
    maxScale: null,
};

const mapRenderer = new MapRenderer(mapRendererConfig);

export { mapRenderer };
