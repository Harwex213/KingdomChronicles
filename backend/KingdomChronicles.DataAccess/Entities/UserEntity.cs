namespace KingdomChronicles.DataAccess.Entities;

public class UserEntity
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public string PasswordHash { get; set; } = null!;
    public string Salt { get; set; } = null!;
    public virtual ICollection<SessionEntity> Sessions { get; set; } = new HashSet<SessionEntity>();
    public virtual UserProfileEntity UserProfileEntity { get; set; } = null!;
}