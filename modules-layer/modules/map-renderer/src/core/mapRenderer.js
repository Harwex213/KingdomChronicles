import { Application, Container, Assets } from "pixi.js";
import { Viewport } from "pixi-viewport";
import { oddTileOffsetPercent } from "../constants.js";
import { ElementResizeObserver } from "../utils/elementResizeObserver.js";
import { SpriteCreator } from "./spriteCreator.js";

export class MapRenderer {
    _config;
    _pixiApp;
    _appContainerResizeObserver;
    _viewport;
    _mapContainer;
    _tileDimensions;
    _spriteSheetLoadPromise;
    _spriteCreator;

    constructor(config) {
        this._config = { ...config };

        const appHtmlContainer = document.getElementById(this._config.app.containerId);
        this._appContainerResizeObserver = new ElementResizeObserver(appHtmlContainer);
        this._initPixiApp(appHtmlContainer);
        this._initViewport();
        this._calculateTileDimensions();
        this._loadSpriteSheet();
        this._initSpriteCreator();
    }

    _initPixiApp(appHtmlContainer) {
        this._pixiApp = new Application({
            background: "#000",
            resizeTo: appHtmlContainer,
        });
        appHtmlContainer.appendChild(this._pixiApp.view);
    }

    _initViewport() {
        const app = this._pixiApp;

        this._viewport = new Viewport({
            passiveWheel: false,
            events: app.renderer.events,
        });

        app.stage.addChild(this._viewport);

        this._viewport
            .drag({
                wheel: false,
                mouseButtons: "left",
            })
            .pinch()
            .decelerate()
            .clamp({
                direction: "all",
                underflow: "center"
            });

        this._appContainerResizeObserver.subscribe({
            update: ({ width, height }) => {
                this._viewport.resize(width, height);
            }
        });
    }

    _calculateTileDimensions() {
        const { tileSize } = this._config;

        this._tileDimensions = {
            width: tileSize,
            height: tileSize,
            widthOffset: [0, tileSize * oddTileOffsetPercent],
        };
    }

    _loadSpriteSheet() {
        const { path } = this._config.spriteSheet;

        this._spriteSheetLoadPromise = Assets.load(path);
    }

    _initSpriteCreator() {
        this._spriteCreator = new SpriteCreator(this._config.spriteSheet.textureNames, this._tileDimensions);
    }

    async render(mapToRender) {
        this.clean();

        const spriteSheet = await this._spriteSheetLoadPromise;

        this._mapContainer = new Container();
        const { matrix, regions } = mapToRender;

        for (const tilesRow of matrix) {
            for (const mapTile of tilesRow) {
                const tile = this._spriteCreator.fromMapTile(mapTile, spriteSheet);
                if (mapTile.partRegion !== "none" && regions[mapTile.partRegion.regionIndex].tint) {
                    tile.tint = regions[mapTile.partRegion.regionIndex].tint;
                }
                this._mapContainer.addChild(tile);
            }
        }

        this._positionViewport();

        this._viewport.addChild(this._mapContainer);
    }
    
    _positionViewport() {
        const rendererMapSizes = { width: this._mapContainer.width, height: this._mapContainer.height };
        this._resizeViewportToMapSizes(rendererMapSizes);
        this._viewport.moveCenter(rendererMapSizes.width / 2, rendererMapSizes.height / 2);
    }

    _resizeViewportToMapSizes(mapSizes) {
        const appWidth = this._appContainerResizeObserver.width;
        const appHeight = this._appContainerResizeObserver.height;
        this._viewport.resize(appWidth, appHeight, mapSizes.width, mapSizes.height);
    }

    clean() {
        if (this._mapContainer) {
            this._mapContainer.destroy({
                children: true,
            });
        }
    }
}
