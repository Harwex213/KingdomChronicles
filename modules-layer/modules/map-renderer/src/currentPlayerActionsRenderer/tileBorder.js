import { Container, Sprite } from "pixi.js";
import { RENDERER_CONFIG, SPRITESHEET_TILE_BORDER_NAMES, TILE_BITMASK_SIDES } from "../constants";

class TileBorder {
    #spritesheet;
    #ticker;
    #container;

    #isAdded;
    #mustHighlight;
    #sprite;
    #highlightFunc;

    constructor({ spritesheet, renderer, ticker, bitmask, container, mustHighlight = false }) {
        this.#spritesheet = spritesheet;
        this.#ticker = ticker;
        this.#container = container;

        this.#highlightFunc = this.#highlight.bind(this);
        this.#isAdded = false;
        this.#mustHighlight = mustHighlight;

        this.#sprite = new Sprite();
        this.#sprite.zIndex = RENDERER_CONFIG.LAYERS.CURRENT_PLAYER_ACTIONS;
        this.#sprite.tint = 0x000;

        const tileBorder = new Container();
        if (bitmask && TILE_BITMASK_SIDES.TOP_LEFT) {
            this.#addBorder(tileBorder, SPRITESHEET_TILE_BORDER_NAMES.TOP_LEFT);
        }
        if (bitmask && TILE_BITMASK_SIDES.TOP_RIGHT) {
            this.#addBorder(tileBorder, SPRITESHEET_TILE_BORDER_NAMES.TOP_RIGHT);
        }
        if (bitmask && TILE_BITMASK_SIDES.LEFT) {
            this.#addBorder(tileBorder, SPRITESHEET_TILE_BORDER_NAMES.LEFT);
        }
        if (bitmask && TILE_BITMASK_SIDES.RIGHT) {
            this.#addBorder(tileBorder, SPRITESHEET_TILE_BORDER_NAMES.RIGHT);
        }
        if (bitmask && TILE_BITMASK_SIDES.BOTTOM_LEFT) {
            this.#addBorder(tileBorder, SPRITESHEET_TILE_BORDER_NAMES.BOTTOM_LEFT);
        }
        if (bitmask && TILE_BITMASK_SIDES.BOTTOM_RIGHT) {
            this.#addBorder(tileBorder, SPRITESHEET_TILE_BORDER_NAMES.BOTTOM_RIGHT);
        }
        this.#sprite.texture = renderer.generateTexture(tileBorder);
    }

    #addBorder(container, textureName) {
        container.addChild(new Sprite(this.#spritesheet.textures[textureName]));
    }

    updatePos(x, y) {
        this.#sprite.x = x;
        this.#sprite.y = y;
    }

    #highlight() {
        if (this.#sprite.tint < 0xffffff) {
            this.#sprite.tint += 0x050505;
        } else {
            this.#sprite.tint = 0x000000;
        }
    }

    show() {
        if (!this.#isAdded) {
            this.#container.addChild(this.#sprite);
            if (this.#mustHighlight) {
                this.#ticker.add(this.#highlightFunc);
            }
            this.#isAdded = true;
        }
    }

    hide() {
        if (this.#isAdded) {
            this.#container.removeChild(this.#sprite);
            if (this.#mustHighlight) {
                this.#ticker.remove(this.#highlightFunc);
            }
            this.#sprite.tint = 0x000;
            this.#isAdded = false;
        }
    }
}

export { TileBorder };
