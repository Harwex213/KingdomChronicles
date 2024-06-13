import { Sprite } from "pixi.js";
import { RENDERER_CONFIG, SPRITESHEET_PLAYER_ACTIONS_NAMES } from "../constants";

const INDICATOR_MODES = {
    BUILD: "BUILD",
    DESTROY: "DESTROY",
};

const INDICATOR_MODE_TO_TEXTURE_NAME = {
    [INDICATOR_MODES.BUILD]: {
        CAN: SPRITESHEET_PLAYER_ACTIONS_NAMES.CAN_BUILD,
        CANNOT: SPRITESHEET_PLAYER_ACTIONS_NAMES.CANNOT_BUILD,
    },
    [INDICATOR_MODES.DESTROY]: {
        CAN: SPRITESHEET_PLAYER_ACTIONS_NAMES.CAN_DESTROY,
        CANNOT: null,
    },
};

class Indicator {
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

    #mode;

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
        mode,
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

        this.#mode = mode;
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

        const validationResult = this.#gameValidator.validate(this.#validationName, {
            playerIndex: this.#playerIndex,
            row: tile.row,
            col: tile.col,
            ...this.#validationParams,
        });
        const textureNames = INDICATOR_MODE_TO_TEXTURE_NAME[this.#mode];
        const textureName = validationResult ? textureNames.CAN : textureNames.CANNOT;

        this.#sprite.texture = this.#spritesheet.textures[textureName];
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

export { Indicator, INDICATOR_MODES };
