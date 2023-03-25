namespace KingdomChronicles.WebApi.Hubs.Models;

public class ChatMessageDto
{
    public string Author { get; set; } = null!;
    public string Message { get; set; } = null!;
    public DateTime SendingTime { get; set; }
}