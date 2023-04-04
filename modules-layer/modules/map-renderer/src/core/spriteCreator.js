import { Sprite } from "pixi.js";
import { areaTypes, biomTypes, tileTypes } from "models/map";
import { spritesheetTextureNames } from "../constants.js";

const areaTypeToSpritesheetTextureName = {
    [areaTypes.NONE]: {
        [biomTypes.DESERT]: spritesheetTextureNames.DESERT,
        [biomTypes.FLATLAND]: spritesheetTextureNames.FLATLAND,
        [biomTypes.GRASSLAND]: spritesheetTextureNames.GRASSLAND,
        [biomTypes.MOUNTAIN]: spritesheetTextureNames.MOUNTAIN,
        [biomTypes.TUNDRA]: spritesheetTextureNames.TUNDRA,
        [biomTypes.JUNGLE]: spritesheetTextureNames.JUNGLE,
    },
    [areaTypes.HILLS]: {
        [biomTypes.FLATLAND]: spritesheetTextureNames.HILLS_FLATLAND,
        [biomTypes.GRASSLAND]: spritesheetTextureNames.HILLS_GRASSLAND,
        [biomTypes.DESERT]: spritesheetTextureNames.HILLS_DESERT,
        [biomTypes.TUNDRA]: spritesheetTextureNames.HILLS_TUNDRA,
    },
    [areaTypes.FOREST]: {
        [biomTypes.GRASSLAND]: spritesheetTextureNames.FOREST_GRASSLAND,
        [biomTypes.FLATLAND]: spritesheetTextureNames.FOREST_FLATLAND,
        [biomTypes.TUNDRA]: spritesheetTextureNames.FOREST_TUNDRA,
    },
    [areaTypes.FOREST_HILLS]: {
        [biomTypes.GRASSLAND]: spritesheetTextureNames.FOREST_HILLS_GRASSLAND,
        [biomTypes.FLATLAND]: spritesheetTextureNames.FOREST_HILLS_FLATLAND,
        [biomTypes.TUNDRA]: spritesheetTextureNames.FOREST_HILLS_TUNDRA,
    },
};

export class SpriteCreator {
    constructor(tileDimensions) {
        this._tileDimensions = tileDimensions;
    }

    fromMapTile(mapTile, mapBiomsSpriteSheet) {
        const textureName = this._getTextureName(mapTile);
        const tile = new Sprite(mapBiomsSpriteSheet.textures[textureName]);

        const rowParity = mapTile.row & 1;
        tile.y = mapTile.row * this._tileDimensions.height * 0.75;
        tile.x = mapTile.col * this._tileDimensions.width + this._tileDimensions.widthOffset[rowParity];

        return tile;
    }

    _getTextureName = (mapTile) => {
        if (mapTile.tileType === null) {
            return spritesheetTextureNames.LAND;
        }
        if (mapTile.tileType === tileTypes.LAND && mapTile.biomType !== biomTypes.NONE) {
            return areaTypeToSpritesheetTextureName[mapTile.areaType][mapTile.biomType];
        }

        return spritesheetTextureNames.WATER;
    };
}
