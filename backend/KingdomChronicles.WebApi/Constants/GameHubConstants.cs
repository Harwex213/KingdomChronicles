namespace KingdomChronicles.WebApi.Constants;

public static class GameHubConstants
{
    public const string StartGameRoute = "start-game-hub";
    public const string GameRoute = "game-hub";
    public const string HubUserItemKey = "HubUser";
    public const int TickSecondsAmount = 5;

    public static class NotInGameEvent
    {
        public const string ShouldBeInStartedGame = "NotInGameEvent_ShouldBeInStartedGame";
        public const string AbortExistedConnection = "NotInGameEvent_AbortExistedConnection";
        public const string CurrentPendingStartGames = "NotInGameEvent_CurrentPendingStartGames";
        public const string NewChatMessage = "NotInGameEvent_NewChatMessage";
        public const string GameCreated = "NotInGameEvent_GameCreated";
        public const string GameUpdated = "NotInGameEvent_GameUpdated";
        public const string GameDestroyed = "NotInGameEvent_GameDestroyed";
    }

    public static class PendingStartGameEvents
    {
        public const string NewChatMessage = "PendingStartGameEvents_NewChatMessage";
        public const string CreatedGame = "PendingStartGameEvents_CreatedGame";
        public const string JoinedToGame = "PendingStartGameEvents_JoinedToGame";
        public const string LeavedFromGame = "PendingStartGameEvents_LeavedFromGame";
        public const string PlayerJoined = "PendingStartGameEvents_PlayerJoined";
        public const string PlayerLeaved = "PendingStartGameEvents_PlayerLeaved";
        public const string PlayerChangeReadyStatus = "PendingStartGameEvents_PlayerChangeReadyStatus";
        public const string GameStarted = "PendingStartGameEvents_LeavedFromGame";
    }

    public static class StartedGameEvents
    {
        public const string NotInGame = "StartedGameEvent_NotInGame";
        public const string AbortExistedConnection = "StartedGameEvent_AbortExistedConnection";
        
        public const string JoinedToGame = "StartedGameEvent_JoinedToGame";
        public const string LeavedFromGame = "StartedGameEvent_LeavedFromGame";
        public const string KickedFromGame = "StartedGameEvent_KickedFromGame";
        
        public const string PlayerJoined = "StartedGameEvent_PlayerJoined";
        public const string PlayerLeaved = "StartedGameEvent_PlayerLeaved";
        public const string PlayerKicked = "StartedGameEvent_PlayerKicked";
        
        public const string GameRunning = "StartedGameEvent_GameRunning";
        public const string Tick = "StartedGameEvent_Tick";
        public const string Action = "StartedGameEvent_Action";
        public const string Pause = "StartedGameEvent_Pause";
        public const string Unpause = "StartedGameEvent_Unpause";
        
        public const string NewChatMessage = "StartedGameEvent_NewChatMessage";
    }

    public static class GroupNames
    {
        public const string NotInGame = "NotInGame";
    }

    public static class Errors
    {
        public const string CannotConnect = "Cannot connect. Please, try again";
        public const string PlayerNotFound = "Cannot found such player. Please, reconnect";
        public const string GameNotFound = "Cannot found such game. Please, reconnect";
        public const string AlreadyInGame = "You already in game";
        public const string NotInGame = "You are not in any game";
        public const string ShouldBeOwner = "Only owner can do this";
        public const string ShouldBeNotOwner = "Owner cannot do this";
        public const string GameIsFull = "Game is full already. Try find another or create new one";
        public const string NotAllPlayersReady = "Some player is not ready for game";
        public const string GameAlreadyStarted = "This game is already started";
        public const string PlayerNotExistOrAlreadyConnected = "Player not in game or already connected";
    }
}