import { reaction } from "mobx";
import { Container, Sprite } from "pixi.js";
import { HEXAGON_DIRECTION_TYPES } from "shared/enums";
import { RENDERER_CONFIG, SPRITESHEET_REGION_BORDER_NAMES } from "../constants";

class RegionBordersRenderer {
    #matrix;
    #renderer;
    #spritesheet;
    #reactionDisposers;

    constructor({ renderer }) {
        this.#renderer = renderer;
        this.#reactionDisposers = [];
    }

    setSpritesheet(spritesheet) {
        this.#spritesheet = spritesheet;
    }

    render(container, mapToRender) {
        const { matrix, regions } = mapToRender;
        this.#matrix = matrix;

        for (const mapRegion of regions) {
            container.addChild(this.#getRegionBorder(mapRegion));
        }
    }

    clean() {
        for (const reactionDisposer of this.#reactionDisposers) {
            reactionDisposer();
        }
        this.#reactionDisposers.splice(0, this.#reactionDisposers.length);
    }

    #getRegionBorder(mapRegion) {
        const firstLeftTile = this.#getFirstLeftTile(mapRegion);
        const firstTopTile = this.#getFirstTopTile(mapRegion);

        const regionBordersTexture = this.#getRegionBordersTexture(mapRegion);
        const regionBorders = new Sprite(regionBordersTexture);

        regionBorders.zIndex = RENDERER_CONFIG.LAYERS.REGION_BORDER;
        regionBorders.x = firstLeftTile.renderPosition.x;
        regionBorders.y = firstTopTile.renderPosition.y;

        this.#colorBorder(regionBorders, mapRegion);
        const disposer = reaction(
            () => mapRegion.ownerIndex,
            () => {
                this.#colorBorder(regionBorders, mapRegion);
            }
        );
        this.#reactionDisposers.push(disposer);

        this.#setRenderPosition(mapRegion, regionBorders);

        return regionBorders;
    }

    #setRenderPosition(mapRegion, regionBordersSprite) {
        const centerX = regionBordersSprite.x + regionBordersSprite.width / 2;
        const centerY = regionBordersSprite.y + regionBordersSprite.height / 2;

        mapRegion.setRenderOptions({
            centerX,
            centerY,
        });
    }

    #getRegionBordersTexture(region) {
        const bordersContainer = new Container();

        for (const [mapTileRow, mapTileCol] of region.tilesRegion) {
            const mapTile = this.#matrix[mapTileRow][mapTileCol];
            const tileBorderContainer = new Container();

            if (mapTile.neighboringTilesRegion[HEXAGON_DIRECTION_TYPES.LEFT_UP] === null) {
                this.#addBorder(tileBorderContainer, SPRITESHEET_REGION_BORDER_NAMES.TOP_LEFT);
            }
            if (mapTile.neighboringTilesRegion[HEXAGON_DIRECTION_TYPES.RIGHT_UP] === null) {
                this.#addBorder(tileBorderContainer, SPRITESHEET_REGION_BORDER_NAMES.TOP_RIGHT);
            }
            if (mapTile.neighboringTilesRegion[HEXAGON_DIRECTION_TYPES.RIGHT] === null) {
                this.#addBorder(tileBorderContainer, SPRITESHEET_REGION_BORDER_NAMES.RIGHT);
            }
            if (mapTile.neighboringTilesRegion[HEXAGON_DIRECTION_TYPES.LEFT] === null) {
                this.#addBorder(tileBorderContainer, SPRITESHEET_REGION_BORDER_NAMES.LEFT);
            }
            if (mapTile.neighboringTilesRegion[HEXAGON_DIRECTION_TYPES.LEFT_DOWN] === null) {
                this.#addBorder(tileBorderContainer, SPRITESHEET_REGION_BORDER_NAMES.BOTTOM_LEFT);
            }
            if (mapTile.neighboringTilesRegion[HEXAGON_DIRECTION_TYPES.RIGHT_DOWN] === null) {
                this.#addBorder(tileBorderContainer, SPRITESHEET_REGION_BORDER_NAMES.BOTTOM_RIGHT);
            }

            tileBorderContainer.x = mapTile.renderPosition.x;
            tileBorderContainer.y = mapTile.renderPosition.y;

            bordersContainer.addChild(tileBorderContainer);
        }

        // TODO: color border

        return this.#renderer.generateTexture(bordersContainer);
    }

    #addBorder(container, textureName) {
        container.addChild(new Sprite(this.#spritesheet.textures[textureName]));
    }

    #getFirstTopTile(mapRegion) {
        const sortedByRowTilesRegion = [...mapRegion.tilesRegion];
        sortedByRowTilesRegion.sort((a, b) => a[0] - b[0]);

        const firstTopTilePoint = sortedByRowTilesRegion[0];
        mapRegion.firstTopTile = firstTopTilePoint;
        return this.#matrix[firstTopTilePoint[0]][firstTopTilePoint[1]];
    }

    #getFirstLeftTile(mapRegion) {
        const sortedByColumnTilesRegion = [...mapRegion.tilesRegion];
        sortedByColumnTilesRegion.sort((a, b) => a[1] - b[1]);

        let chosenIndex = 0;
        let firstLeftColumn = sortedByColumnTilesRegion[0][1];
        for (let i = 0; i < sortedByColumnTilesRegion.length; i++) {
            if (firstLeftColumn !== sortedByColumnTilesRegion[i][1]) {
                break;
            } else if ((sortedByColumnTilesRegion[i][0] & 1) === 0) {
                chosenIndex = i;
                break;
            }
        }

        const firstLeftTilePoint = sortedByColumnTilesRegion[chosenIndex];
        mapRegion.firstLeftTile = firstLeftTilePoint;
        return this.#matrix[firstLeftTilePoint[0]][firstLeftTilePoint[1]];
    }

    #colorBorder(bordersSprite, region) {
        if (region.ownerIndex !== -1) {
            bordersSprite.alpha = 1;
            bordersSprite.tint = region.borderColor;
        } else {
            bordersSprite.alpha = RENDERER_CONFIG.NEUTRAL_BORDER_STYLE.ALPHA;
            bordersSprite.tint = RENDERER_CONFIG.NEUTRAL_BORDER_STYLE.COLOR;
        }
    }
}

export { RegionBordersRenderer };
