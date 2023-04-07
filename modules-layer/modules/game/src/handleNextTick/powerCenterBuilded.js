import { PowerCenter } from "models/game";
import { generateRandomId } from "../utils";

const powerCenterBuilded = ({ gameState, row, col }) => {
    const mapTile = gameState.map.matrix[row][col];
    const mapRegion = gameState.map.regions[mapTile.partRegion.regionIndex];

    // TODO: Generate control Area of power center

    const powerCenter = new PowerCenter({
        id: generateRandomId(),
        ownerIndex: mapRegion.ownerIndex,
        row,
        col,
    });

    gameState.powerCenters[powerCenter.id] = powerCenter;
    mapTile.onBuiltGlobalBuilding(powerCenter.id);
};

export { powerCenterBuilded };
