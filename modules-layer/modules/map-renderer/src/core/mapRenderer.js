import { Application, Container, Assets } from "pixi.js";
import { Viewport } from "pixi-viewport";
import { MAP_EMPTY_SPACE_BORDER_OFFSET, oddTileOffsetPercent, TILE_DIMENSIONS } from "../constants.js";
import { ElementResizeObserver } from "../utils/elementResizeObserver.js";
import { SpriteCreator } from "./spriteCreator.js";
import { BorderGraphics } from "./borderGraphics";
import { RegionBordersRenderer } from "./regionBordersRenderer";
import { TilePositionCalculator } from "./tilePositionCalculator";
import { findRegionsCenterTile } from "../utils/findRegionsCenterTile";

export class MapRenderer {
    _config;
    _pixiApp;
    _appContainerResizeObserver;
    _viewport;
    _mapContainer;
    _tileDimensions;
    _spriteSheetLoadPromise;
    _spriteCreator;
    #borderGraphics;
    #tilePositionCalculator;
    #regionBordersRenderer;

    constructor(config) {
        this._config = { ...config };

        this._initPixiApp();
        this._initViewport();
        this._calculateTileDimensions();
        this._loadSpriteSheet();
        this._initSpriteCreator();

        this.#borderGraphics = new BorderGraphics(this._tileDimensions);
        this.#tilePositionCalculator = new TilePositionCalculator(this._tileDimensions);

        this.#regionBordersRenderer = new RegionBordersRenderer({
            tilePositionCalculator: this.#tilePositionCalculator,
            borderGraphics: this.#borderGraphics,
            renderer: this._pixiApp.renderer,
        });
    }

    _initPixiApp() {
        this._pixiApp = new Application({
            background: "#000",
            antialias: false,
        });
    }

    _initViewport() {
        const app = this._pixiApp;

        this._viewport = new Viewport({
            passiveWheel: false,
            events: app.renderer.events,
            ticker: app.ticker,
            disableOnContextMenu: true,
        });

        app.stage.addChild(this._viewport);

        this._viewport
            .drag({
                wheel: false,
                mouseButtons: "left",
            })
            .pinch()
            .decelerate()
            .wheel({
                smooth: 3.5,
            })
            .clampZoom({
                minScale: this._config.viewport.minScale,
                maxScale: this._config.viewport.maxScale,
            });
    }

    _calculateTileDimensions() {
        this._tileDimensions = {
            width: TILE_DIMENSIONS.WIDTH,
            height: TILE_DIMENSIONS.HEIGHT,
            widthOffset: [0, TILE_DIMENSIONS.WIDTH * oddTileOffsetPercent],
        };
    }

    _loadSpriteSheet() {
        this._spriteSheetLoadPromise = Assets.load(this._config.spriteSheetPath);
    }

    _initSpriteCreator() {
        this._spriteCreator = new SpriteCreator(this._tileDimensions);
    }

    mountView(containerSelector) {
        const appHtmlContainer = document.querySelector(containerSelector);

        this._pixiApp.resizeTo = appHtmlContainer;
        appHtmlContainer.appendChild(this._pixiApp.view);

        this._appContainerResizeObserver = new ElementResizeObserver(appHtmlContainer);
        this._appContainerResizeObserver.subscribe({
            update: ({ width, height }) => {
                this._viewport.resize(width, height);
            },
        });
    }

    async render(mapToRender) {
        const spriteSheet = await this._spriteSheetLoadPromise;

        this.clean();

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

        this.#regionBordersRenderer.render(this._mapContainer, matrix, regions);

        this._positionViewport();

        if (this._config.viewport.minScale) {
            this._viewport.setZoom(this._config.viewport.maxScale);
        }

        this._viewport.addChild(this._mapContainer);
    }

    positionViewportToRegion(map, regionIndex) {
        const region = map.regions[regionIndex];
        const [row, col] = findRegionsCenterTile(region);
        const [x, y] = this.#tilePositionCalculator.calc(map.matrix[row][col]);
        this._positionViewport(x, y);
    }

    _positionViewport(x, y) {
        const rendererMapSizes = { width: this._mapContainer.width, height: this._mapContainer.height };
        this._resizeViewportToMapSizes(rendererMapSizes);
        this._viewport.moveCenter(x ?? rendererMapSizes.width / 2, y ?? rendererMapSizes.height / 2);
    }

    _resizeViewportToMapSizes(mapSizes) {
        const appWidth = this._appContainerResizeObserver.width;
        const appHeight = this._appContainerResizeObserver.height;
        this._viewport.resize(appWidth, appHeight, mapSizes.width, mapSizes.height);
        this._viewport.clamp({
            left: -MAP_EMPTY_SPACE_BORDER_OFFSET,
            right: this._viewport.worldWidth + MAP_EMPTY_SPACE_BORDER_OFFSET,
            top: -MAP_EMPTY_SPACE_BORDER_OFFSET,
            bottom: this._viewport.worldHeight + MAP_EMPTY_SPACE_BORDER_OFFSET,
            underflow: "center",
        });
    }

    clean() {
        if (this._mapContainer) {
            this._mapContainer.destroy({
                children: true,
            });
        }
    }
}
