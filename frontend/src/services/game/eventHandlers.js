import { connection, gameConnector, startedGameModel } from "./init";
import { STARTED_GAME_EVENTS } from "./config";
import { playerState } from "../states";
import { PLAYER_STATES } from "../../common/constants/states";
import { gameService } from "./gameService";

connection.onclose((error) => {
    if (error) {
        gameConnector.onTerminated();
    }
});

connection.on(STARTED_GAME_EVENTS.NOT_IN_GAME, () => {
    playerState.setState(PLAYER_STATES.NOT_STARTED_GAME);
    gameConnector.disconnect();
});
connection.on(STARTED_GAME_EVENTS.ABORT_EXISTED_CONNECTION, () => {
    gameConnector.abort();
});

connection.on(STARTED_GAME_EVENTS.NEW_CHAT_MESSAGE, (chatMessage) => {
    startedGameModel.addChatMessage(chatMessage);
});

connection.on(STARTED_GAME_EVENTS.JOINED_TO_GAME, (game) => {
    gameService.startGame(game);
});
connection.on(STARTED_GAME_EVENTS.LEAVED_FROM_GAME, () => {
    playerState.setState(PLAYER_STATES.NOT_STARTED_GAME);
    gameService.cleanGame();
    gameConnector.disconnect();
});
connection.on(STARTED_GAME_EVENTS.KICKED_FROM_GAME, () => {
    playerState.setState(PLAYER_STATES.NOT_STARTED_GAME);
    gameService.cleanGame();
    gameConnector.disconnect();
});

connection.on(STARTED_GAME_EVENTS.PLAYER_JOINED, (joinedId) => {
    gameService.onPlayerConnected(joinedId);
});
connection.on(STARTED_GAME_EVENTS.PLAYER_LEAVED, (leaverId) => {
    gameService.onPlayerDisconnected(leaverId);
});
connection.on(STARTED_GAME_EVENTS.PLAYER_KICKED, (kickedId) => {});

connection.on(STARTED_GAME_EVENTS.GAME_RUNNING, () => {
    gameService.onGameRunning();
});
connection.on(STARTED_GAME_EVENTS.TICK, () => {
    gameService.nextTick();
});
connection.on(STARTED_GAME_EVENTS.ACTION, (action) => {
    const parsed = JSON.parse(action);
    gameService.applyAction(parsed);
});
connection.on(STARTED_GAME_EVENTS.PAUSE, () => {});
connection.on(STARTED_GAME_EVENTS.UNPAUSE, () => {});
