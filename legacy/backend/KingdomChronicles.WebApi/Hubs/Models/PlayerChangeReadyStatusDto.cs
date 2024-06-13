namespace KingdomChronicles.WebApi.Hubs.Models;

public class PlayerChangeReadyStatusDto
{
    public int UserId { get; set; }
    public bool Status { get; set; }
}