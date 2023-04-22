using KingdomChronicles.Services.Game;
using KingdomChronicles.WebApi.Constants;
using KingdomChronicles.WebApi.Hubs.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace KingdomChronicles.WebApi.Hubs;

[Authorize]
public partial class GameHub : Hub
{
    public static void AddToStartedGames(StartedGame startedGame)
    {
        startedGame.Created = DateTime.UtcNow;
        if (Games.TryAdd(startedGame.Id, startedGame) == false)
        {
            throw new HubException(GameHubConstants.Errors.GameAlreadyStarted);
        }
        
        foreach (var userProfile in startedGame.UserProfiles)
        {
            startedGame.PlayersConnectedStatus.Add(userProfile.UserId, false);
            ExpectedPlayersInGame.TryAdd(userProfile.UserId, startedGame);
        }
    }

    public static bool IsPlayerShouldBeInGame(int userId)
    {
        return ExpectedPlayersInGame.ContainsKey(userId);
    }


    private async Task JoinToGame(StartedGame game, int joinerId)
    {
        lock (game)
        {
            game.PlayersConnectedStatus[joinerId] = true;
        }

        await Groups.AddToGroupAsync(Context.ConnectionId, game.Id.ToString());
        
        await Clients.Caller.SendAsync(GameHubConstants.StartedGameEvents.JoinedToGame, game);
        await Clients.GroupExcept(game.Id.ToString(), Context.ConnectionId)
            .SendAsync(GameHubConstants.StartedGameEvents.PlayerJoined, joinerId);
    }

    private async Task LeaveFromGame(StartedGame game, int leaverId)
    {
        ExpectedPlayersInGame.TryRemove(leaverId, out _);
        
        bool shouldBeDestroyed;
        lock (game)
        {
            game.PlayersConnectedStatus[leaverId] = false;
            shouldBeDestroyed = game.WasRun && game.PlayersConnectedStatus.All(status => status.Value == false);
        }

        await Clients.Caller.SendAsync(GameHubConstants.StartedGameEvents.LeavedFromGame);
        if (shouldBeDestroyed)
        {
            Games.TryRemove(game.Id, out _);
        }
        else
        {
            await Clients.GroupExcept(game.Id.ToString(), Context.ConnectionId)
                .SendAsync(GameHubConstants.StartedGameEvents.PlayerLeaved, leaverId);
        }
    }

    private async Task KickFromGame(StartedGame game, int kickingUserId)
    {
        ExpectedPlayersInGame.TryRemove(kickingUserId, out _);
        
        lock (game)
        {
            var kickingUser = game.UserProfiles.First(u => u.UserId == kickingUserId);
            game.UserProfiles.Remove(kickingUser);
            game.PlayersConnectedStatus.Remove(kickingUserId);
        }
        
        await Clients.Caller.SendAsync(GameHubConstants.StartedGameEvents.KickedFromGame);
        await Clients.GroupExcept(game.Id.ToString(), Context.ConnectionId)
            .SendAsync(GameHubConstants.StartedGameEvents.PlayerKicked, kickingUserId);
    }
    
    private GameHubUser GetCurrentHubUser()
    {
        if (Context.Items.TryGetValue(GameHubConstants.HubUserItemKey, out var foundHubUser) == false)
        {
            throw new HubException(GameHubConstants.Errors.PlayerNotFound);
        }
        return (GameHubUser)foundHubUser!;
    }

}