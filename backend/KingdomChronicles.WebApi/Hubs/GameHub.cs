using System.Collections.Concurrent;
using KingdomChronicles.Services.Game;
using Microsoft.AspNetCore.SignalR;

namespace KingdomChronicles.WebApi.Hubs;

public class GameHub
{
    private static readonly ConcurrentDictionary<string, string> ConnectionIds = new();
    private static readonly ConcurrentDictionary<int, Guid> ExpectedInGamePlayers = new();
    private static readonly ConcurrentDictionary<Guid, StartedGame> Games = new();

    public static void OnGameStarted(StartedGame startedGame)
    {
        if (Games.TryAdd(startedGame.Id, startedGame))
        {
            // TODO: describe exception
            throw new HubException();
        }
        
        foreach (var (userId, _) in startedGame.UserProfiles)
        {
            startedGame.PlayersConnectedStatus.Add(userId, false);
            ExpectedInGamePlayers.TryAdd(userId, startedGame.Id);
        }
    }

    public static bool IsPlayerShouldBeInGame(int userId)
    {
        return ExpectedInGamePlayers.ContainsKey(userId);
    }
}