using System.ComponentModel.DataAnnotations;

namespace KingdomChronicles.Services.DTOs.Game;

public class CreateGameDto
{
    [Required(ErrorMessage = ValidationErrorMessages.GameNameRequired)]
    [MaxLength(Constraints.GameNameMaxLength, ErrorMessage = ValidationErrorMessages.GameNameMaxLengthExceeded)]
    public string? Name { get; set; }
    
    [Required(ErrorMessage = ValidationErrorMessages.GameMaxPlayersAmountRequired)]
    [Range(Constraints.GameMaxPlayersAmountMinLength, Constraints.GameMaxPlayersAmountMaxLength, ErrorMessage = ValidationErrorMessages.GameMaxPlayersAmountRangeExceeded)]
    public int? MaxPlayersAmount { get; set; }
    
    [Required(ErrorMessage = ValidationErrorMessages.GameMapGenerationConfigRequired)]
    public string? MapGenerationConfig { get; set; }
}