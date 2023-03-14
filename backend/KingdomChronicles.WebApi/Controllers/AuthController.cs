using KingdomChronicles.Services.Auth;
using KingdomChronicles.Services.DTOs.Auth;
using KingdomChronicles.WebApi.Middleware;
using KingdomChronicles.WebApi.Middleware.Authorization;
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
    [ShouldBeNotAuthorized]
    [ModelValidation]
    public async Task<UserDto> Register([FromBody] RegisterDto registerDto)
    {
        await _authService.Register(registerDto);
        return new UserDto
        {
            IsLoggedIn = await _dbSession.IsLoggedIn(),
            Username = registerDto.Username
        };
    }
    
    [HttpPost("login")]
    [ShouldBeNotAuthorized]
    [ModelValidation]
    public async Task<UserDto> Login([FromBody] LoginDto loginDto)
    {
        await _authService.Login(loginDto);
        return new UserDto
        {
            IsLoggedIn = await _dbSession.IsLoggedIn(),
            Username = loginDto.Username
        };
    }
    
    [HttpGet("describe")]
    public async Task<UserDto> DescribeUser()
    {
        var session = await _dbSession.Get();
        return new UserDto
        {
            IsLoggedIn = await _dbSession.IsLoggedIn(),
            Username = session.User?.Username
        };
    }

    [HttpDelete("logout")]
    [ShouldBeAuthorized]
    public async Task Logout()
    {
        await _authService.Logout();
    }
}