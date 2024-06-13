using System.Collections.Concurrent;
using KingdomChronicles.Services.Game;
using KingdomChronicles.WebApi.Constants;
using KingdomChronicles.WebApi.Hubs.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace KingdomChronicles.WebApi.Hubs;

[Authorize]
public partial class GameHub : Hub
{
    private static readonly ConcurrentDictionary<string, string> ConnectionIds = new();
    private static readonly ConcurrentDictionary<int, StartedGame> ExpectedPlayersInGame = new();
    private static readonly ConcurrentDictionary<Guid, StartedGame> Games = new();

    public override async Task OnConnectedAsync()
    {
        static StartedGame GetPlayerGame(int userId)
        {
            ExpectedPlayersInGame.TryGetValue(userId, out var gotGame);
            return gotGame!;
        }
        static void SaveCurrentConnectionId(string identifier, string connectionId)
        {
            if (ConnectionIds.TryAdd(identifier, connectionId) == false)
            {
                throw new HubException(GameHubConstants.Errors.CannotConnect);
            }
        }
        async Task TryAbortExistedConnection(StartedGame game, int userId)
        {
            if (ConnectionIds.TryRemove(Context.UserIdentifier!, out var oldConnectionId))
            {
                await Clients.Client(oldConnectionId).SendAsync(GameHubConstants.StartedGameEvents.AbortExistedConnection);
                await LeaveFromGame(game, userId);
            }
        }
        
        var connectedUserId = int.Parse(Context.UserIdentifier!);
        
        if (IsPlayerShouldBeInGame(connectedUserId) == false)
        {
            await Clients.Caller.SendAsync(GameHubConstants.StartedGameEvents.NotInGame);
            return;
        }

        var game = GetPlayerGame(connectedUserId);
        
        // TODO: abort connection if game wasn't run and since creation time passed more than 3 minutes

        await TryAbortExistedConnection(game, connectedUserId);
        
        SaveCurrentConnectionId(Context.UserIdentifier!, Context.ConnectionId);

        var hubUser = new GameHubUser
        {
            UserProfile = game.UserProfiles.First(u => u.UserId == connectedUserId),
            Game = game
        };
        Context.Items.Add(GameHubConstants.HubUserItemKey, hubUser);

        await JoinToGame(game, connectedUserId);
    }

    public async Task LeaveFromGame()
    {
        var currentHubUser = GetCurrentHubUser();
        await LeaveFromGame(currentHubUser.Game, currentHubUser.UserProfile.UserId);
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        void CleanConnectionId()
        {
            ConnectionIds.TryGetValue(Context.UserIdentifier!, out var connectionId);
            if (connectionId == Context.ConnectionId)
            {
                ConnectionIds.TryRemove(Context.UserIdentifier!, out _);
            }
        }

        CleanConnectionId();

        var currentHubUser = GetCurrentHubUser();
        if (IsPlayerShouldBeInGame(currentHubUser.UserProfile.UserId))
        {
            await LeaveFromGame(currentHubUser.Game, currentHubUser.UserProfile.UserId);
        }
        
        Context.Items.Remove(GameHubConstants.HubUserItemKey);
    }

    public async Task RunGame()
    {
        var currentHubUser = GetCurrentHubUser();
        var game = currentHubUser.Game;

        lock (game)
        {
            if (game.OwnerId != currentHubUser.UserProfile.UserId)
            {
                throw new HubException(GameHubConstants.Errors.ShouldBeOwner);
            }

            if (game.PlayersConnectedStatus.All(s => s.Value) == false)
            {
                throw new HubException(GameHubConstants.Errors.NotAllPlayersReady);
            }

            game.WasRun = true;
        }

        await Clients.Group(game.Id.ToString()).SendAsync(GameHubConstants.StartedGameEvents.GameRunning);
    }

    public async Task DoAction(string action)
    {
        var currentHubUser = GetCurrentHubUser();
        var game = currentHubUser.Game;
        
        await Clients.Group(game.Id.ToString()).SendAsync(GameHubConstants.StartedGameEvents.Action, action);
    }

    public async Task PauseGame()
    {
        var currentHubUser = GetCurrentHubUser();
        var game = currentHubUser.Game;

        lock (game)
        {
            if (game.OwnerId != currentHubUser.UserProfile.UserId)
            {
                throw new HubException(GameHubConstants.Errors.ShouldBeOwner);
            }
        }
        
        await Clients.Group(game.Id.ToString()).SendAsync(GameHubConstants.StartedGameEvents.Pause);
    }
    
    public async Task UnpauseGame()
    {
        var currentHubUser = GetCurrentHubUser();
        var game = currentHubUser.Game;

        lock (game)
        {
            if (game.OwnerId != currentHubUser.UserProfile.UserId)
            {
                throw new HubException(GameHubConstants.Errors.ShouldBeOwner);
            }
        }
        
        await Clients.Group(game.Id.ToString()).SendAsync(GameHubConstants.StartedGameEvents.Unpause);
    }
    
    public async Task KickNotConnectedPlayer(int kickingUserId)
    {
        var currentHubUser = GetCurrentHubUser();
        var game = currentHubUser.Game;

        lock (game)
        {
            if (game.OwnerId != currentHubUser.UserProfile.UserId)
            {
                throw new HubException(GameHubConstants.Errors.ShouldBeOwner);
            }

            if (game.PlayersConnectedStatus.TryGetValue(kickingUserId, out bool isConnected) == false || isConnected)
            {
                throw new HubException(GameHubConstants.Errors.PlayerNotExistOrAlreadyConnected);
            }
        }

        await KickFromGame(game, kickingUserId);
    }
    
    public async Task SendMessage(string message)
    {
        var currentHubUser = GetCurrentHubUser();

        var chatMessage = new ChatMessageDto
        {
            Author = currentHubUser.UserProfile.Name,
            Message = message,
            SendingTime = DateTime.UtcNow
        };
        
        await Clients.Group(currentHubUser.Game.Id.ToString())
            .SendAsync(GameHubConstants.StartedGameEvents.NewChatMessage, chatMessage);
    }
}