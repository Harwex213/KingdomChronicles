namespace KingdomChronicles.Services.DTOs.UserProfile;

public class UserProfileFlagDto
{
    public string BackgroundColor { get; set; } = null!;
    public string? ForegroundColor { get; set; }
    public string? ForegroundSvg { get; set; }
    public string? EmblemSvg { get; set; }
}

public class UserProfileDto
{
    public string Name { get; set; } = null!;
    public string? Motto { get; set; }
    public int? TitleId { get; set; }
    public UserProfileFlagDto Flag { get; set; } = null!;
}