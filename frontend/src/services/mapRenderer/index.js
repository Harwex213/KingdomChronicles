import { MapRenderer, MapRendererConfig } from "map-renderer";
import { action, computed, makeObservable, observable, runInAction } from "mobx";

const SPRITESHEET_LOADER_STATE = {
    IDLE: "IDLE",
    LOADING: "LOADING",
    LOADED: "LOADED",
    FAILED: "FAILED",
};

class MapRendererService {
    mapRenderer;
    spritesheetLoaderState;

    constructor() {
        this.spritesheetLoaderState = SPRITESHEET_LOADER_STATE.IDLE;

        const mapRendererConfig = new MapRendererConfig();
        mapRendererConfig.spriteSheetPath = process.env.REACT_APP_SPRITESHEET_URI;
        mapRendererConfig.viewport = {
            minScale: 0.8,
            maxScale: 1.5,
        };
        this.mapRenderer = new MapRenderer(mapRendererConfig);

        makeObservable(this, {
            spritesheetLoaderState: observable,
            isIdle: computed,
            isLoading: computed,
            isLoaded: computed,
            isError: computed,
            loadSpritesheet: action,
        });
    }

    async loadSpritesheet() {
        try {
            if (this.isLoading) {
                return;
            }

            this.spritesheetLoaderState = SPRITESHEET_LOADER_STATE.LOADING;

            await this.mapRenderer.loadSpritesheet();

            runInAction(() => {
                this.spritesheetLoaderState = SPRITESHEET_LOADER_STATE.LOADED;
            });
        } catch (e) {
            runInAction(() => {
                this.spritesheetLoaderState = SPRITESHEET_LOADER_STATE.FAILED;
            });
        }
    }

    mountView(containerSelector) {
        this.mapRenderer.mountView(containerSelector);
    }

    renderMap(map) {
        this.mapRenderer.renderMap({
            onTileClick: () => {},
            mapToRender: map,
        });
    }

    clean() {
        this.mapRenderer.clean();
    }

    get isIdle() {
        return this.spritesheetLoaderState === SPRITESHEET_LOADER_STATE.IDLE;
    }

    get isLoading() {
        return this.spritesheetLoaderState === SPRITESHEET_LOADER_STATE.LOADING;
    }

    get isLoaded() {
        return this.spritesheetLoaderState === SPRITESHEET_LOADER_STATE.LOADED;
    }

    get isError() {
        return this.spritesheetLoaderState === SPRITESHEET_LOADER_STATE.FAILED;
    }
}

const mapRendererService = new MapRendererService();

export { mapRendererService };
