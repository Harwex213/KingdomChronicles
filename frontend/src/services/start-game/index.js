import { SERVER_METHODS } from "./config";
import { connection, startGameConnector, searchGameModel, pendingStartGameModel } from "./init";
import "./eventHandlers";
import { makeGlobalCatchError } from "./makeGlobalCatchError";

const startGameService = {};

startGameService.sendChatMessage = async (message) => {
    await connection.invoke(SERVER_METHODS.SEND_MESSAGE, message);
};

startGameService.createGame = async (game) => {
    game.mapGenerationConfig = "there will be serialized config";
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

makeGlobalCatchError(startGameService);

export { startGameConnector, startGameService, searchGameModel, pendingStartGameModel };
