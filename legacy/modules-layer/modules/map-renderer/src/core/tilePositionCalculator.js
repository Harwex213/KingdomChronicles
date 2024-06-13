class TilePositionCalculator {
    #tileDimensions;

    constructor(tileDimensions) {
        this.#tileDimensions = tileDimensions;
    }

    fromMousePos(x, y) {
        const tileRow = Math.floor(y / (this.#tileDimensions.height * 0.75));
        const tileCol = Math.floor(
            (x - this.#tileDimensions.widthOffset[tileRow & 1]) / this.#tileDimensions.width
        );

        return [tileRow, tileCol];
    }

    calc(mapTile) {
        const rowParity = mapTile.row & 1;
        const y = mapTile.row * this.#tileDimensions.height * 0.75;
        const x = mapTile.col * this.#tileDimensions.width + this.#tileDimensions.widthOffset[rowParity];
        return [x, y];
    }

    calcX(mapTile) {
        const rowParity = mapTile.row & 1;
        return mapTile.col * this.#tileDimensions.width + this.#tileDimensions.widthOffset[rowParity];
    }

    calcY(mapTile) {
        return mapTile.row * this.#tileDimensions.height * 0.75;
    }
}

export { TilePositionCalculator };
