import { Application, Container, Assets } from "pixi.js";
import { Viewport } from "pixi-viewport";
import { RENDERER_CONFIG } from "../constants.js";
import { ElementResizeObserver } from "../utils/elementResizeObserver.js";
import { TileRenderer } from "../tileRenderer/tileRenderer.js";
import { RegionBordersRenderer } from "./regionBordersRenderer";
import { TilePositionCalculator } from "./tilePositionCalculator";
import { findRegionCenterTile } from "../utils/findRegionCenterTile";
import { CurrentPlayerActionsRenderer } from "../currentPlayerActionsRenderer/currentPlayerActionsRenderer";

export class MapRenderer {
    _config;
    _pixiApp;
    _appContainerResizeObserver;
    _viewport;
    _tileDimensions;

    #spritesheet = null;

    #tilePositionCalculator;
    #tileRenderer;
    #regionBordersRenderer;
    #currentPlayerActionsRenderer;

    #reactionDisposers;
    #viewportClickedEventHandler;
    #container;

    constructor(config) {
        this._config = { ...config };

        const initPixiApp = () => {
            this._pixiApp = new Application({
                background: "#000",
                antialias: false,
            });
        };

        const initViewport = () => {
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
                    mouseButtons: RENDERER_CONFIG.VIEWPORT.DRAG_MOUSE_BUTTON,
                })
                .pinch()
                .decelerate()
                .wheel({
                    smooth: RENDERER_CONFIG.VIEWPORT.SMOOTH,
                })
                .clampZoom({
                    minScale: this._config.viewport.minScale,
                    maxScale: this._config.viewport.maxScale,
                });
        };

        const calculateTileDimensions = () => {
            const oddTileWidthOffset =
                RENDERER_CONFIG.TILE_DIMENSIONS.WIDTH *
                RENDERER_CONFIG.TILE_DIMENSIONS.ODD_TILE_OFFSET_PERCENT;

            this._tileDimensions = {
                width: RENDERER_CONFIG.TILE_DIMENSIONS.WIDTH,
                height: RENDERER_CONFIG.TILE_DIMENSIONS.HEIGHT,
                widthOffset: [0, oddTileWidthOffset],
            };
            this.#tilePositionCalculator = new TilePositionCalculator(this._tileDimensions);
        };

        const initTileRenderer = () => {
            this.#tileRenderer = new TileRenderer({
                tilePositionCalculator: this.#tilePositionCalculator,
                reactionDisposers: this.#reactionDisposers,
            });
        };

        const initRegionBordersRenderer = () => {
            this.#regionBordersRenderer = new RegionBordersRenderer({
                renderer: this._pixiApp.renderer,
                reactionDisposers: this.#reactionDisposers,
            });
        };

        const initCurrentPlayerActionsRenderer = () => {
            this.#currentPlayerActionsRenderer = new CurrentPlayerActionsRenderer({
                ticker: this._pixiApp.ticker,
                renderer: this._pixiApp.renderer,
                viewport: this._viewport,
                tilePositionCalculator: this.#tilePositionCalculator,
                reactionDisposers: this.#reactionDisposers,
            });
        };

        initPixiApp();
        initViewport();
        calculateTileDimensions();
        this.#reactionDisposers = [];
        initTileRenderer();
        initRegionBordersRenderer();
        initCurrentPlayerActionsRenderer();
    }

    async loadSpritesheet() {
        if (this.#spritesheet) {
            return;
        }
        this.#spritesheet = true;

        this.#spritesheet = await Assets.load(this._config.spriteSheetPath);

        this.#tileRenderer.setSpritesheet(this.#spritesheet);
        this.#regionBordersRenderer.setSpritesheet(this.#spritesheet);
        this.#currentPlayerActionsRenderer.setSpritesheet(this.#spritesheet);
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

    render({ mapToRender, currentPlayer = null, gameValidator = null, onTileClick }) {
        if (this.#spritesheet === null || this.#spritesheet === true) {
            return;
        }

        this.clean();

        this.#container = new Container();
        this.#container.interactiveChildren = false;
        this.#container.sortableChildren = true;

        this.#tileRenderer.render(this.#container, mapToRender);
        this.#regionBordersRenderer.render(this.#container, mapToRender);
        if (currentPlayer !== null) {
            this.#currentPlayerActionsRenderer.render(
                this.#container,
                mapToRender,
                currentPlayer,
                gameValidator
            );
        }

        this.#setUpTileClickEvent(mapToRender.matrix, onTileClick);

        if (this._config.viewport.maxScale) {
            this._viewport.setZoom(this._config.viewport.maxScale);
        }

        if (currentPlayer === null) {
            this._positionViewport();
        } else {
            this.positionViewportToRegion(mapToRender, currentPlayer.firstRegion);
        }

        this._viewport.addChild(this.#container);
    }

    #setUpTileClickEvent(matrix, onTileClick) {
        this.#viewportClickedEventHandler = ({ event, world }) => {
            if (event.button !== 0 || world.x < 0 || world.y < 0) {
                return;
            }

            const tilePoint = this.#tilePositionCalculator.fromMousePos(world.x, world.y);
            const tileRow = matrix[tilePoint[0]];
            if (tileRow) {
                const tile = tileRow[tilePoint[1]];
                if (tile) {
                    onTileClick(tile);
                    return;
                }
            }

            onTileClick(null);
        };

        this._viewport.on("clicked", this.#viewportClickedEventHandler);
    }

    positionViewportToRegion(map, regionIndex) {
        const region = map.regions[regionIndex];
        const [row, col] = findRegionCenterTile(region);
        const [x, y] = this.#tilePositionCalculator.calc(map.matrix[row][col]);
        this._positionViewport(x, y);
    }

    _positionViewport(x, y) {
        const rendererMapSizes = {
            width: this.#container.width,
            height: this.#container.height,
        };
        this._resizeViewportToMapSizes(rendererMapSizes);
        this._viewport.moveCenter(x ?? rendererMapSizes.width / 2, y ?? rendererMapSizes.height / 2);
    }

    _resizeViewportToMapSizes(mapSizes) {
        const appWidth = this._appContainerResizeObserver.width;
        const appHeight = this._appContainerResizeObserver.height;
        this._viewport.resize(appWidth, appHeight, mapSizes.width, mapSizes.height);
        this._viewport.clamp({
            left: -RENDERER_CONFIG.MAP_EMPTY_SPACE_BORDER_OFFSET,
            right: this._viewport.worldWidth + RENDERER_CONFIG.MAP_EMPTY_SPACE_BORDER_OFFSET,
            top: -RENDERER_CONFIG.MAP_EMPTY_SPACE_BORDER_OFFSET,
            bottom: this._viewport.worldHeight + RENDERER_CONFIG.MAP_EMPTY_SPACE_BORDER_OFFSET,
            underflow: "center",
        });
    }

    clean() {
        if (this.#container) {
            this.#container.destroy({
                children: true,
            });
        }

        this._viewport.off("clicked", this.#viewportClickedEventHandler);

        for (const reactionDisposer of this.#reactionDisposers) {
            reactionDisposer();
        }
        this.#reactionDisposers.splice(0, this.#reactionDisposers.length);
    }
}
