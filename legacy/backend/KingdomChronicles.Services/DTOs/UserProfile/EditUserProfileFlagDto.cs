using System.ComponentModel.DataAnnotations;

namespace KingdomChronicles.Services.DTOs.UserProfile;

public class EditUserProfileFlagDto
{
    [Required(ErrorMessage = ValidationErrorMessages.BackgroundColorRequired)]
    [RegularExpression("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$", ErrorMessage = ValidationErrorMessages.HexColorInvalidRegex)]
    public string? BackgroundColor { get; set; }
    
    [RegularExpression("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$", ErrorMessage = ValidationErrorMessages.HexColorInvalidRegex)]
    public string? ForegroundColor { get; set; }
    
    public string? ForegroundSvg { get; set; }
    
    [RegularExpression("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$", ErrorMessage = ValidationErrorMessages.HexColorInvalidRegex)]
    public string? EmblemColor { get; set; }
    
    public string? EmblemSvg { get; set; }
}