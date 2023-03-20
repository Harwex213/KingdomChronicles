using System.Security.Claims;
using System.Text.Encodings.Web;
using KingdomChronicles.DataAccess.Entities;
using KingdomChronicles.Services.Auth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;

namespace KingdomChronicles.WebApi.Middleware;

public class CustomAuthenticationOptions : AuthenticationSchemeOptions { }

public class CustomAuthenticationHandler : AuthenticationHandler<CustomAuthenticationOptions>
{
    private readonly IDbSession _dbSession;
    
    public CustomAuthenticationHandler(
        IOptionsMonitor<CustomAuthenticationOptions> options, 
        ILoggerFactory logger, 
        UrlEncoder encoder, 
        ISystemClock clock,
        IDbSession dbSession) : base(options, logger, encoder, clock)
    {
        _dbSession = dbSession;
    }

    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        if (await _dbSession.IsLoggedIn())
        {
            var session = await _dbSession.Get();
            var authenticationTicket = GetAuthenticationTicket(session);
            return AuthenticateResult.Success(authenticationTicket);
        }
        
        return AuthenticateResult.Fail(Constants.MiddlewareConstants.ShouldBeAuthorizedMessage);
    }

    private AuthenticationTicket GetAuthenticationTicket(SessionEntity session)
    {
        var claimsIdentity = new ClaimsIdentity(Constants.MiddlewareConstants.AuthenticationScheme);
        claimsIdentity.AddClaim(new Claim(ClaimTypes.NameIdentifier, session.User!.Username));
        var principal = new ClaimsPrincipal(claimsIdentity);
        return new AuthenticationTicket(principal, Scheme.Name);
    }
}