import { Container, Sprite } from "pixi.js";
import { RENDERER_CONFIG, SPRITESHEET_TILE_BORDER_NAMES } from "../constants";
import { directionsTypes } from "models/map";

class RegionBorderByTile {
    #spritesheet;
    #ticker;
    #container;
    #mapToRender;

    #isAdded;
    #sprite;
    #highlightFunc;
    #highlightUp;

    constructor({ container, mapToRender, renderer, ticker, spritesheet, region }) {
        this.#spritesheet = spritesheet;
        this.#ticker = ticker;
        this.#container = container;
        this.#mapToRender = mapToRender;

        this.#highlightFunc = this.#highlight.bind(this);
        this.#isAdded = false;

        const texture = this.#getTexture(region, renderer);
        this.#sprite = new Sprite(texture);

        this.#sprite.zIndex = RENDERER_CONFIG.LAYERS.REGION_BORDER;
        this.#sprite.tint = 0x000;
        this.#highlightUp = true;

        const firstLeftTile = this.#getFirstLeftTile(region);
        const firstTopTile = this.#getFirstTopTile(region);
        this.#sprite.x = firstLeftTile.renderPosition.x;
        this.#sprite.y = firstTopTile.renderPosition.y;
    }

    #getFirstTopTile(region) {
        return this.#mapToRender.matrix[region.firstTopTile[0]][region.firstTopTile[1]];
    }

    #getFirstLeftTile(region) {
        return this.#mapToRender.matrix[region.firstLeftTile[0]][region.firstLeftTile[1]];
    }

    #getTexture(region, renderer) {
        const container = new Container();

        for (const [mapTileRow, mapTileCol] of region.tilesRegion) {
            const tileBorderContainer = new Container();

            const mapTile = this.#mapToRender.matrix[mapTileRow][mapTileCol];
            if (mapTile.neighboringTilesRegion[directionsTypes.LEFT_UP] === null) {
                this.#addBorder(tileBorderContainer, SPRITESHEET_TILE_BORDER_NAMES.TOP_LEFT);
            }
            if (mapTile.neighboringTilesRegion[directionsTypes.RIGHT_UP] === null) {
                this.#addBorder(tileBorderContainer, SPRITESHEET_TILE_BORDER_NAMES.TOP_RIGHT);
            }
            if (mapTile.neighboringTilesRegion[directionsTypes.RIGHT] === null) {
                this.#addBorder(tileBorderContainer, SPRITESHEET_TILE_BORDER_NAMES.RIGHT);
            }
            if (mapTile.neighboringTilesRegion[directionsTypes.LEFT] === null) {
                this.#addBorder(tileBorderContainer, SPRITESHEET_TILE_BORDER_NAMES.LEFT);
            }
            if (mapTile.neighboringTilesRegion[directionsTypes.LEFT_DOWN] === null) {
                this.#addBorder(tileBorderContainer, SPRITESHEET_TILE_BORDER_NAMES.BOTTOM_LEFT);
            }
            if (mapTile.neighboringTilesRegion[directionsTypes.RIGHT_DOWN] === null) {
                this.#addBorder(tileBorderContainer, SPRITESHEET_TILE_BORDER_NAMES.BOTTOM_RIGHT);
            }

            tileBorderContainer.x = mapTile.renderPosition.x;
            tileBorderContainer.y = mapTile.renderPosition.y;

            container.addChild(tileBorderContainer);
        }

        return renderer.generateTexture(container);
    }

    #addBorder(container, textureName) {
        container.addChild(new Sprite(this.#spritesheet.textures[textureName]));
    }

    #highlight() {
        if (this.#highlightUp) {
            this.#sprite.tint += 0x050505;
        } else {
            this.#sprite.tint -= 0x050505;
        }

        if (this.#sprite.tint === 0xffffff) {
            this.#highlightUp = false;
        }
        if (this.#sprite.tint === 0x000000) {
            this.#highlightUp = true;
        }
    }

    show() {
        if (!this.#isAdded) {
            this.#container.addChild(this.#sprite);
            this.#ticker.add(this.#highlightFunc);
            this.#isAdded = true;
        }
    }

    hide() {
        if (this.#isAdded) {
            this.#container.removeChild(this.#sprite);
            this.#ticker.remove(this.#highlightFunc);
            this.#sprite.tint = 0x000;
            this.#highlightUp = true;
            this.#isAdded = false;
        }
    }
}

export { RegionBorderByTile };
