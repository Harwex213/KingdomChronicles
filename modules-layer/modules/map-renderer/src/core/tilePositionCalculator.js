class TilePositionCalculator {
    #tileDimensions;

    constructor(tileDimensions) {
        this.#tileDimensions = tileDimensions;
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
