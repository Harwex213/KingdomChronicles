using KingdomChronicles.Services.DTOs.UserProfile;

namespace KingdomChronicles.Services.Game;

public class PendingStartGame
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = null!;
    public int MaxPlayersAmount { get; set; }
    public int OwnerId { get; set; }
    public string MapGenerationConfig { get; set; } = null!;
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public List<UserProfileDto> UserProfiles { get; set; } = new();
    public Dictionary<int, bool> PlayersReadyStatus { get; set; } = new();

    public void AddNewUserProfile(UserProfileDto userProfile)
    {
        UserProfiles.Add(userProfile);
        PlayersReadyStatus.Add(userProfile.UserId, false);
    }

    public void RemoveUserProfile(UserProfileDto userProfile)
    {
        UserProfiles.Remove(userProfile);
        PlayersReadyStatus.Remove(userProfile.UserId);
    }
}