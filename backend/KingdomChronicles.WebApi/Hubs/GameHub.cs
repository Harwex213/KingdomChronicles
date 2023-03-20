using KingdomChronicles.Services.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace KingdomChronicles.WebApi.Hubs;

[Authorize]
public class GameHub : Hub
{
    private readonly IDbSession _dbSession;

    public GameHub(IDbSession dbSession)
    {
        _dbSession = dbSession;
    }

    public async Task SendMessage(string message)
    {
        var session = await _dbSession.Get();
        await Clients.All.SendAsync("ReceiveMessage", session.User!.Username, message);
    }
}