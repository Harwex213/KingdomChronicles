import { ODDR_DIRECTION_DIFFERENCES } from "./constants";
import { MapTile } from "./mapTile";

class Map {
    constructor(width, height) {
        this.width = Math.max(width, 0);
        this.height = Math.max(height, 0);

        this.matrix = Array.from(Array(this.height), (_, row) => {
            return Array.from(Array(this.width), (_, col) => {
                const parity = row & 1;
                const diff = ODDR_DIRECTION_DIFFERENCES[parity];
                const copyDiff = Object.assign({}, diff);

                Object.keys(copyDiff).forEach((direction) => {
                    const neighboringTile = [row + copyDiff[direction][0], col + copyDiff[direction][1]];
                    copyDiff[direction] =
                        neighboringTile[0] >= 0 &&
                        neighboringTile[0] < this.height &&
                        neighboringTile[1] >= 0 &&
                        neighboringTile[1] < this.width
                            ? [neighboringTile[0], neighboringTile[1]]
                            : null;
                });

                return new MapTile(row, col, copyDiff);
            });
        });
        this.regions = [];
        this.seaRegions = [];
        this.landRegions = [];
    }
}

export { Map };
