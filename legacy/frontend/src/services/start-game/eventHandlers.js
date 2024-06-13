import { connection, pendingStartGameModel, searchGameModel, startGameConnector } from "./init";
import { NOT_IN_GAME_EVENTS, PENDING_START_GAME_EVENTS, USER_PROFILE_EVENTS } from "./config";
import { playerState, searchGameState } from "../states";
import { PLAYER_STATES, SEARCH_GAME_STATES } from "../../common/constants/states";
import { userProfile } from "../loaders/userProfileLoader";

connection.onclose((error) => {
    if (error) {
        startGameConnector.onTerminated();
    }
});

connection.on(NOT_IN_GAME_EVENTS.SHOULD_BE_IN_STARTED_GAME, () => {
    playerState.setState(PLAYER_STATES.IN_GAME);
    startGameConnector.disconnect();
});
connection.on(NOT_IN_GAME_EVENTS.ABORT_EXISTED_CONNECTION, () => {
    startGameConnector.abort();
});

connection.on(NOT_IN_GAME_EVENTS.CURRENT_PENDING_START_GAMES, (games) => {
    games.sort((one, another) => new Date(one.created) - new Date(another.created));
    searchGameModel.setPendingStartGames(games);
});
connection.on(NOT_IN_GAME_EVENTS.GAME_CREATED, (game) => {
    searchGameModel.addPendingStartGame(game);
});
connection.on(NOT_IN_GAME_EVENTS.GAME_UPDATED, (game) => {
    searchGameModel.updatePendingStartGame(game);
});
connection.on(NOT_IN_GAME_EVENTS.GAME_DESTROYED, (gameId) => {
    searchGameModel.removePendingStartGame(gameId);
});

connection.on(NOT_IN_GAME_EVENTS.NEW_CHAT_MESSAGE, (chatMessage) => {
    searchGameModel.addChatMessage(chatMessage);
});

connection.on(PENDING_START_GAME_EVENTS.CREATED_GAME, (game) => {
    searchGameModel.clearChat();
    pendingStartGameModel.setGameInfo(game, true);
    searchGameState.setState(SEARCH_GAME_STATES.IN_PENDING_START_GAME);
});
connection.on(PENDING_START_GAME_EVENTS.JOINED_TO_GAME, (game) => {
    searchGameModel.clearChat();
    pendingStartGameModel.setGameInfo(game, true);
    searchGameState.setState(SEARCH_GAME_STATES.IN_PENDING_START_GAME);
});
connection.on(PENDING_START_GAME_EVENTS.LEAVED_FROM_GAME, () => {
    pendingStartGameModel.clearGameInfo();
    searchGameState.setState(SEARCH_GAME_STATES.IDLE);
});

connection.on(PENDING_START_GAME_EVENTS.PLAYER_JOINED, (game) => {
    pendingStartGameModel.setGameInfo(game);
});
connection.on(PENDING_START_GAME_EVENTS.PLAYER_LEAVED, (game) => {
    pendingStartGameModel.setGameInfo(game);
});
connection.on(PENDING_START_GAME_EVENTS.PLAYER_CHANGE_READY_STATUS, (newReadyStatus) => {
    pendingStartGameModel.changePlayerReadyStatus(newReadyStatus);
});

connection.on(PENDING_START_GAME_EVENTS.NEW_CHAT_MESSAGE, (chatMessage) => {
    pendingStartGameModel.addChatMessage(chatMessage);
});

connection.on(PENDING_START_GAME_EVENTS.MAP_GENERATION_CONFIG_UPDATE, (newConfig) => {
    pendingStartGameModel.setMapGenerationConfig(newConfig);
});

connection.on(PENDING_START_GAME_EVENTS.GAME_STARTED, () => {
    playerState.setState(PLAYER_STATES.IN_GAME);
    searchGameState.setState(SEARCH_GAME_STATES.IDLE);
    startGameConnector.disconnect();
});

connection.on(USER_PROFILE_EVENTS.USER_PROFILE_INFO, (newUserProfile) => {
    userProfile.setUserProfile(newUserProfile);
});
