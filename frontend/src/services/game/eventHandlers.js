import { connection, gameConnector, startedGameModel } from "./init";
import { STARTED_GAME_EVENTS } from "./config";
import { playerState } from "../states";
import { PLAYER_STATES } from "../../common/constants/states";

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
    startedGameModel.setGameInfo(game);
});
connection.on(STARTED_GAME_EVENTS.LEAVED_FROM_GAME, () => {
    playerState.setState(PLAYER_STATES.NOT_STARTED_GAME);
    gameConnector.disconnect();
});
connection.on(STARTED_GAME_EVENTS.KICKED_FROM_GAME, () => {
    playerState.setState(PLAYER_STATES.NOT_STARTED_GAME);
    gameConnector.disconnect();
});

connection.on(STARTED_GAME_EVENTS.PLAYER_JOINED, (joinedId) => {});
connection.on(STARTED_GAME_EVENTS.PLAYER_LEAVED, (leaverId) => {});
connection.on(STARTED_GAME_EVENTS.PLAYER_KICKED, (kickedId) => {});

connection.on(STARTED_GAME_EVENTS.GAME_RUNNING, () => {});
connection.on(STARTED_GAME_EVENTS.TICK, () => {});
connection.on(STARTED_GAME_EVENTS.ACTION, (action) => {});
connection.on(STARTED_GAME_EVENTS.PAUSE, () => {});
connection.on(STARTED_GAME_EVENTS.UNPAUSE, () => {});
