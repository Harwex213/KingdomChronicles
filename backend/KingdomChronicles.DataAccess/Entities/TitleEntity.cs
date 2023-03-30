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
        new() { Id = 2, Name = "Emperor" },
        new() { Id = 3, Name = "Consul" },
        new() { Id = 4, Name = "Senator" },
        new() { Id = 5, Name = "Tsar" },
        new() { Id = 6, Name = "Prince" },
        new() { Id = 7, Name = "Nobleman" },
        new() { Id = 8, Name = "Trader" }
    };
}