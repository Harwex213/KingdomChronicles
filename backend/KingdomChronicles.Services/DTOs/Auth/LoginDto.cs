using System.ComponentModel.DataAnnotations;

namespace KingdomChronicles.Services.DTOs.Auth;

public class LoginDto
{
    [Required(ErrorMessage = ValidationErrorMessages.UsernameRequired)]
    public string? Username { get; set; }

    [Required(ErrorMessage = ValidationErrorMessages.PasswordRequired)]
    public string? Password { get; set; }
}