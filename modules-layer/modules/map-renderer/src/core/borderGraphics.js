import { Graphics } from "pixi.js";
import { BORDER_STYLES } from "../constants";

class BorderGraphics {
    #tileDimensions;

    constructor(tileDimensions) {
        const halfWidth = tileDimensions.width / 2;
        const halfHeight = tileDimensions.height / 2;
        const quarterHeight = tileDimensions.height / 4;
        const halfWithQuarterHeight = halfHeight + quarterHeight;

        this.#tileDimensions = {
            ...tileDimensions,
            halfWidth,
            halfHeight,
            quarterHeight,
            halfWithQuarterHeight,
        };
    }

    get leftUp() {
        const graphics = new Graphics();
        graphics.lineStyle(BORDER_STYLES.WIDTH, BORDER_STYLES.COLOR);
        graphics.moveTo(17, 1);
        graphics.lineTo(2, 9);
        return graphics;
    }

    get rightUp() {
        const graphics = new Graphics();
        graphics.lineStyle(BORDER_STYLES.WIDTH, BORDER_STYLES.COLOR);
        graphics.moveTo(21, 1);
        graphics.lineTo(36, 9);
        return graphics;
    }

    get leftMiddle() {
        const graphics = new Graphics();
        graphics.lineStyle(BORDER_STYLES.WIDTH, BORDER_STYLES.COLOR);
        graphics.moveTo(0, 11);
        graphics.lineTo(0, 27);
        return graphics;
    }

    get rightMiddle() {
        const graphics = new Graphics();
        graphics.lineStyle(BORDER_STYLES.WIDTH, BORDER_STYLES.COLOR);
        graphics.moveTo(38, 11);
        graphics.lineTo(38, 27);
        return graphics;
    }

    get leftDown() {
        const graphics = new Graphics();
        graphics.lineStyle(BORDER_STYLES.WIDTH, BORDER_STYLES.COLOR);
        graphics.moveTo(2, 28);
        graphics.lineTo(18, 36);
        return graphics;
    }

    get rightDown() {
        const graphics = new Graphics();
        graphics.lineStyle(BORDER_STYLES.WIDTH, BORDER_STYLES.COLOR);
        graphics.moveTo(36, 28);
        graphics.lineTo(21, 36);
        return graphics;
    }
}

export { BorderGraphics };
