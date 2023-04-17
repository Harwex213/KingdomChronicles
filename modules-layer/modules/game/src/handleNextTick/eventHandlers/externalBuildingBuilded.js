import { ExternalBuilding } from "shared/models";

const externalBuildingBuilded = (gameState, pendingBuildGlobalBuilding) => {
    const mapTile = pendingBuildGlobalBuilding.getTile(gameState.map);
    const powerCenter = gameState.powerCenters[pendingBuildGlobalBuilding.externalBuilding.powerCenterId];

    const externalBuilding = new ExternalBuilding({
        id: pendingBuildGlobalBuilding.id,
        powerCenterId: powerCenter.id,
        typeName: pendingBuildGlobalBuilding.externalBuilding.typeName,
        row: mapTile.row,
        col: mapTile.col,
    });

    powerCenter.onExternalBuildingBuilded(externalBuilding);
    gameState.players[powerCenter.ownerIndex].onExternalBuildingBuilded(externalBuilding);
    gameState.externalBuildings[externalBuilding.id] = externalBuilding;
};

export { externalBuildingBuilded };
