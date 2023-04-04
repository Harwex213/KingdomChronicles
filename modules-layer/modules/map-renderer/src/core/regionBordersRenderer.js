import { Container, Sprite } from "pixi.js";
import { directionsTypes } from "models/map";
import { reaction } from "mobx";

class RegionBordersRenderer {
    #matrix;
    #regions;
    #tilePositionCalculator;
    #borderGraphics;
    #renderer;

    constructor({ tilePositionCalculator, borderGraphics, renderer }) {
        this.#tilePositionCalculator = tilePositionCalculator;
        this.#borderGraphics = borderGraphics;
        this.#renderer = renderer;
    }

    render(container, matrix, regions) {
        this.#matrix = matrix;
        this.#regions = regions;

        for (const region of this.#regions) {
            const firstLeftTile = this.#getFirstLeftTile(region);
            const firstTopTile = this.#getFirstTopTile(region);

            const regionBordersTexture = this.#getRegionBordersTexture(region);
            const bordersSprite = new Sprite(regionBordersTexture);

            bordersSprite.y = this.#tilePositionCalculator.calcY(firstTopTile) + 2;
            bordersSprite.x = this.#tilePositionCalculator.calcX(firstLeftTile) + 1.5;

            this.#colorBorder(bordersSprite, region);
            reaction(
                () => region.ownerIndex,
                () => {
                    this.#colorBorder(bordersSprite, region);
                }
            );

            container.addChild(bordersSprite);
        }
    }

    #getRegionBordersTexture(region) {
        const bordersContainer = new Container();
        bordersContainer.interactiveChilds = false;

        for (const [mapTileRow, mapTileCol] of region.tilesRegion) {
            const mapTile = this.#matrix[mapTileRow][mapTileCol];

            const [x, y] = this.#tilePositionCalculator.calc(mapTile);

            const tileBorderContainer = new Container();

            if (mapTile.neighboringTilesRegion[directionsTypes.LEFT_UP] === "none") {
                tileBorderContainer.addChild(this.#borderGraphics.leftUp);
            }
            if (mapTile.neighboringTilesRegion[directionsTypes.RIGHT_UP] === "none") {
                tileBorderContainer.addChild(this.#borderGraphics.rightUp);
            }
            if (mapTile.neighboringTilesRegion[directionsTypes.RIGHT] === "none") {
                tileBorderContainer.addChild(this.#borderGraphics.rightMiddle);
            }
            if (mapTile.neighboringTilesRegion[directionsTypes.LEFT] === "none") {
                tileBorderContainer.addChild(this.#borderGraphics.leftMiddle);
            }
            if (mapTile.neighboringTilesRegion[directionsTypes.LEFT_DOWN] === "none") {
                tileBorderContainer.addChild(this.#borderGraphics.leftDown);
            }
            if (mapTile.neighboringTilesRegion[directionsTypes.RIGHT_DOWN] === "none") {
                tileBorderContainer.addChild(this.#borderGraphics.rightDown);
            }

            tileBorderContainer.x = x;
            tileBorderContainer.y = y;

            bordersContainer.addChild(tileBorderContainer);
        }

        return this.#renderer.generateTexture(bordersContainer);
    }

    #getFirstTopTile(region) {
        const sortedByRowTilesRegion = [...region.tilesRegion];
        sortedByRowTilesRegion.sort((a, b) => a[0] - b[0]);

        const [row, col] = sortedByRowTilesRegion[0];
        return this.#matrix[row][col];
    }

    #getFirstLeftTile(region) {
        const sortedByColumnTilesRegion = [...region.tilesRegion];
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

        const [row, col] = sortedByColumnTilesRegion[chosenIndex];
        return this.#matrix[row][col];
    }

    #colorBorder(bordersSprite, region) {
        if (region.ownerIndex !== -1) {
            bordersSprite.alpha = 1;
            bordersSprite.tint = region.borderColor;
        } else {
            bordersSprite.alpha = 0.25;
            bordersSprite.tint = 0x000000;
        }
    }
}

export { RegionBordersRenderer };
