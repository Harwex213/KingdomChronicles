import { biomTypes } from "models/map";
import { Player } from "models/game/player";
import { PLAYER_VALUES, POWER_CENTER_VALUES, ROAD_VALUES } from "../../constants/game";

const createPlayer = (playerInfo, playerIndex) => {
    const player = new Player();

    player.index = playerIndex;

    player.info = { ...playerInfo };
    player.info.color = parseInt(player.info.color.substring(1), 16);

    player.economic.treasure = PLAYER_VALUES.INITIAL_TREASURE;

    player.currentBuildingsCost.road = ROAD_VALUES.COST;
    player.currentBuildingsCost.powerCenter = POWER_CENTER_VALUES.INITIAL_COST;

    return player;
};

const getPlayerInitialRegion = ({ randomizer, regions, acceptableForPlacementRegionsIndices }) => {
    const randomizedIndex = randomizer.getRangedRandom(acceptableForPlacementRegionsIndices.length - 1);
    const chosenRegionIndex = acceptableForPlacementRegionsIndices[randomizedIndex];
    acceptableForPlacementRegionsIndices.splice(randomizedIndex, 1);
    return regions[chosenRegionIndex];
};

const assignRegionToPlayer = (region, player) => {
    player.domain.regions.push(region.index);
    region.ownerIndex = player.index;
    region.borderColor = player.info.color;
};

const placePlayers = ({ randomizer, gameState, playersInfo }) => {
    const { map } = gameState;

    const acceptableForPlacementRegionsIndices = map.landRegions.filter(
        (regionIndex) => map.regions[regionIndex].biomType !== biomTypes.DESERT
    );

    for (let i = 0; i < playersInfo.length; i++) {
        const playerInfo = playersInfo[i];

        const player = createPlayer(playerInfo);
        gameState.players.push(player);

        const playerInitialRegion = getPlayerInitialRegion({
            randomizer,
            regions: map.regions,
            acceptableForPlacementRegionsIndices,
        });

        assignRegionToPlayer(playerInitialRegion, player);
    }
};

export { placePlayers };
