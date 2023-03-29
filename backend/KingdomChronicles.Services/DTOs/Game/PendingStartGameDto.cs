namespace KingdomChronicles.Services.DTOs.Game;

public class PendingStartGameDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public int MaxPlayersAmount { get; set; }
    public DateTime Created { get; set; }
    public string[] Players { get; set; } = null!;
}