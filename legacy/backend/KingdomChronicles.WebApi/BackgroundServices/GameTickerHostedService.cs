using KingdomChronicles.WebApi.Constants;
using KingdomChronicles.WebApi.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace KingdomChronicles.WebApi.BackgroundServices;

public class GameTickerHostedService : IHostedService, IDisposable
{
    private readonly IHubContext<GameHub> _hub;
    private Timer? _timer;

    public GameTickerHostedService(IHubContext<GameHub> hub)
    {
        _hub = hub;
    }

    public Task StartAsync(CancellationToken stoppingToken)
    {
        _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromSeconds(GameHubConstants.TickSecondsAmount));

        return Task.CompletedTask;
    }
    
    private void DoWork(object? state)
    {
        _hub.Clients.All.SendAsync(GameHubConstants.StartedGameEvents.Tick);
    }

    public Task StopAsync(CancellationToken stoppingToken)
    {
        _timer?.Change(Timeout.Infinite, 0);

        return Task.CompletedTask;
    }

    public void Dispose()
    {
        _timer?.Dispose();
    }
}