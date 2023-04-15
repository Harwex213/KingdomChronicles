import { Sprite } from "pixi.js";
import { RENDERER_CONFIG, SPRITESHEET_PLAYER_ACTIONS_NAMES } from "../constants";

class BuildIndicator {
    #ticker;
    #spritesheet;
    #container;
    #viewport;
    #mousePos;
    #mapToRender;
    #tilePositionCalculator;

    #gameValidator;
    #playerIndex;
    #validationName;
    #validationParams;

    #isAdded;
    #sprite;
    #lastTilePoint;
    #updateSpritePosFunc;

    constructor({
        spritesheet,
        ticker,
        container,
        viewport,
        mousePos,
        mapToRender,
        tilePositionCalculator,
        gameValidator,
        playerIndex,
    }) {
        this.#spritesheet = spritesheet;
        this.#ticker = ticker;
        this.#container = container;
        this.#viewport = viewport;
        this.#mousePos = mousePos;
        this.#mapToRender = mapToRender;
        this.#tilePositionCalculator = tilePositionCalculator;

        this.#gameValidator = gameValidator;
        this.#playerIndex = playerIndex;

        this.#sprite = new Sprite();
        this.#sprite.zIndex = RENDERER_CONFIG.LAYERS.CURRENT_PLAYER_ACTIONS;

        this.#isAdded = false;
        this.#lastTilePoint = {
            row: -1,
            col: -1,
        };

        this.#updateSpritePosFunc = this.#updateSpritePos.bind(this);
    }

    #updateSpritePos() {
        const worldPoint = this.#viewport.toWorld(this.#mousePos.x, this.#mousePos.y);
        const tilePoint = this.#tilePositionCalculator.fromMousePos(worldPoint.x, worldPoint.y);

        const tilesRow = this.#mapToRender.matrix[tilePoint[0]];
        if (!tilesRow) {
            this.#removeSprite();
            return;
        }

        const tile = tilesRow[tilePoint[1]];
        if (!tile) {
            this.#removeSprite();
            return;
        } else if (this.#isAdded === false) {
            this.#addSprite();
        }

        if (this.#lastTilePoint.row === tile.row && this.#lastTilePoint.col === tile.col) {
            return;
        }

        this.#lastTilePoint.row = tile.row;
        this.#lastTilePoint.col = tile.col;

        this.#sprite.x = tile.renderPosition.x;
        this.#sprite.y = tile.renderPosition.y;

        if (
            this.#gameValidator.validate(this.#validationName, {
                playerIndex: this.#playerIndex,
                row: tile.row,
                col: tile.col,
                ...this.#validationParams,
            })
        ) {
            this.#sprite.texture = this.#spritesheet.textures[SPRITESHEET_PLAYER_ACTIONS_NAMES.CAN_BUILD];
        } else {
            this.#sprite.texture = this.#spritesheet.textures[SPRITESHEET_PLAYER_ACTIONS_NAMES.CANNOT_BUILD];
        }
    }

    #addSprite() {
        this.#container.addChild(this.#sprite);
        this.#isAdded = true;
    }

    #removeSprite() {
        this.#container.removeChild(this.#sprite);
        this.#isAdded = false;
    }

    show(validationName, validationParams = {}) {
        this.#validationName = validationName;
        this.#validationParams = validationParams;
        if (this.#isAdded === false) {
            this.#addSprite();
            this.#ticker.add(this.#updateSpritePosFunc);
        }
    }

    hide() {
        if (this.#isAdded) {
            this.#ticker.remove(this.#updateSpritePosFunc);
            this.#removeSprite();
        }
    }
}

export { BuildIndicator };
