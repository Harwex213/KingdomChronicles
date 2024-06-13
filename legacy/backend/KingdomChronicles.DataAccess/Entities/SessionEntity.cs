namespace KingdomChronicles.DataAccess.Entities;

public class SessionEntity
{
    public Guid Id { get; set; }
    public string? Content { get; set; }
    public DateTime Created { get; set; }
    public DateTime LastAccessed { get; set; }
    public int? UserId { get; set; }
    public virtual UserEntity? User { get; set; }
}