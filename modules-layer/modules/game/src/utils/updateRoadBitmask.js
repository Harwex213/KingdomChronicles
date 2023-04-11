const updateRoadBitmask = (gameState, roadMapTile) => {
    roadMapTile.setRoadBitmask(roadMapTile.getRoadBitmask(gameState));

    const mapTileNeighbors = roadMapTile.getNeighbors(gameState.map);
    for (const mapTileNeighbor of mapTileNeighbors) {
        mapTileNeighbor.setRoadBitmask(mapTileNeighbor.getRoadBitmask(gameState));
    }
};

export { updateRoadBitmask };
