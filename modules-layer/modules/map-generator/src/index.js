import { Map, tileTypes, MapRegion } from "models/map";
import { MAP_SIZE_DIMENSIONS, REGION_SIZES } from "../constants";
import { defineRegionsType } from "./defineRegionsType";
import { defineRegionsBiom } from "./defineRegionsBiom";
import { defineElevation } from "./defineElevation";
import { defineFlora } from "./defineFlora";

class MapGenerationConfig {
    mapSizeType = null;
    randomizer = null;
}

const generateMap = (mapGenerationConfig) => {
    const randomizer = mapGenerationConfig.randomizer;
    const mapSizes = MAP_SIZE_DIMENSIONS[mapGenerationConfig.mapSizeType];
    const centerPoint = [0, 0];
    const minRegionSize = REGION_SIZES.MIN;
    const maxRegionSize = REGION_SIZES.MAX;

    const map = new Map(mapSizes.width, mapSizes.height);
    const tilesWithoutRegion = [];
    const tilesForRegionsLeft = [];
    map.matrix.forEach((height) => {
        height.forEach((tile) => {
            tilesForRegionsLeft.push(`${tile.row}-${tile.col}`);
        });
    });
    const coasts = {
        coastsArray: [],
        addCoast(tile) {
            this.coastsArray.push(`${tile[0]}-${tile[1]}`);
        },
        removeCoast(tile) {
            this.coastsArray.splice(this.coastsArray.indexOf(`${tile[0]}-${tile[1]}`), 1);
        },
        randomCoast() {
            return this.coastsArray[randomizer.getRangedRandom(this.coastsArray.length - 1)].split("-");
        },
        isCoast(tile) {
            return this.coastsArray.includes(`${tile[0]}-${tile[1]}`);
        },
        clearCoasts() {
            this.coastsArray.length = 0;
        },
    };
    const assignedForRegion = {
        tilesForRegion: [],
        addTile(tile) {
            this.tilesForRegion.push([tile[0], tile[1]]);
        },
        sendTilesToRegion(region) {
            this.tilesForRegion.forEach((tile) => {
                map.matrix[tile[0]][tile[1]].addRegionToMapTile(map.regions[region], region);
                tilesForRegionsLeft.splice(tilesForRegionsLeft.indexOf(`${tile[0]}-${tile[1]}`), 1);
                map.matrix[tile[0]][tile[1]].tileType = tileTypes.LAND;
            });
        },
        clearTilesForRegion() {
            this.tilesForRegion.length = 0;
        },
        isAssignedTile(tile) {
            let isAssigned = false;

            this.tilesForRegion.forEach((assignedTile) => {
                if (JSON.stringify(tile) === JSON.stringify(assignedTile)) {
                    isAssigned = true;
                }
            });

            return isAssigned;
        },
    };
    const potentialRegionTiles = {
        potentialRegionTilesArray: [],
        randomPotentialTile() {
            return this.potentialRegionTilesArray[
                randomizer.getRangedRandom(this.potentialRegionTilesArray.length - 1)
            ].split("-");
        },
        removePotentialTile(tile) {
            this.potentialRegionTilesArray.splice(
                this.potentialRegionTilesArray.indexOf(`${tile[0]}-${tile[1]}`),
                1
            );
        },
        isPotentialTile(tile) {
            return this.potentialRegionTilesArray.includes(`${tile[0]}-${tile[1]}`);
        },
    };
    const tileTypeCoast = (point) => {
        Object.keys(map.matrix[point[0]][point[1]].neighboringTiles).forEach((direction) => {
            const tileDirection = map.matrix[point[0]][point[1]].neighboringTiles[direction];

            if (
                tileDirection !== "none" &&
                map.matrix[tileDirection[0]][tileDirection[1]].tileType !== tileTypes.LAND &&
                !coasts.isCoast(tileDirection) &&
                !assignedForRegion.isAssignedTile(tileDirection) &&
                !potentialRegionTiles.isPotentialTile(tileDirection)
            ) {
                coasts.addCoast(tileDirection);
            }
        });
    };

    noNextTile: for (let region = 0; tilesForRegionsLeft.length !== 0; region++) {
        const regionSize = randomizer.getRangedRandom(maxRegionSize, minRegionSize);
        coasts.addCoast(centerPoint);

        for (let tile = 0; tile < regionSize; tile++) {
            if (
                tile + coasts.coastsArray.length < regionSize &&
                potentialRegionTiles.potentialRegionTilesArray.length === 0
            ) {
                potentialRegionTiles.potentialRegionTilesArray = coasts.coastsArray;
                coasts.coastsArray = [];
            }
            if (potentialRegionTiles.potentialRegionTilesArray.length === 0) {
                if (coasts.coastsArray.length === 0) {
                    if (assignedForRegion.tilesForRegion.length >= minRegionSize) {
                        break;
                    }
                    assignedForRegion.tilesForRegion.forEach((tile) => {
                        tilesWithoutRegion.push([tile[0], tile[1]]);
                        tilesForRegionsLeft.splice(tilesForRegionsLeft.indexOf(`${tile[0]}-${tile[1]}`), 1);
                    });
                    assignedForRegion.clearTilesForRegion();
                    tile = 0;
                    if (tilesForRegionsLeft.length === 0) {
                        break noNextTile;
                    }

                    const nextTile = tilesForRegionsLeft[0].split("-");
                    centerPoint[0] = +nextTile[0];
                    centerPoint[1] = +nextTile[1];
                } else {
                    const coast = coasts.randomCoast();
                    centerPoint[0] = +coast[0];
                    centerPoint[1] = +coast[1];
                    coasts.removeCoast(coast);
                }
            } else {
                const potentialRegionTile = potentialRegionTiles.randomPotentialTile();
                centerPoint[0] = +potentialRegionTile[0];
                centerPoint[1] = +potentialRegionTile[1];
                potentialRegionTiles.removePotentialTile(potentialRegionTile);
            }

            tileTypeCoast(centerPoint);
            assignedForRegion.addTile(centerPoint);
        }

        map.regions.push(new MapRegion());
        assignedForRegion.sendTilesToRegion(region);
        if (tilesForRegionsLeft.length === 0) {
            break;
        }
        const nextTile = tilesForRegionsLeft[0].split("-");
        centerPoint[0] = +nextTile[0];
        centerPoint[1] = +nextTile[1];
        assignedForRegion.clearTilesForRegion();
        coasts.clearCoasts();
    }

    const getIndexesNeighboringRegions = (tile, condition) => {
        const neighboringRegions = [];

        Object.keys(map.matrix[tile[0]][tile[1]].neighboringTiles).forEach((direction) => {
            const tileDirection = map.matrix[tile[0]][tile[1]].neighboringTiles[direction];

            if (condition(tileDirection)) {
                neighboringRegions.push(
                    map.matrix[tileDirection[0]][tileDirection[1]].partRegion.regionIndex
                );
            }
        });

        return Array.from(new Set(neighboringRegions));
    };

    tilesWithoutRegion.forEach((tile) => {
        map.matrix[tile[0]][tile[1]].tileType = tileTypes.LAND;
        const neighboringRegions = getIndexesNeighboringRegions(
            tile,
            (tileDirection) =>
                tileDirection !== "none" &&
                map.matrix[tileDirection[0]][tileDirection[1]].partRegion !== "none"
        );
        const chosenRegionIndex =
            neighboringRegions[randomizer.getRangedRandom(neighboringRegions.length - 1)];

        map.matrix[tile[0]][tile[1]].addRegionToMapTile(map.regions[chosenRegionIndex], chosenRegionIndex);
    });

    const addIndicesNeighboringRegions = (tile, currentRegionIndex) => {
        const neighboringRegions = getIndexesNeighboringRegions(
            tile,
            (tileDirection) =>
                tileDirection !== "none" &&
                map.matrix[tileDirection[0]][tileDirection[1]].partRegion.regionIndex !== currentRegionIndex
        );

        neighboringRegions.forEach((indexNeighboringRegion) => {
            if (!map.regions[currentRegionIndex].indicesNeighboringRegions.includes(indexNeighboringRegion)) {
                map.regions[currentRegionIndex].indicesNeighboringRegions.push(indexNeighboringRegion);
            }
        });
    };
    const addNeighboringTilesRegion = (tile, currentRegionIndex) => {
        Object.assign(
            map.matrix[tile[0]][tile[1]].neighboringTilesRegion,
            map.matrix[tile[0]][tile[1]].neighboringTiles
        );
        Object.keys(map.matrix[tile[0]][tile[1]].neighboringTilesRegion).forEach((direction) => {
            const tileDirection = map.matrix[tile[0]][tile[1]].neighboringTiles[direction];

            if (
                tileDirection !== "none" &&
                map.matrix[tileDirection[0]][tileDirection[1]].partRegion.regionIndex !== currentRegionIndex
            ) {
                map.matrix[tile[0]][tile[1]].neighboringTilesRegion[direction] = "none";
            }
        });
    };

    map.regions.forEach((region, currentRegionIndex) => {
        region.tilesRegion.forEach((tile) => {
            addIndicesNeighboringRegions(tile, currentRegionIndex);
            addNeighboringTilesRegion(tile, currentRegionIndex);
        });
    });

    const getBorderingTilesToRegion = (initialRegionIndex, targetRegionIndex) => {
        const borderingTilesToRegion = [];
        map.regions[initialRegionIndex].tilesRegion.forEach((tile) => {
            for (const direction in map.matrix[tile[0]][tile[1]].neighboringTilesRegion) {
                const tileDirection = map.matrix[tile[0]][tile[1]].neighboringTiles[direction];

                if (
                    tileDirection !== "none" &&
                    map.matrix[tileDirection[0]][tileDirection[1]].partRegion.regionIndex ===
                        targetRegionIndex
                ) {
                    borderingTilesToRegion.push([tile[0], tile[1]]);
                    break;
                }
            }
        });

        return borderingTilesToRegion;
    };
    const isGapRegion = (tile, region) => {
        const copyTilesRegion = [];
        Object.assign(copyTilesRegion, region.tilesRegion);
        copyTilesRegion.splice(
            copyTilesRegion.indexOf(
                copyTilesRegion.find((copyTile) => JSON.stringify(tile) === JSON.stringify(copyTile))
            ),
            1
        );
        const chosenTile = copyTilesRegion[randomizer.getRangedRandom(copyTilesRegion.length - 1)];
        const countedTiles = [chosenTile];
        const isCountedTile = (tileDirection) => {
            let isCounted = false;

            countedTiles.forEach((countedTile) => {
                if (JSON.stringify(tileDirection) === JSON.stringify(countedTile)) {
                    isCounted = true;
                }
            });

            return isCounted;
        };
        const containerAddedTiles = { saveNumber: 1, currentNumber: 0 };
        while (countedTiles.length !== copyTilesRegion.length) {
            const oldSizeCountedTiles = countedTiles.length;
            countedTiles
                .slice(countedTiles.length - containerAddedTiles.saveNumber)
                .forEach((countedTile) => {
                    Object.keys(map.matrix[countedTile[0]][countedTile[1]].neighboringTilesRegion).forEach(
                        (direction) => {
                            const tileDirection =
                                map.matrix[countedTile[0]][countedTile[1]].neighboringTilesRegion[direction];

                            if (
                                tileDirection !== "none" &&
                                !isCountedTile(tileDirection) &&
                                JSON.stringify(tileDirection) !== JSON.stringify(tile)
                            ) {
                                countedTiles.push([tileDirection[0], tileDirection[1]]);
                                containerAddedTiles.currentNumber++;
                            }
                        }
                    );
                });

            if (oldSizeCountedTiles === countedTiles.length) {
                break;
            }

            containerAddedTiles.saveNumber = containerAddedTiles.currentNumber;
            containerAddedTiles.currentNumber = 0;
        }

        return countedTiles.length !== copyTilesRegion.length;
    };
    const recursivelyResizeRegions = (targetRegionIndex) => {
        while (map.regions[targetRegionIndex].tilesRegion.length !== maxRegionSize) {
            const neighboringRegionsSmallerMaxSize = [];
            map.regions[targetRegionIndex].indicesNeighboringRegions.forEach((regionIndex) => {
                if (map.regions[regionIndex].tilesRegion.length < maxRegionSize) {
                    neighboringRegionsSmallerMaxSize.push(regionIndex);
                }
            });
            const chosenRegionIndex =
                neighboringRegionsSmallerMaxSize.length === 0
                    ? map.regions[targetRegionIndex].indicesNeighboringRegions[
                          randomizer.getRangedRandom(
                              map.regions[targetRegionIndex].indicesNeighboringRegions.length - 1
                          )
                      ]
                    : neighboringRegionsSmallerMaxSize[
                          randomizer.getRangedRandom(neighboringRegionsSmallerMaxSize.length - 1)
                      ];
            const condition =
                neighboringRegionsSmallerMaxSize.length === 0
                    ? () =>
                          map.regions[targetRegionIndex].tilesRegion.length !== maxRegionSize &&
                          borderingTilesToRegion.length !== 0
                    : () =>
                          map.regions[chosenRegionIndex].tilesRegion.length !== maxRegionSize &&
                          map.regions[targetRegionIndex].tilesRegion.length !== maxRegionSize &&
                          borderingTilesToRegion.length !== 0;
            const borderingTilesToRegion = getBorderingTilesToRegion(targetRegionIndex, chosenRegionIndex);
            while (condition()) {
                const chosenIndex = randomizer.getRangedRandom(borderingTilesToRegion.length - 1);
                const chosenTile = borderingTilesToRegion[chosenIndex];
                borderingTilesToRegion.splice(chosenIndex, 1);

                if (!isGapRegion(chosenTile, map.regions[targetRegionIndex])) {
                    for (const direction in map.matrix[chosenTile[0]][chosenTile[1]].neighboringTilesRegion) {
                        const tileDirection =
                            map.matrix[chosenTile[0]][chosenTile[1]].neighboringTilesRegion[direction];
                        const isBorderTile = borderingTilesToRegion.findIndex(
                            (tile) => JSON.stringify(tile) === JSON.stringify(tileDirection)
                        );

                        if (tileDirection !== "none" && isBorderTile === -1) {
                            borderingTilesToRegion.push([tileDirection[0], tileDirection[1]]);
                        }
                    }
                    map.matrix[chosenTile[0]][chosenTile[1]].addRegionToMapTile(
                        map.regions[chosenRegionIndex],
                        chosenRegionIndex
                    );
                    map.regions[targetRegionIndex].tilesRegion.splice(
                        map.regions[targetRegionIndex].tilesRegion.indexOf(
                            map.regions[targetRegionIndex].tilesRegion.find(
                                (tile) => JSON.stringify(tile) === JSON.stringify(chosenTile)
                            )
                        ),
                        1
                    );
                    const oldIndicesNeighboringRegions =
                        map.regions[targetRegionIndex].indicesNeighboringRegions;
                    map.regions[targetRegionIndex].indicesNeighboringRegions = [];
                    map.regions[targetRegionIndex].tilesRegion.forEach((tile) => {
                        addIndicesNeighboringRegions(tile, targetRegionIndex);
                    });
                    if (
                        oldIndicesNeighboringRegions.length !==
                        map.regions[targetRegionIndex].indicesNeighboringRegions.length
                    ) {
                        oldIndicesNeighboringRegions.forEach((index) => {
                            if (!map.regions[targetRegionIndex].indicesNeighboringRegions.includes(index)) {
                                map.regions[index].indicesNeighboringRegions.splice(
                                    map.regions[index].indicesNeighboringRegions.indexOf(targetRegionIndex),
                                    1
                                );
                            }
                        });
                    }
                    const chosenOldIndicesNeighboringRegions = [];
                    Object.assign(
                        chosenOldIndicesNeighboringRegions,
                        map.regions[chosenRegionIndex].indicesNeighboringRegions
                    );
                    addIndicesNeighboringRegions(chosenTile, chosenRegionIndex);
                    if (
                        chosenOldIndicesNeighboringRegions.length !==
                        map.regions[chosenRegionIndex].indicesNeighboringRegions.length
                    ) {
                        const newIndices = map.regions[chosenRegionIndex].indicesNeighboringRegions.slice(
                            chosenOldIndicesNeighboringRegions.length
                        );
                        newIndices.forEach((index) => {
                            map.regions[index].indicesNeighboringRegions.push(chosenRegionIndex);
                        });
                    }
                    const updateDirectionsNeighboringTiles = (regionIndex) => {
                        for (const direction in map.matrix[chosenTile[0]][chosenTile[1]]
                            .neighboringTilesRegion) {
                            const tileDirection =
                                map.matrix[chosenTile[0]][chosenTile[1]].neighboringTilesRegion[direction];

                            if (tileDirection !== "none") {
                                addNeighboringTilesRegion(tileDirection, regionIndex);
                            }
                        }
                    };

                    updateDirectionsNeighboringTiles(targetRegionIndex);
                    addNeighboringTilesRegion(chosenTile, chosenRegionIndex);
                    updateDirectionsNeighboringTiles(chosenRegionIndex);
                }
            }
        }
    };
    const regionSizes = {
        arrayRegionSizes: [],
        isRegionLargerMaxSize() {
            this.arrayRegionSizes = map.regions.map((region) => region.tilesRegion.length);
            return this.arrayRegionSizes.find((size) => size > maxRegionSize);
        },
        getRegionLargerMaxSize() {
            return this.arrayRegionSizes.indexOf(this.arrayRegionSizes.find((size) => size > maxRegionSize));
        },
    };

    while (regionSizes.isRegionLargerMaxSize()) {
        const chosenRegionIndex = regionSizes.getRegionLargerMaxSize();
        recursivelyResizeRegions(chosenRegionIndex);
    }

    defineRegionsType(map);
    defineRegionsBiom(map, randomizer);
    defineElevation(map, randomizer);
    defineFlora(map, randomizer);

    return map;
};

export { generateMap, MapGenerationConfig };
