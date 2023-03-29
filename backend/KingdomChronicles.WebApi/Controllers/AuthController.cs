using KingdomChronicles.Services.Auth;
using KingdomChronicles.Services.DTOs.Auth;
using KingdomChronicles.Services.Exceptions;
using KingdomChronicles.WebApi.Middleware;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KingdomChronicles.WebApi.Controllers;

[Route(Constants.ControllersRoutes.Authentication)]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly IDbSession _dbSession;

    public AuthController(IAuthService authService, IDbSession dbSession)
    {
        _authService = authService;
        _dbSession = dbSession;
    }

    [HttpPost("register")]
    [ModelValidation]
    public async Task<UserDto> Register([FromBody] RegisterDto registerDto)
    {
        if (HttpContext.User.Identity?.IsAuthenticated == true)
        {
            throw new BadRequestException(Constants.MiddlewareConstants.ShouldBeNotAuthorizedMessage);
        }
        
        await _authService.Register(registerDto);
        return await DescribeUser();
    }
    
    [HttpPost("login")]
    [ModelValidation]
    public async Task<UserDto> Login([FromBody] LoginDto loginDto)
    {
        if (HttpContext.User.Identity?.IsAuthenticated == true)
        {
            throw new BadRequestException(Constants.MiddlewareConstants.ShouldBeNotAuthorizedMessage);
        }
        
        await _authService.Login(loginDto);
        return await DescribeUser();
    }
    
    [HttpGet("describe")]
    [Authorize]
    public async Task<UserDto> DescribeUser()
    {
        var session = await _dbSession.Get();
        return new UserDto
        {
            Id = session.UserId!.Value,
            ShouldBeInGame = Hubs.GameHub.IsPlayerShouldBeInGame(session.UserId!.Value),
        };
    }

    [HttpDelete("logout")]
    [Authorize]
    public async Task Logout()
    {
        await _authService.Logout();
    }
}