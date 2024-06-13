namespace KingdomChronicles.Services.Internal;

public interface IWebCookieService
{
    public void AddSecure(string cookieName, string value, int days = 0);

    void Delete(string cookieName);

    string? Get(string cookieName);
}