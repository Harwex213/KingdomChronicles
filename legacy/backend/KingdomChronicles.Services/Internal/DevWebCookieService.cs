using Microsoft.AspNetCore.Http;

namespace KingdomChronicles.Services.Internal;

public class DevWebCookieService : IWebCookieService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public DevWebCookieService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public void AddSecure(string cookieName, string value, int days = 0)
    {
        var options = new CookieOptions
        {
            Path = "/",
            HttpOnly = true, 
            Secure = true, 
            SameSite = SameSiteMode.None
        };
        if (days > 0)
            options.Expires = DateTimeOffset.UtcNow.AddDays(days);
        _httpContextAccessor.HttpContext?.Response.Cookies.Append(cookieName, value, options);
    }
    
    public void Delete(string cookieName)
    {
        _httpContextAccessor.HttpContext?.Response.Cookies.Delete(cookieName);
    }

    public string? Get(string cookieName)
    {
        var cookie = _httpContextAccessor.HttpContext?.Request?.Cookies
            .FirstOrDefault(m => m.Key == cookieName);
        return cookie?.Value;
    }
}