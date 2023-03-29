using KingdomChronicles.Services.DTOs.UserProfile;

namespace KingdomChronicles.Services.Game;

public class StartedGame
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = null!;
    public int OwnerId { get; set; }
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public bool WasRun { get; set; } = false;
    public List<UserProfileDto> UserProfiles { get; set; } = new();
    public Dictionary<int, bool> PlayersConnectedStatus { get; set; } = new();
}