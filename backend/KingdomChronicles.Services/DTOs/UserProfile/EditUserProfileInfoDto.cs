using System.ComponentModel.DataAnnotations;
using KingdomChronicles.DataAccess.Entities.Constraints;

namespace KingdomChronicles.Services.DTOs.UserProfile;

public class EditUserProfileInfoDto
{
    [Required(ErrorMessage = ValidationErrorMessages.NameRequired)]
    [MaxLength(UserProfileConstraint.NameMaxLength, ErrorMessage = ValidationErrorMessages.NameMaxLengthExceeded)]
    public string? Name { get; set; }
    
    [Required(ErrorMessage = ValidationErrorMessages.KingdomNameRequired)]
    [MaxLength(UserProfileConstraint.KingdomNameMaxLength, ErrorMessage = ValidationErrorMessages.KingdomNameMaxLengthExceeded)]
    public string? KingdomName { get; set; }
    
    [MaxLength(UserProfileConstraint.MottoMaxLength, ErrorMessage = ValidationErrorMessages.MottoMaxLengthExceeded)]
    public string? Motto { get; set; }
    
    public int? TitleId { get; set; }
}