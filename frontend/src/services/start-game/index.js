import { SERVER_METHODS } from "./config";
import { connection, startGameConnector, searchGameModel, pendingStartGameModel } from "./init";
import "./eventHandlers";
import { globallyCatchHubException } from "../globallyCatchHubException";
import { generateRandomString } from "../../common/utils";
import { MAP_SIZE_TYPES } from "shared/enums";

const startGameService = {};

startGameService.sendChatMessage = async (message) => {
    await connection.invoke(SERVER_METHODS.SEND_MESSAGE, message);
};

startGameService.createGame = async (game) => {
    game.mapGenerationConfig = JSON.stringify({
        randomSeed: generateRandomString(10),
        mapSizeType: MAP_SIZE_TYPES.SMALL,
    });
    await connection.invoke(SERVER_METHODS.CREATE_GAME, game);
};

startGameService.joinGame = async (gameId) => {
    await connection.invoke(SERVER_METHODS.JOIN_GAME, gameId);
};

startGameService.leaveFromGame = async () => {
    await connection.invoke(SERVER_METHODS.LEAVE_FROM_GAME);
};

startGameService.readyForGame = async () => {
    await connection.invoke(SERVER_METHODS.READY_FOR_GAME);
};

startGameService.notReadyForGame = async () => {
    await connection.invoke(SERVER_METHODS.NOT_READY_FOR_GAME);
};

startGameService.startGame = async () => {
    await connection.invoke(SERVER_METHODS.START_GAME);
};

startGameService.updateMapGenerationConfig = async (newConfig) => {
    await connection.invoke(SERVER_METHODS.UPDATE_MAP_GENERATION_CONFIG, JSON.stringify(newConfig));
};

startGameService.editUserProfile = async (editUserProfile) => {
    await connection.invoke(SERVER_METHODS.EDIT_USER_PROFILE, editUserProfile);
};

globallyCatchHubException(startGameService);

export { startGameConnector, startGameService, searchGameModel, pendingStartGameModel };
