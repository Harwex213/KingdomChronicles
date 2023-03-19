using KingdomChronicles.Services.DTOs.Common;
using KingdomChronicles.WebApi.Middleware.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KingdomChronicles.WebApi.Controllers;

[Route(Constants.ControllersRoutes.Title)]
[ShouldBeAuthorized]
public class TitleController : ControllerBase
{
    private readonly Services.Title.ITitleService _titleService;

    public TitleController(Services.Title.ITitleService titleService)
    {
        _titleService = titleService;
    }

    [HttpGet("current")]
    public async Task<IEnumerable<TitleDto>> GetCurrentTitles()
    {
        return await _titleService.GetPossibleTitles();
    }
}