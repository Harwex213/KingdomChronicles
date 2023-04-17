const updateRoadBitmask = (gameState, roadMapTile) => {
    if (roadMapTile.hasRoad) {
        roadMapTile.setRoadBitmask(roadMapTile.getRoadBitmask(gameState));
    }

    const mapTileNeighbors = roadMapTile.getNeighbors(gameState.map);
    for (const mapTileNeighbor of mapTileNeighbors) {
        if (mapTileNeighbor.hasRoad) {
            mapTileNeighbor.setRoadBitmask(mapTileNeighbor.getRoadBitmask(gameState));
        }
    }
};

export { updateRoadBitmask };
