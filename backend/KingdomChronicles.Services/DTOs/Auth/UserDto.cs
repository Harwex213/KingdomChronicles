namespace KingdomChronicles.Services.DTOs.Auth;

public class UserDto
{
    public int Id { get; set; }
    public bool ShouldBeInGame { get; set; } = false;
}