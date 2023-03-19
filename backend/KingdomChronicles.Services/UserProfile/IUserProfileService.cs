using KingdomChronicles.Services.DTOs.UserProfile;

namespace KingdomChronicles.Services.UserProfile;

public interface IUserProfileService
{
    public Task<UserProfileDto> GetProfile();
    public Task EditProfileInfo(EditUserProfileInfoDto editUserProfileInfoDto);
    public Task EditProfileFlag(EditUserProfileFlagDto editUserProfileFlagDto);
}