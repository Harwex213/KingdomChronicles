import { biomTypes } from "models/map";
import { Player } from "models/game/player/player";
import { PLAYER_VALUES } from "models/game-variables";

const createPlayer = (playerInfo, playerIndex) => {
    const player = new Player();

    player.index = playerIndex;

    player.info = { ...playerInfo };
    player.info.colorStr = player.info.color;
    player.info.color = parseInt(player.info.color.substring(1), 16);

    player.economic.treasure = PLAYER_VALUES.INITIAL_TREASURE;

    return player;
};

const getPlayerInitialRegion = ({ randomizer, regions, acceptableForPlacementRegionsIndices }) => {
    const randomizedIndex = randomizer.getRangedRandom(acceptableForPlacementRegionsIndices.length - 1);
    const chosenRegionIndex = acceptableForPlacementRegionsIndices[randomizedIndex];
    acceptableForPlacementRegionsIndices.splice(randomizedIndex, 1);
    return regions[chosenRegionIndex];
};

const placePlayers = ({ randomizer, gameState, playersInfo }) => {
    const { map } = gameState;

    const acceptableForPlacementRegionsIndices = map.landRegions.filter(
        (regionIndex) => map.regions[regionIndex].biomType !== biomTypes.DESERT
    );

    for (let i = 0; i < playersInfo.length; i++) {
        const playerInfo = playersInfo[i];

        const player = createPlayer(playerInfo, i);
        gameState.players.push(player);

        const playerInitialRegion = getPlayerInitialRegion({
            randomizer,
            regions: map.regions,
            acceptableForPlacementRegionsIndices,
        });

        player.addRegion(playerInitialRegion);
    }
};

export { placePlayers };
