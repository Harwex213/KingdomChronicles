namespace KingdomChronicles.DataAccess.Entities;

public class Session
{
    public Guid Id { get; set; }
    public string? Content { get; set; }
    public DateTime Created { get; set; }
    public DateTime LastAccessed { get; set; }
    public int? UserId { get; set; }
    public virtual User? User { get; set; }
}