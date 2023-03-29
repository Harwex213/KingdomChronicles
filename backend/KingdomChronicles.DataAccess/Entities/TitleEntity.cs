using System.ComponentModel.DataAnnotations.Schema;

namespace KingdomChronicles.DataAccess.Entities;

public class TitleEntity
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public virtual ICollection<UserProfileEntity> Profiles { get; set; } = new HashSet<UserProfileEntity>();

    [NotMapped] 
    public const int DefaultTitleId = 1;
    [NotMapped]
    public static readonly IEnumerable<TitleEntity> InitialData = new List<TitleEntity>
    {
        new() { Id = DefaultTitleId, Name = "King" },
        new() { Id = 2, Name = "Free city" },
        new() { Id = 3, Name = "House" }
    };
}