import { Sprite, Text, TextStyle } from "pixi.js";
import { reaction } from "mobx";
import {
    AREA_TYPES,
    BIOM_TYPES,
    TILE_TYPES,
    GLOBAL_BUILDING_TYPES,
    EXTERNAL_BUILDING_TYPE_NAMES,
} from "shared/enums";
import { RENDERER_CONFIG, SPRITESHEET_BIOM_NAMES, SPRITESHEET_STONE_QUARRY_NAME } from "../constants.js";
import {
    AREA_TYPE_TO_BIOM_SPRITESHEET_NAME,
    AREA_TYPE_TO_FARM_SPRITESHEET_NAME,
    AREA_TYPE_TO_POWER_CENTER_SPRITESHEET_NAME,
    AREA_TYPE_TO_SAWMILL_NAME,
    AREA_TYPE_TO_WOODCUTTER_SPRITESHEET_NAME,
    toRoadSpritesheetName,
} from "./spritesheetNames";

const ROAD_INDEX = 0;

export class TileRenderer {
    #tilePositionCalculator;
    #spritesheet;
    #reactionDisposers;
    #container;

    constructor({ tilePositionCalculator }) {
        this.#tilePositionCalculator = tilePositionCalculator;
        this.#reactionDisposers = [];
    }

    setSpritesheet(spritesheet) {
        this.#spritesheet = spritesheet;
    }

    render(container, mapToRender) {
        this.#container = container;
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

    clean() {
        for (const reactionDisposer of this.#reactionDisposers) {
            reactionDisposer();
        }
        this.#reactionDisposers.splice(0, this.#reactionDisposers.length);
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

        tile.addChild(new Sprite());
        if (mapTile.globalBuilding.roadBitmask !== null) {
            const roadTextureName = toRoadSpritesheetName(mapTile.globalBuilding.roadBitmask);
            tile.children[ROAD_INDEX].texture = this.#spritesheet.textures[roadTextureName];
        }

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

        this.#reactionDisposers.push(
            reaction(
                () => mapTile.globalBuilding.type,
                (type) => {
                    this.#setTileTexture(tile, mapTile);
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

        this.#reactionDisposers.push(
            reaction(
                () => mapTile.globalBuilding.roadBitmask,
                (roadBitmask) => {
                    const roadTextureName = toRoadSpritesheetName(roadBitmask);
                    tile.children[ROAD_INDEX].texture = this.#spritesheet.textures[roadTextureName];
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
        if (mapTile.tileType === TILE_TYPES.LAND && mapTile.biomType !== BIOM_TYPES.NONE) {
            if (mapTile.areaType === AREA_TYPES.MOUNTAIN) {
                return SPRITESHEET_BIOM_NAMES.MOUNTAIN;
            }

            if (mapTile.globalBuilding.type === GLOBAL_BUILDING_TYPES.POWER_CENTER) {
                return AREA_TYPE_TO_POWER_CENTER_SPRITESHEET_NAME[mapTile.areaType][mapTile.biomType];
            }

            if (mapTile.globalBuilding.type === GLOBAL_BUILDING_TYPES.EXTERNAL_BUILDING) {
                if (
                    mapTile.globalBuilding.externalBuildingTypeName ===
                    EXTERNAL_BUILDING_TYPE_NAMES.STONE_QUARRY
                ) {
                    return SPRITESHEET_STONE_QUARRY_NAME;
                }

                if (mapTile.globalBuilding.externalBuildingTypeName === EXTERNAL_BUILDING_TYPE_NAMES.FARM) {
                    return AREA_TYPE_TO_FARM_SPRITESHEET_NAME[mapTile.areaType];
                }

                if (
                    mapTile.globalBuilding.externalBuildingTypeName === EXTERNAL_BUILDING_TYPE_NAMES.SAWMILL
                ) {
                    return AREA_TYPE_TO_SAWMILL_NAME[mapTile.areaType][mapTile.biomType];
                }

                if (
                    mapTile.globalBuilding.externalBuildingTypeName ===
                    EXTERNAL_BUILDING_TYPE_NAMES.WOODCUTTER
                ) {
                    return AREA_TYPE_TO_WOODCUTTER_SPRITESHEET_NAME[mapTile.areaType][mapTile.biomType];
                }
            }

            return AREA_TYPE_TO_BIOM_SPRITESHEET_NAME[mapTile.areaType][mapTile.biomType];
        }

        return SPRITESHEET_BIOM_NAMES.WATER;
    };

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
