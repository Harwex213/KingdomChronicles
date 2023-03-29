import { SERVER_METHODS } from "./config";
import { connection, gameConnector, startedGameModel } from "./init";
import "./eventHandlers";
import { globallyCatchHubException } from "../globallyCatchHubException";

const gameService = {};

gameService.sendChatMessage = async (message) => {
    await connection.invoke(SERVER_METHODS.SEND_MESSAGE, message);
};

globallyCatchHubException(gameService);

export { gameConnector, gameService, startedGameModel };
