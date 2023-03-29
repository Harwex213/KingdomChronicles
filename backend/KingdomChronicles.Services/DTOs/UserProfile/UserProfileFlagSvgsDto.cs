namespace KingdomChronicles.Services.DTOs.UserProfile;

public class UserProfileFlagSvgsDto
{
    public IEnumerable<string> ForegroundSvgIcons { get; set; } = null!;
    public IEnumerable<string> EmblemSvgIcons { get; set; } = null!;
}