import { Sprite } from "pixi.js";
import { reaction } from "mobx";
import { CURRENT_PLAYER_SELECTED_OBJECT_STATES, GAME_ACTIONS, GAME_VALIDATIONS } from "models/game";
import { RENDERER_CONFIG, SPRITESHEET_PLAYER_ACTIONS_NAMES } from "../constants";
import { TileBorder } from "./tileBorder";
import { RegionBorderByTile } from "./regionBorderByTile";
import { BuildIndicator } from "./buildIndicator";

class CurrentPlayerActionsRenderer {
    #ticker;
    #renderer;
    #viewport;
    #tilePositionCalculator;
    #spritesheet;
    #reactionDisposers;
    #container;
    #mapToRender;
    #gameValidator;

    #sprite;
    #isSpriteRemoved;
    #mousePos;
    #validation;
    #canDoActionTextureName;
    #cannotDoActionTextureName;

    #selectedPowerCenterTileBorder;
    #buildIndicator;

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

        this.#buildIndicator = new BuildIndicator({
            spritesheet: this.#spritesheet,
            ticker: this.#ticker,
            container: this.#container,
            viewport: this.#viewport,
            mousePos: this.#mousePos,
            mapToRender: mapToRender,
            tilePositionCalculator: this.#tilePositionCalculator,
            gameValidator: this.#gameValidator,
            playerIndex: currentPlayer.index,
        });
        this.#reactionDisposers.push(
            reaction(
                () => currentPlayer.tryingPlaceGlobalBuildingActionName,
                (action) => {
                    if (action === null) {
                        this.#buildIndicator.hide();
                        return;
                    }

                    let validationName;
                    if (action === GAME_ACTIONS.START_BUILD_POWER_CENTER) {
                        validationName = GAME_VALIDATIONS.CAN_PLACE_POWER_CENTER;
                    }
                    if (action === GAME_ACTIONS.START_BUILD_ROAD) {
                        validationName = GAME_VALIDATIONS.CAN_PLACE_ROAD;
                    }

                    this.#buildIndicator.show(validationName);
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
}

export { CurrentPlayerActionsRenderer };
