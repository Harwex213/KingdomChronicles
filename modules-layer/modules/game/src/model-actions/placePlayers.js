import { biomTypes } from "models/map";
import { Player } from "models/game/player/player";

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

        const player = new Player({
            index: i,
            info: {
                ...playerInfo,
                colorStr: playerInfo.color,
                color: parseInt(playerInfo.color.substring(1), 16),
            },
        });
        gameState.players.push(player);

        const playerInitialRegion = getPlayerInitialRegion({
            randomizer,
            regions: map.regions,
            acceptableForPlacementRegionsIndices,
        });

        player.addRegion(playerInitialRegion);
        playerInitialRegion.assignOwner(player);
    }
};

export { placePlayers };
