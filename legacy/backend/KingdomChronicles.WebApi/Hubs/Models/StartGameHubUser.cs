using KingdomChronicles.Services.DTOs.UserProfile;
using KingdomChronicles.Services.Game;

namespace KingdomChronicles.WebApi.Hubs.Models;

public class StartGameHubUser
{
    public UserProfileDto UserProfile { get; set; } = null!;
    public PendingStartGame? Game { get; set; }

    public bool IsInGame => Game != null;
}