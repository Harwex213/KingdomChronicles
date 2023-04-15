import { Sprite, Graphics, Point } from "pixi.js";
import { RENDERER_CONFIG } from "../constants";

class ArmySelection {
    #ticker;
    #viewport;
    #mousePos;
    #container;

    #selection;
    #updateSelection;
    #handlePointerDown;
    #handlePointerUp;

    constructor({ ticker, viewport, mousePos }) {
        this.#ticker = ticker;
        this.#viewport = viewport;
        this.#mousePos = mousePos;

        this.#selection = new Graphics();
        this.#selection.zIndex = RENDERER_CONFIG.LAYERS.ARMY_SELECTION;
        this.#selection.visible = false;

        this.#updateSelection = () => {
            const worldPoint = this.#viewport.toWorld(this.#mousePos.x, this.#mousePos.y);
            const dragX = worldPoint.x - this.#selection.x;
            const dragY = worldPoint.y - this.#selection.y;

            this.#selection.clear();
            this.#selection.lineStyle(1 / this.#viewport.scaled, 0xe3c022, 1);
            this.#selection.beginFill(0xe0b800, 0.15);
            this.#selection.drawPolygon([0, 0, 0, dragY, dragX, dragY, dragX, 0]);
            this.#selection.endFill();
        };

        this.#handlePointerDown = (event) => {
            if (event.button !== 0) {
                return;
            }

            this.#selection.visible = true;

            const worldPoint = this.#viewport.toWorld(this.#mousePos.x, this.#mousePos.y);
            this.#selection.x = worldPoint.x;
            this.#selection.y = worldPoint.y;

            this.#ticker.add(this.#updateSelection);
            this.#container.addChild(this.#selection);
        };

        this.#handlePointerUp = (event) => {
            if (event.button !== 0) {
                return;
            }

            this.#selection.visible = false;

            this.#ticker.remove(this.#updateSelection);
            this.#container.removeChild(this.#selection);
        };
    }

    render(container) {
        this.#container = container;
        this.#viewport.on("pointerdown", this.#handlePointerDown);
        this.#viewport.on("pointerup", this.#handlePointerUp);
    }

    clean() {
        this.#viewport.off("pointerdown", this.#handlePointerDown);
        this.#viewport.off("pointerup", this.#handlePointerUp);
    }
}

export { ArmySelection };
