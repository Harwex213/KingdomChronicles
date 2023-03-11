using Microsoft.AspNetCore.Mvc;

namespace KingdomChronicles.WebApi.Controllers;

[Route(Constants.Routes.Authentication)]
public class AuthController : ControllerBase
{
    
    [HttpGet("describe")]
    public Task<string> DescribeUser()
    {
        return Task.FromResult("Hello from Harwex213");
    }

}