import { Container, Sprite } from "pixi.js";
import { RENDERER_CONFIG, SPRITESHEET_TILE_BORDER_NAMES } from "../constants";
import { HEXAGON_DIRECTION_TYPES, TILE_BITMASK_SIDES } from "shared/enums";

class TileBorder {
    #spritesheet;
    #ticker;
    #container;

    #isAdded;
    #mustHighlight;
    #sprite;
    #highlightFunc;
    #highlightUp;

    constructor({
        spritesheet,
        renderer,
        ticker,
        container,
        bitmask,
        mustHighlight = false,
        alpha = 1,
        instantShow = false,
        x = 0,
        y = 0,
    }) {
        this.#spritesheet = spritesheet;
        this.#ticker = ticker;
        this.#container = container;

        this.#highlightFunc = this.#highlight.bind(this);
        this.#isAdded = false;
        this.#mustHighlight = mustHighlight;

        this.#sprite = new Sprite();
        this.#sprite.zIndex = RENDERER_CONFIG.LAYERS.CURRENT_PLAYER_ACTIONS;
        this.#sprite.alpha = alpha;
        this.#sprite.tint = 0x000;
        this.#highlightUp = true;
        this.#sprite.x = x;
        this.#sprite.y = y;

        const tileBorder = new Container();
        if (bitmask && TILE_BITMASK_SIDES[HEXAGON_DIRECTION_TYPES.LEFT_UP]) {
            this.#addBorder(tileBorder, SPRITESHEET_TILE_BORDER_NAMES.TOP_LEFT);
        }
        if (bitmask && TILE_BITMASK_SIDES[HEXAGON_DIRECTION_TYPES.RIGHT_UP]) {
            this.#addBorder(tileBorder, SPRITESHEET_TILE_BORDER_NAMES.TOP_RIGHT);
        }
        if (bitmask && TILE_BITMASK_SIDES[HEXAGON_DIRECTION_TYPES.LEFT]) {
            this.#addBorder(tileBorder, SPRITESHEET_TILE_BORDER_NAMES.LEFT);
        }
        if (bitmask && TILE_BITMASK_SIDES[HEXAGON_DIRECTION_TYPES.RIGHT]) {
            this.#addBorder(tileBorder, SPRITESHEET_TILE_BORDER_NAMES.RIGHT);
        }
        if (bitmask && TILE_BITMASK_SIDES[HEXAGON_DIRECTION_TYPES.LEFT_DOWN]) {
            this.#addBorder(tileBorder, SPRITESHEET_TILE_BORDER_NAMES.BOTTOM_LEFT);
        }
        if (bitmask && TILE_BITMASK_SIDES[HEXAGON_DIRECTION_TYPES.RIGHT_DOWN]) {
            this.#addBorder(tileBorder, SPRITESHEET_TILE_BORDER_NAMES.BOTTOM_RIGHT);
        }
        this.#sprite.texture = renderer.generateTexture(tileBorder);

        if (instantShow) {
            this.show();
        }
    }

    #addBorder(container, textureName) {
        container.addChild(new Sprite(this.#spritesheet.textures[textureName]));
    }

    updatePos(x, y) {
        this.#sprite.x = x;
        this.#sprite.y = y;
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
            this.#highlightUp = true;
            this.#isAdded = false;
        }
    }

    destroy() {
        this.#sprite.destroy();
    }
}

export { TileBorder };
