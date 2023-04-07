import { Sprite } from "pixi.js";
import { reaction } from "mobx";
import { CURRENT_PLAYER_SELECTED_OBJECT_STATES, GAME_ACTIONS, GAME_VALIDATIONS } from "models/game";
import { RENDERER_CONFIG, SPRITESHEET_PLAYER_ACTIONS_NAMES } from "../constants";
import { TileBorder } from "./tileBorder";
import { RegionBorderByTile } from "./regionBorderByTile";

class CurrentPlayerActionsRenderer {
    #ticker;
    #renderer;
    #viewport;
    #tilePositionCalculator;
    #spritesheet;
    #reactionDisposers;

    #mapToRender;
    #container;
    #gameValidator;

    #sprite;
    #isSpriteRemoved;
    #mousePos;
    #lastTilePos;
    #validation;
    #canDoActionTextureName;
    #cannotDoActionTextureName;

    #selectedPowerCenterTileBorder;

    constructor({ ticker, renderer, viewport, tilePositionCalculator, reactionDisposers }) {
        this.#ticker = ticker;
        this.#renderer = renderer;
        this.#viewport = viewport;
        this.#tilePositionCalculator = tilePositionCalculator;
        this.#reactionDisposers = reactionDisposers;

        this.#sprite = new Sprite();
        this.#sprite.zIndex = RENDERER_CONFIG.LAYERS.CURRENT_PLAYER_ACTIONS;
        this.#isSpriteRemoved = true;

        this.#mousePos = {
            x: 0,
            y: 0,
        };
        this.#lastTilePos = {
            row: -1,
            col: -1,
        };

        this.#validation = {
            name: "",
            params: {},
        };
    }

    setSpritesheet(spritesheet) {
        this.#spritesheet = spritesheet;
    }

    render(container, mapToRender, currentPlayer, gameValidator) {
        this.#mapToRender = mapToRender;
        this.#container = container;
        this.#gameValidator = gameValidator;

        this.#viewport.on("mousemove", (event) => {
            this.#mousePos.x = event.global.x;
            this.#mousePos.y = event.global.y;
        });

        let lastSelectedNeutralRegionIndex = null;
        const regionBordersByTile = this.#getRegionBordersByTile();
        this.#selectedPowerCenterTileBorder = new TileBorder({
            spritesheet: this.#spritesheet,
            renderer: this.#renderer,
            ticker: this.#ticker,
            bitmask: 0x111111,
            container: container,
            mustHighlight: true,
        });
        this.#reactionDisposers.push(
            reaction(
                () => currentPlayer.selectedObject.identifier,
                () => {
                    if (lastSelectedNeutralRegionIndex !== null) {
                        regionBordersByTile[lastSelectedNeutralRegionIndex].hide();
                    }
                    this.#selectedPowerCenterTileBorder.hide();

                    if (
                        currentPlayer.selectedObject.state ===
                        CURRENT_PLAYER_SELECTED_OBJECT_STATES.POWER_CENTER
                    ) {
                        const powerCenter = currentPlayer.selectedPowerCenter;
                        const mapTile = mapToRender.matrix[powerCenter.tile.row][powerCenter.tile.col];
                        this.#selectedPowerCenterTileBorder.updatePos(
                            mapTile.renderPosition.x,
                            mapTile.renderPosition.y
                        );
                        this.#selectedPowerCenterTileBorder.show();
                    }

                    if (
                        currentPlayer.selectedObject.state ===
                        CURRENT_PLAYER_SELECTED_OBJECT_STATES.NEUTRAL_REGION
                    ) {
                        const regionIndex = currentPlayer.selectedObject.identifier;
                        regionBordersByTile[regionIndex].show();
                        lastSelectedNeutralRegionIndex = regionIndex;
                    }
                }
            )
        );

        const updateSpritePosition = this.#updateSpritePosition.bind(this);
        this.#reactionDisposers.push(
            reaction(
                () => currentPlayer.currentActionThatRequiresConfirmationOnMap,
                (action) => {
                    if (action === null) {
                        this.#ticker.remove(updateSpritePosition);
                        this.#removeSprite();
                        return;
                    }

                    if (action === GAME_ACTIONS.START_BUILD_POWER_CENTER) {
                        this.#validation = {
                            name: GAME_VALIDATIONS.CAN_PLACE_POWER_CENTER,
                            params: {
                                playerIndex: currentPlayer.index,
                            },
                        };
                        this.#canDoActionTextureName = SPRITESHEET_PLAYER_ACTIONS_NAMES.CAN_BUILD;
                        this.#cannotDoActionTextureName = SPRITESHEET_PLAYER_ACTIONS_NAMES.CANNOT_BUILD;
                    }

                    if (action === GAME_ACTIONS.START_BUILD_ROAD) {
                        // TODO
                    }

                    if (action === GAME_ACTIONS.START_DESTROY_ROAD) {
                        // TODO
                    }

                    this.#ticker.add(updateSpritePosition);
                }
            )
        );
    }

    #getRegionBordersByTile() {
        const regionBordersByTile = [];
        for (const region of this.#mapToRender.regions) {
            regionBordersByTile.push(
                new RegionBorderByTile({
                    container: this.#container,
                    mapToRender: this.#mapToRender,
                    renderer: this.#renderer,
                    ticker: this.#ticker,
                    spritesheet: this.#spritesheet,
                    region,
                })
            );
        }
        return regionBordersByTile;
    }

    #updateSpritePosition() {
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
        } else if (this.#isSpriteRemoved) {
            this.#addSprite();
        }

        if (this.#lastTilePos.row === tile.row && this.#lastTilePos.col === tile.col) {
            return;
        }

        this.#lastTilePos.row = tile.row;
        this.#lastTilePos.col = tile.col;

        this.#sprite.x = tile.renderPosition.x;
        this.#sprite.y = tile.renderPosition.y;

        this.#validation.params.row = tile.row;
        this.#validation.params.col = tile.col;
        if (this.#gameValidator.validate(this.#validation.name, this.#validation.params)) {
            this.#sprite.texture = this.#spritesheet.textures[this.#canDoActionTextureName];
        } else {
            this.#sprite.texture = this.#spritesheet.textures[this.#cannotDoActionTextureName];
        }
    }

    #removeSprite() {
        this.#isSpriteRemoved = true;
        this.#container.removeChild(this.#sprite);
    }

    #addSprite() {
        this.#isSpriteRemoved = false;
        this.#container.addChild(this.#sprite);
    }
}

export { CurrentPlayerActionsRenderer };
