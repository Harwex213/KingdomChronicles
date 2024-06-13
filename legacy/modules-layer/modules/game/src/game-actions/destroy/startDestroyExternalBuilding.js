import { GAME_VALIDATIONS } from "shared/enums";
import { destroyExternalBuilding } from "../../utils";

const startDestroyExternalBuilding = ({ gameState, gameValidator, playerIndex, row, col }) => {
    if (
        gameValidator.validate(GAME_VALIDATIONS.CAN_DESTROY_PLACED_EXTERNAL_BUILDING, {
            playerIndex,
            row,
            col,
        }) === false
    ) {
        return;
    }

    const mapTile = gameState.map.matrix[row][col];
    const externalBuilding = gameState.externalBuildings[mapTile.globalBuilding.id];

    destroyExternalBuilding(gameState, externalBuilding);
};

export { startDestroyExternalBuilding };
