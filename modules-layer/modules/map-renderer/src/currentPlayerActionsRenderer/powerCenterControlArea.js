import { POWER_CENTER_MAX_TIER } from "shared/enums";
import { TileBorder } from "./tileBorder";

const CACHE_SIZE = (POWER_CENTER_MAX_TIER + 1) * POWER_CENTER_MAX_TIER * 3;

class PowerCenterControlArea {
    #isAdded;
    #usedSprites;
    #spritesCache;

    constructor({ spritesheet, renderer, container }) {
        this.#isAdded = true;

        this.#usedSprites = [];
        this.#spritesCache = [];
        for (let i = 0; i < CACHE_SIZE; i++) {
            this.#spritesCache.push(
                new TileBorder({
                    spritesheet,
                    renderer,
                    container,
                    bitmask: 0b111111,
                    alpha: 0.5,
                })
            );
        }
    }

    show(powerCenterId, controlArea) {
        if (!this.#isAdded) {
            let mapTile;
            let sprite;
            for (let i = 0; i < controlArea.length; i++) {
                mapTile = controlArea[i];
                sprite = this.#spritesCache[i];

                sprite.updatePos(mapTile.renderPosition.x, mapTile.renderPosition.y);
                sprite.show();
                this.#usedSprites.push(sprite);
            }
            this.#isAdded = true;
        }
    }

    hide() {
        if (this.#isAdded) {
            for (const usedSprite of this.#usedSprites) {
                usedSprite.hide();
            }
            this.#usedSprites = [];
            this.#isAdded = false;
        }
    }
}

export { PowerCenterControlArea };
