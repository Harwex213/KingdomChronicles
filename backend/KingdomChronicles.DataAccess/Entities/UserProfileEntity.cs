namespace KingdomChronicles.DataAccess.Entities;

public class UserProfileEntity
{
    public int UserId { get; set; }
    public string Name { get; set; } = null!;
    public string KingdomName { get; set; } = null!;
    public int? TitleId { get; set; }
    public string? Motto { get; set; }
    public string FlagBackgroundColor { get; set; } = null!;
    public string? FlagForegroundColor { get; set; }
    public string? FlagForegroundSvg { get; set; }
    public string? FlagEmblemColor { get; set; }
    public string? FlagEmblemSvg { get; set; }
    public virtual TitleEntity? TitleEntity { get; set; }
    public virtual UserEntity UserEntity { get; set; } = null!;
}