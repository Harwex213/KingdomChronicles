using KingdomChronicles.Services.DTOs.UserProfile;
using KingdomChronicles.WebApi.Middleware.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KingdomChronicles.WebApi.Controllers;

[Route(Constants.ControllersRoutes.Profile)]
[ShouldBeAuthorized]
public class UserProfileController : ControllerBase
{
    private readonly Services.UserProfile.IUserProfileService _userProfileService;

    public UserProfileController(Services.UserProfile.IUserProfileService userProfileService)
    {
        _userProfileService = userProfileService;
    }

    [HttpGet]
    public async Task<UserProfileDto> GetProfile()
    {
        return await _userProfileService.GetProfile();
    }

    [HttpPut("info")]
    public async Task EditProfileInfo()
    {
        // TODO: edit user profile info
    }

    [HttpPut("flag")]
    public async Task EditProfileFlag()
    {
        // TODO: edit user profile flag
    }
}