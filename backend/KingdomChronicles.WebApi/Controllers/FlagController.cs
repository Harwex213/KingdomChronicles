using KingdomChronicles.WebApi.Middleware.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KingdomChronicles.WebApi.Controllers;

[Route(Constants.ControllersRoutes.Flag)]
[ShouldBeAuthorized]
public class FlagController : ControllerBase
{
    [HttpGet("current-svg-icons")]
    public async Task GetCurrentSvgIcons()
    {
        // TODO: return current svg icons
    }
}