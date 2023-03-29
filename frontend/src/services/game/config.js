export const GAME_HUB_URL = process.env.REACT_APP_API_URL + "/game-hub";

export const SERVER_METHODS = {
    LEAVE_FROM_GAME: "LeaveFromGame",
    RUN_GAME: "RunGame",
    DO_ACTION: "DoAction",
    PAUSE_GAME: "PauseGame",
    UNPAUSE_GAME: "UnpauseGame",
    KICK_NOT_CONNECTED_PLAYER: "KickNotConnectedPlayer",
    SEND_MESSAGE: "SendMessage",
};

export const STARTED_GAME_EVENTS = {
    NOT_IN_GAME: "StartedGameEvent_NotInGame",
    ABORT_EXISTED_CONNECTION: "StartedGameEvent_AbortExistedConnection",
    JOINED_TO_GAME: "StartedGameEvent_JoinedToGame",
    LEAVED_FROM_GAME: "StartedGameEvent_LeavedFromGame",
    KICKED_FROM_GAME: "StartedGameEvent_KickedFromGame",
    PLAYER_JOINED: "StartedGameEvent_PlayerJoined",
    PLAYER_LEAVED: "StartedGameEvent_PlayerLeaved",
    PLAYER_KICKED: "StartedGameEvent_PlayerKicked",
    GAME_RUNNING: "StartedGameEvent_GameRunning",
    TICK: "StartedGameEvent_Tick",
    ACTION: "StartedGameEvent_Action",
    PAUSE: "StartedGameEvent_Pause",
    UNPAUSE: "StartedGameEvent_Unpause",
    NEW_CHAT_MESSAGE: "StartedGameEvent_NewChatMessage",
};
