import { Sprite, Text, TextStyle } from "pixi.js";
import { areaTypes, biomTypes, tileTypes } from "models/map";
import { GLOBAL_BUILDING_TYPES } from "models/game";
import {
    RENDERER_CONFIG,
    SPRITESHEET_BIOM_NAMES,
    SPRITESHEET_FARM_NAMES,
    SPRITESHEET_UNSORTED_NAMES,
} from "../constants.js";
import { reaction } from "mobx";
import {
    AREA_TYPE_TO_BIOM_SPRITESHEET_NAME,
    AREA_TYPE_TO_POWER_CENTER_SPRITESHEET_NAME,
} from "./spritesheetNames";

export class TileRenderer {
    #tilePositionCalculator;
    #spritesheet;
    #reactionDisposers;

    constructor({ tilePositionCalculator, reactionDisposers }) {
        this.#tilePositionCalculator = tilePositionCalculator;
        this.#reactionDisposers = reactionDisposers;
    }

    setSpritesheet(spritesheet) {
        this.#spritesheet = spritesheet;
    }

    render(container, mapToRender) {
        const { matrix, regions } = mapToRender;

        for (const tilesRow of matrix) {
            for (const mapTile of tilesRow) {
                this.#setMapTileRenderPosition(mapTile);

                const tile = this.#getTile(mapTile);

                this.#devRegionRender(mapTile, tile, regions);

                container.addChild(tile);
            }
        }
    }

    #devRegionRender(mapTile, tile, regions) {
        if (mapTile.partRegion !== "none" && regions[mapTile.partRegion.regionIndex].tint) {
            tile.tint = regions[mapTile.partRegion.regionIndex].tint;
        }
    }

    #setMapTileRenderPosition(mapTile) {
        const tilePosition = this.#tilePositionCalculator.calc(mapTile);
        mapTile.renderPosition.x = tilePosition[0];
        mapTile.renderPosition.y = tilePosition[1];
    }

    #getTile(mapTile) {
        const tile = new Sprite();

        tile.zIndex = RENDERER_CONFIG.LAYERS.TILES;
        tile.x = mapTile.renderPosition.x;
        tile.y = mapTile.renderPosition.y;

        this.#setTileTexture(tile, mapTile);

        let remainedTicksTooltipToBuildAdded = false;
        const remainedTicksTooltipToBuild = this.#createRemainedTicksTooltip(tile);
        if (mapTile.globalBuilding.remainedTicksToBuild !== 0) {
            remainedTicksTooltipToBuild.text = mapTile.globalBuilding.remainedTicksToBuild.toString();
            remainedTicksTooltipToBuildAdded = true;
            tile.addChild(remainedTicksTooltipToBuild);
        }

        let remainedTicksTooltipToDestroyAdded = false;
        const remainedTicksTooltipToDestroy = this.#createRemainedTicksTooltip(tile, true);
        if (mapTile.globalBuilding.remainedTicksToDestroy !== 0) {
            remainedTicksTooltipToDestroy.text = mapTile.globalBuilding.remainedTicksToDestroy.toString();
            remainedTicksTooltipToDestroyAdded = true;
            tile.addChild(remainedTicksTooltipToDestroy);
        }

        let buildingStroke = null;

        this.#reactionDisposers.push(
            reaction(
                () => mapTile.globalBuilding.type,
                (type) => {
                    this.#setTileTexture(tile, mapTile);

                    if (type !== GLOBAL_BUILDING_TYPES.POWER_CENTER && buildingStroke) {
                        tile.removeChild(buildingStroke);
                        buildingStroke.destroy();
                        buildingStroke = null;
                    }
                }
            )
        );

        this.#reactionDisposers.push(
            reaction(
                () => mapTile.globalBuilding.remainedTicksToBuild,
                (remainedTicks) => {
                    if (remainedTicks === 0) {
                        remainedTicksTooltipToBuildAdded = false;
                        tile.removeChild(remainedTicksTooltipToBuild);

                        if (mapTile.globalBuilding.type === GLOBAL_BUILDING_TYPES.POWER_CENTER) {
                            buildingStroke = this.#createBuildingStroke();
                            tile.addChild(buildingStroke);
                        }
                    } else {
                        if (remainedTicksTooltipToBuildAdded === false) {
                            tile.addChild(remainedTicksTooltipToBuild);
                        }
                        remainedTicksTooltipToBuild.text = remainedTicks.toString();
                    }
                }
            )
        );

        this.#reactionDisposers.push(
            reaction(
                () => mapTile.globalBuilding.remainedTicksToDestroy,
                (remainedTicks) => {
                    if (remainedTicks === 0) {
                        remainedTicksTooltipToDestroyAdded = false;
                        tile.removeChild(remainedTicksTooltipToDestroy);
                    } else {
                        if (remainedTicksTooltipToDestroyAdded === false) {
                            tile.addChild(remainedTicksTooltipToBuild);
                        }
                        remainedTicksTooltipToDestroy.text = remainedTicks.toString();
                    }
                }
            )
        );

        return tile;
    }

    #setTileTexture(tile, mapTile) {
        const textureName = this.#getTextureName(mapTile);
        tile.texture = this.#spritesheet.textures[textureName];
    }

    #getTextureName = (mapTile) => {
        if (mapTile.tileType === null) {
            return SPRITESHEET_BIOM_NAMES.EMPTY;
        }
        if (mapTile.tileType === tileTypes.LAND && mapTile.biomType !== biomTypes.NONE) {
            if (mapTile.globalBuilding.type === GLOBAL_BUILDING_TYPES.OUTER_BUILDING) {
                return SPRITESHEET_FARM_NAMES.PLATEAU;
            }

            if (mapTile.areaType === areaTypes.MOUNTAIN) {
                return SPRITESHEET_BIOM_NAMES.MOUNTAIN;
            }

            if (mapTile.globalBuilding.type === GLOBAL_BUILDING_TYPES.POWER_CENTER) {
                return AREA_TYPE_TO_POWER_CENTER_SPRITESHEET_NAME[mapTile.areaType][mapTile.biomType];
            }

            return AREA_TYPE_TO_BIOM_SPRITESHEET_NAME[mapTile.areaType][mapTile.biomType];
        }

        return SPRITESHEET_BIOM_NAMES.WATER;
    };

    #createBuildingStroke() {
        const texture = this.#spritesheet.textures[SPRITESHEET_UNSORTED_NAMES.GLOBAL_BUILDING_STROKE];
        const buildingStroke = new Sprite(texture);
        buildingStroke.tint = 0x000;
        return buildingStroke;
    }

    #createRemainedTicksTooltip(tile, toDestroy = false) {
        const color = toDestroy
            ? RENDERER_CONFIG.REMAINED_TICKS_TOOLTIP.TO_DESTROY_COLOR
            : RENDERER_CONFIG.REMAINED_TICKS_TOOLTIP.TO_BUILD_COLOR;

        const style = new TextStyle({
            fontFamily: "Arial",
            fontSize: 18,
            fontWeight: "bold",
            fill: color,
            stroke: "#000",
            strokeThickness: 2,
        });

        const remainedTicksTooltip = new Text("", style);
        remainedTicksTooltip.x = tile.width / 2 - remainedTicksTooltip.width / 2;
        remainedTicksTooltip.y = tile.height / 2 - remainedTicksTooltip.height / 2;

        return remainedTicksTooltip;
    }
}
