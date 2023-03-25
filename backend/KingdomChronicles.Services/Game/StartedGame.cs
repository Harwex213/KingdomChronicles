using KingdomChronicles.Services.DTOs.UserProfile;

namespace KingdomChronicles.Services.Game;

public class StartedGame
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = null!;
    public int MaxPlayersAmount { get; set; }
    public int OwnerId { get; set; }
    public Dictionary<int, UserProfileDto> UserProfiles { get; set; } = new();
    public Dictionary<int, bool> PlayersConnectedStatus { get; set; } = new();
}