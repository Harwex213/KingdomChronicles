import { MapRenderer, MapRendererConfig } from "map-renderer";

const mapRendererConfig = new MapRendererConfig();
mapRendererConfig.spriteSheetPath = "/spritesheets/bioms.json";
mapRendererConfig.viewport = {
    minScale: 0.8,
    maxScale: 1.5,
};

const mapRenderer = new MapRenderer(mapRendererConfig);

export { mapRenderer };
