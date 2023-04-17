import { Application, Container, Assets, Point, Graphics, Polygon } from "pixi.js";
import { Viewport } from "pixi-viewport";
import { RENDERER_CONFIG } from "../constants.js";
import { ElementResizeObserver } from "../utils/elementResizeObserver.js";
import { TileRenderer } from "../tileRenderer/tileRenderer.js";
import { RegionBordersRenderer } from "./regionBordersRenderer";
import { TilePositionCalculator } from "./tilePositionCalculator";
import { CurrentPlayerActionsRenderer } from "../currentPlayerActionsRenderer/currentPlayerActionsRenderer";
import { findRegionCenterTile } from "../utils/findRegionCenterTile";

const CONTAINERS = {
    TILES: 0,
    REGION_BORDERS: 1,
    CURRENT_PLAYER_ACTIONS: 2,
};

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
                antialias: true,
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
                    factor: RENDERER_CONFIG.VIEWPORT.DRAG_FACTOR,
                })
                .pinch()
                .decelerate()
                .wheel({
                    smooth: RENDERER_CONFIG.VIEWPORT.WHEEL_SMOOTH,
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
                ticker: this._pixiApp.ticker,
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

    renderMap({ mapToRender, onTileClick }) {
        this.render({
            mapToRender,
            onTileClick,
        });
    }

    renderGame({ currentPlayer, onTileClick }) {
        this.render({
            mapToRender: currentPlayer.gameState.map,
            currentPlayer,
            onTileClick,
        });
    }

    render({ mapToRender, currentPlayer = null, onTileClick }) {
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
            this.#currentPlayerActionsRenderer.render(this.#container, mapToRender, currentPlayer);
        }

        // this.#testBezierCurve(mapToRender, this.#container.children[CONTAINERS.REGION_BORDERS]);

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

    #testBezierCurve(mapToRender, container) {
        function calculateControlPoints(startPoint, endPoint, tension) {
            const midpoint = new Point((startPoint.x + endPoint.x) / 2, (startPoint.y + endPoint.y) / 2);
            const angle = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x);
            const distance = Math.sqrt(
                Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2)
            );
            const controlPointDistance = (tension / 2) * distance;
            const controlPoint1 = new Point(
                midpoint.x - controlPointDistance * Math.cos(angle - Math.PI / 2),
                midpoint.y - controlPointDistance * Math.sin(angle - Math.PI / 2)
            );
            const controlPoint2 = new Point(
                midpoint.x + controlPointDistance * Math.cos(angle - Math.PI / 2),
                midpoint.y + controlPointDistance * Math.sin(angle - Math.PI / 2)
            );
            return { controlPoint1, controlPoint2 };
        }

        const initialPoint = mapToRender.regions[119].renderCenterPoint;
        const targetPoint = mapToRender.regions[120].renderCenterPoint;

        const { controlPoint1, controlPoint2 } = calculateControlPoints(initialPoint, targetPoint, 0.2);

        const move = new Graphics();
        move.lineStyle(3, 0xffffff, 1);
        move.moveTo(initialPoint.x, initialPoint.y);
        move.bezierCurveTo(
            controlPoint1.x,
            controlPoint1.y,
            controlPoint2.x,
            controlPoint2.y,
            targetPoint.x,
            targetPoint.y
        );
        const angle = Math.atan2(controlPoint2.y - targetPoint.y, controlPoint2.x - targetPoint.x);

        // Draw the arrowhead
        const arrow = new Graphics();
        const arrowheadLength = 20;
        const arrowheadWidth = 10;
        const arrowhead = new Polygon([
            new Point(0, -arrowheadWidth / 2),
            new Point(0, arrowheadWidth / 2),
            new Point(arrowheadLength, 0),
        ]);
        arrow.rotation = angle + Math.PI;
        arrow.x = targetPoint.x;
        arrow.y = targetPoint.y;
        arrow.beginFill(0xffffff, 1);
        arrow.drawPolygon(arrowhead);
        arrow.endFill();

        container.addChild(move);
        container.addChild(arrow);
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
                    onTileClick(tile, event);
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

        this.#tileRenderer.clean();
        this.#regionBordersRenderer.clean();
        this.#currentPlayerActionsRenderer.clean();
    }
}
