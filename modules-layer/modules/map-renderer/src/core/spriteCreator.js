import { Sprite } from "pixi.js";
import { areaTypes, biomTypes, tileTypes } from "models/map";
import { spritesheetTextureTypes } from "../constants.js";

const areaTypeToSpritesheetTextureType = {
    [areaTypes.NONE]: {
        [biomTypes.DESERT]: spritesheetTextureTypes.DESERT,
        [biomTypes.FLATLAND]: spritesheetTextureTypes.FLATLAND,
        [biomTypes.GRASSLAND]: spritesheetTextureTypes.GRASSLAND,
        [biomTypes.MOUNTAIN]: spritesheetTextureTypes.MOUNTAIN,
        [biomTypes.TUNDRA]: spritesheetTextureTypes.TUNDRA,
        [biomTypes.JUNGLE]: spritesheetTextureTypes.JUNGLE,
    },
    [areaTypes.HILLS]: {
        [biomTypes.FLATLAND]: spritesheetTextureTypes.HILLS_FLATLAND,
        [biomTypes.GRASSLAND]: spritesheetTextureTypes.HILLS_GRASSLAND,
        [biomTypes.DESERT]: spritesheetTextureTypes.HILLS_DESERT,
        [biomTypes.TUNDRA]: spritesheetTextureTypes.HILLS_TUNDRA,
    },
    [areaTypes.FOREST]: {
        [biomTypes.GRASSLAND]: spritesheetTextureTypes.FOREST_GRASSLAND,
        [biomTypes.FLATLAND]: spritesheetTextureTypes.FOREST_FLATLAND,
        [biomTypes.TUNDRA]: spritesheetTextureTypes.FOREST_TUNDRA,
    },
    [areaTypes.FOREST_HILLS]: {
        [biomTypes.GRASSLAND]: spritesheetTextureTypes.FOREST_HILLS_GRASSLAND,
        [biomTypes.FLATLAND]: spritesheetTextureTypes.FOREST_HILLS_FLATLAND,
        [biomTypes.TUNDRA]: spritesheetTextureTypes.FOREST_HILLS_TUNDRA,
    },
};

export class SpriteCreator {
    constructor(textureNames, tileDimensions) {
        this._textureNames = textureNames;
        this._tileDimensions = tileDimensions;
    }

    fromMapTile(mapTile, mapBiomsSpriteSheet) {
        const textureName = this._getTextureName(this._textureNames, mapTile);
        const tile = new Sprite(mapBiomsSpriteSheet.textures[textureName]);

        const rowParity = mapTile.row & 1;
        tile.y = mapTile.row * this._tileDimensions.height * 0.75;
        tile.x = mapTile.col * this._tileDimensions.width + this._tileDimensions.widthOffset[rowParity];

        return tile;
    }

    _getTextureName = (textureNames, mapTile) => {
        if (mapTile.tileType === null) {
            return textureNames[spritesheetTextureTypes.LAND];
        }
        if (mapTile.tileType === tileTypes.LAND && mapTile.biomType !== biomTypes.NONE) {
            const textureName = areaTypeToSpritesheetTextureType[mapTile.areaType][mapTile.biomType];
            return textureNames[textureName];
        }

        return textureNames[spritesheetTextureTypes.WATER];
    };
}
