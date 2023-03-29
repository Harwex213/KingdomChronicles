using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KingdomChronicles.WebApi.Controllers;

[Route(Constants.ControllersRoutes.Flag)]
[Authorize]
public class FlagController : ControllerBase
{
    [HttpGet("current-svg-icons")]
    public async Task GetCurrentSvgIcons()
    {
        // TODO: return current svg icons
    }
}