using KingdomChronicles.Services.DTOs.UserProfile;
using KingdomChronicles.Services.Game;

namespace KingdomChronicles.WebApi.Hubs.Models;

public class GameHubUser
{
    public UserProfileDto UserProfile { get; set; } = null!;
    public StartedGame Game { get; set; } = null!;
}