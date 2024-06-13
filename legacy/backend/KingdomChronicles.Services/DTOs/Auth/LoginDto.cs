using System.ComponentModel.DataAnnotations;
using KingdomChronicles.DataAccess.Entities.Constraints;

namespace KingdomChronicles.Services.DTOs.Auth;

public class LoginDto
{
    [Required(ErrorMessage = ValidationErrorMessages.UsernameRequired)]
    [MaxLength(UserConstraint.UsernameMaxLength, ErrorMessage = ValidationErrorMessages.UsernameMaxLengthExceeded)]
    public string? Username { get; set; }

    [Required(ErrorMessage = ValidationErrorMessages.PasswordRequired)]
    [MinLength(Constraints.PasswordMinLength, ErrorMessage = ValidationErrorMessages.PasswordMinLengthExceeded)]
    [MaxLength(Constraints.PasswordMaxLength, ErrorMessage = ValidationErrorMessages.PasswordMaxLengthExceeded)]
    public string? Password { get; set; }
}