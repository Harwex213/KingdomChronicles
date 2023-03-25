using KingdomChronicles.DataAccess.Entities;

namespace KingdomChronicles.Services.Game;

public class Player
{
    public int UserId { get; set; }
    public Guid Game { get; set; }
    public bool IsConnected { get; set; }
}