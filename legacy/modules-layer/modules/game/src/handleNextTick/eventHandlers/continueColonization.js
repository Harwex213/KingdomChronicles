import { PLAYER_VALUES } from "shared/constants";

const addColonizationProgress = (gameState) => {
    const affectedRegions = new Set();
    let region;
    let colonizationProgress;

    for (const player of gameState.players) {
        for (const currentColonizationRegionIndex of player.currentColonizationRegionIndexes) {
            region = gameState.map.regions[currentColonizationRegionIndex];
            colonizationProgress =
                region.playerColonistsAmount[player.index] *
                PLAYER_VALUES.ONE_COLONIST_COLONIZATION_PROGRESS_PER_TICK;

            region.addColonizationProgress(player.index, colonizationProgress);
            affectedRegions.add(region);
        }
    }

    return affectedRegions;
};

const tryFindColonizationWinners = (gameState, regions, onWin) => {
    let colonizationProgressCache;
    let colonizationLeader;
    let isAbsoluteLeader = false;
    let colonizationWinner;
    for (const region of regions) {
        colonizationProgressCache = [...region.colonizationProgress];
        colonizationProgressCache.sort((a, b) => a.progress - b.progress);

        colonizationLeader = colonizationProgressCache[0];
        if (colonizationLeader.progress >= region.colonizationMinWeight) {
            isAbsoluteLeader = colonizationLeader.progress !== colonizationProgressCache[1].progress;
            if (isAbsoluteLeader) {
                colonizationWinner = gameState.players[colonizationLeader.playerIndex];
                onWin(colonizationWinner, region);
            }
        }
    }
};

const continueColonization = (gameState) => {
    const affectedRegions = addColonizationProgress(gameState);
    tryFindColonizationWinners(gameState, affectedRegions, (winner, region) => {
        region.assignOwner(winner);
        winner.addRegion(region);
    });
};

export { continueColonization };
