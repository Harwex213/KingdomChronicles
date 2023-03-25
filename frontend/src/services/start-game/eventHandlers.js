import { connection, pendingStartGameModel, searchGameModel, startGameConnector } from "./init";
import { NOT_IN_GAME_EVENTS, PENDING_START_GAME_EVENTS } from "./config";
import { playerState, searchGameState } from "../states";
import { PLAYER_STATES, SEARCH_GAME_STATES } from "../../common/constants/states";

connection.onclose((error) => {
    if (error) {
        startGameConnector.onTerminated();
    }
});

connection.on(NOT_IN_GAME_EVENTS.SHOULD_BE_IN_STARTED_GAME, async () => {
    startGameConnector.disconnect();
    playerState.setState(PLAYER_STATES.IN_GAME);
});
connection.on(NOT_IN_GAME_EVENTS.ABORT_EXISTED_CONNECTION, async () => {
    startGameConnector.abort();
});

connection.on(NOT_IN_GAME_EVENTS.CURRENT_PENDING_START_GAMES, async (games) => {
    games.sort((one, another) => new Date(one.created) - new Date(another.created));
    searchGameModel.setPendingStartGames(games);
});
connection.on(NOT_IN_GAME_EVENTS.GAME_CREATED, async (game) => {
    searchGameModel.addPendingStartGame(game);
});
connection.on(NOT_IN_GAME_EVENTS.GAME_UPDATED, async (game) => {
    searchGameModel.updatePendingStartGame(game);
});
connection.on(NOT_IN_GAME_EVENTS.GAME_DESTROYED, async (gameId) => {
    searchGameModel.removePendingStartGame(gameId);
});

connection.on(NOT_IN_GAME_EVENTS.NEW_CHAT_MESSAGE, async (chatMessage) => {
    searchGameModel.addChatMessage(chatMessage);
});

connection.on(PENDING_START_GAME_EVENTS.CREATED_GAME, async (game) => {
    searchGameModel.clearChat();
    pendingStartGameModel.setGameInfo(game);
    searchGameState.setState(SEARCH_GAME_STATES.IN_PENDING_START_GAME);
});
connection.on(PENDING_START_GAME_EVENTS.JOINED_TO_GAME, async (game) => {
    searchGameModel.clearChat();
    pendingStartGameModel.setGameInfo(game);
    searchGameState.setState(SEARCH_GAME_STATES.IN_PENDING_START_GAME);
});
connection.on(PENDING_START_GAME_EVENTS.LEAVED_FROM_GAME, async () => {
    pendingStartGameModel.clearGameInfo();
    searchGameState.setState(SEARCH_GAME_STATES.IDLE);
});

connection.on(PENDING_START_GAME_EVENTS.PLAYER_JOINED, async (game) => {
    pendingStartGameModel.setGameInfo(game);
});
connection.on(PENDING_START_GAME_EVENTS.PLAYER_LEAVED, async (game) => {
    pendingStartGameModel.setGameInfo(game);
});
connection.on(PENDING_START_GAME_EVENTS.PLAYER_CHANGE_READY_STATUS, async (newReadyStatus) => {
    pendingStartGameModel.changePlayerReadyStatus(newReadyStatus);
});

connection.on(PENDING_START_GAME_EVENTS.NEW_CHAT_MESSAGE, async (chatMessage) => {
    pendingStartGameModel.addChatMessage(chatMessage);
});
