import { Sprite, Graphics, Point } from "pixi.js";
import { reaction } from "mobx";
import { CURRENT_PLAYER_SELECTED_OBJECT_STATES, GAME_ACTIONS, GAME_VALIDATIONS } from "shared/enums";
import { RENDERER_CONFIG } from "../constants";
import { TileBorder } from "./tileBorder";
import { RegionBorderByTile } from "./regionBorderByTile";
import { BuildIndicator } from "./buildIndicator";
import { PowerCenterControlArea } from "./powerCenterControlArea";
import { ArmySelection } from "./armySelection";

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
    #updateMousePos;
    #isPointerDown;

    #armySelection;

    constructor({ ticker, renderer, viewport, tilePositionCalculator }) {
        this.#ticker = ticker;
        this.#renderer = renderer;
        this.#viewport = viewport;
        this.#tilePositionCalculator = tilePositionCalculator;
        this.#reactionDisposers = [];

        this.#sprite = new Sprite();
        this.#sprite.zIndex = RENDERER_CONFIG.LAYERS.CURRENT_PLAYER_ACTIONS;
        this.#isSpriteRemoved = true;

        this.#isPointerDown = false;
        this.#mousePos = {
            x: 0,
            y: 0,
        };
        this.#updateMousePos = (event) => {
            this.#mousePos.x = event.global.x;
            this.#mousePos.y = event.global.y;
        };

        this.#armySelection = new ArmySelection({
            ticker,
            viewport,
            mousePos: this.#mousePos,
        });
    }

    setSpritesheet(spritesheet) {
        this.#spritesheet = spritesheet;
    }

    render(container, mapToRender, currentPlayer) {
        this.#mapToRender = mapToRender;
        this.#container = container;
        this.#gameValidator = currentPlayer.gameValidator;

        this.#viewport.on("mousemove", this.#updateMousePos);

        this.#armySelection.render(container);

        let lastSelectedNeutralRegionIndex = null;
        const regionBordersByTile = this.#getRegionBordersByTile();
        const selectedPowerCenterTileBorder = new TileBorder({
            spritesheet: this.#spritesheet,
            renderer: this.#renderer,
            ticker: this.#ticker,
            bitmask: 0b111111,
            container: container,
            mustHighlight: true,
        });
        const selectedPowerCenterControlArea = new PowerCenterControlArea({
            spritesheet: this.#spritesheet,
            renderer: this.#renderer,
            ticker: this.#ticker,
            container: container,
        });
        this.#reactionDisposers.push(
            reaction(
                () => currentPlayer.selectedObject.identifier,
                () => {
                    if (lastSelectedNeutralRegionIndex !== null) {
                        regionBordersByTile[lastSelectedNeutralRegionIndex].hide();
                    }
                    selectedPowerCenterTileBorder.hide();
                    selectedPowerCenterControlArea.hide();

                    if (
                        currentPlayer.selectedObject.state ===
                        CURRENT_PLAYER_SELECTED_OBJECT_STATES.POWER_CENTER
                    ) {
                        const selectedPowerCenter = currentPlayer.selectedPowerCenter;
                        const selectedPowerCenterTile = selectedPowerCenter.getTile(mapToRender);
                        selectedPowerCenterTileBorder.updatePos(
                            selectedPowerCenterTile.renderPosition.x,
                            selectedPowerCenterTile.renderPosition.y
                        );
                        selectedPowerCenterTileBorder.show();
                        selectedPowerCenterControlArea.show(
                            selectedPowerCenter.id,
                            selectedPowerCenter.getControlArea(mapToRender)
                        );
                        // TODO: react on control area change
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

        const buildIndicator = new BuildIndicator({
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
                        buildIndicator.hide();
                        return;
                    }

                    let validationName;
                    let validationParams = {};
                    if (action === GAME_ACTIONS.START_BUILD_POWER_CENTER) {
                        validationName = GAME_VALIDATIONS.CAN_PLACE_POWER_CENTER;
                    }
                    if (action === GAME_ACTIONS.START_BUILD_ROAD) {
                        validationName = GAME_VALIDATIONS.CAN_PLACE_ROAD;
                    }
                    if (action === GAME_ACTIONS.START_BUILD_EXTERNAL_BUILDING) {
                        validationName = GAME_VALIDATIONS.CAN_BUILD_EXTERNAL_BUILDING;
                        validationParams = {
                            ...currentPlayer.placingExternalBuildingOptions,
                        };
                    }

                    buildIndicator.show(validationName, validationParams);
                }
            )
        );
    }

    clean() {
        this.#viewport.off("mousemove", this.#updateMousePos);

        for (const reactionDisposer of this.#reactionDisposers) {
            reactionDisposer();
        }
        this.#reactionDisposers.splice(0, this.#reactionDisposers.length);

        this.#armySelection.clean();
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
