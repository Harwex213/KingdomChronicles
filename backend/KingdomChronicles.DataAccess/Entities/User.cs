namespace KingdomChronicles.DataAccess.Entities;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = null!;
    public string PasswordHash { get; set; } = null!;
    public string Salt { get; set; } = null!;
    public virtual ICollection<Session> Sessions { get; set; } = new HashSet<Session>();
}