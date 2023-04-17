export const START_GAME_HUB_URL = process.env.REACT_APP_API_URL + "/start-game-hub";
export const GAME_HUB_URL = process.env.REACT_APP_API_URL + "/game-hub";

export const SERVER_METHODS = {
    SEND_MESSAGE: "SendMessage",
    CREATE_GAME: "CreateGame",
    JOIN_GAME: "JoinGame",
    LEAVE_FROM_GAME: "LeaveFromGame",
    READY_FOR_GAME: "ReadyForGame",
    NOT_READY_FOR_GAME: "NotReadyForGame",
    START_GAME: "StartGame",
    UPDATE_MAP_GENERATION_CONFIG: "UpdateMapGenerationConfig",
};

export const NOT_IN_GAME_EVENTS = {
    SHOULD_BE_IN_STARTED_GAME: "NotInGameEvent_ShouldBeInStartedGame",
    ABORT_EXISTED_CONNECTION: "NotInGameEvent_AbortExistedConnection",
    CURRENT_PENDING_START_GAMES: "NotInGameEvent_CurrentPendingStartGames",
    GAME_CREATED: "NotInGameEvent_GameCreated",
    GAME_UPDATED: "NotInGameEvent_GameUpdated",
    GAME_DESTROYED: "NotInGameEvent_GameDestroyed",
    NEW_CHAT_MESSAGE: "NotInGameEvent_NewChatMessage",
};

export const PENDING_START_GAME_EVENTS = {
    NEW_CHAT_MESSAGE: "PendingStartGameEvents_NewChatMessage",
    CREATED_GAME: "PendingStartGameEvents_CreatedGame",
    JOINED_TO_GAME: "PendingStartGameEvents_JoinedToGame",
    LEAVED_FROM_GAME: "PendingStartGameEvents_LeavedFromGame",
    PLAYER_JOINED: "PendingStartGameEvents_PlayerJoined",
    PLAYER_LEAVED: "PendingStartGameEvents_PlayerLeaved",
    PLAYER_CHANGE_READY_STATUS: "PendingStartGameEvents_PlayerChangeReadyStatus",
    GAME_STARTED: "PendingStartGameEvents_GameStarted",
    MAP_GENERATION_CONFIG_UPDATE: "PendingStartGameEvents_MapGenerationConfigUpdate",
};
