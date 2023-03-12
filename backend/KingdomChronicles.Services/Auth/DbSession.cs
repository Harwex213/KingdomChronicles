using KingdomChronicles.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace KingdomChronicles.Services.Auth;

public class DbSession : IDbSession
{
    private readonly DataAccess.AppDbContext _appDbContext;
    private readonly Internal.IWebCookieService _webCookieService;
    private Session? _session;
    
    public DbSession(DataAccess.AppDbContext appDbContext, 
        Internal.IWebCookieService webCookieService)
    {
        _appDbContext = appDbContext;
        _webCookieService = webCookieService;
    }

    private void StoreSession(Guid sessionId)
    {
        _webCookieService.Delete(AuthConstants.SessionCookieName);
        _webCookieService.AddSecure(AuthConstants.SessionCookieName, sessionId.ToString(), AuthConstants.SessionDaysLifetime);
    }
    
    private async Task<Session> CreateSession()
    {
        var createdSession = new Session
        {
            Id = Guid.NewGuid(),
            Created = DateTime.UtcNow,
            LastAccessed = DateTime.UtcNow
        };
        await _appDbContext.Sessions.AddAsync(createdSession);
        await _appDbContext.SaveChangesAsync();
        return createdSession;
    }

    public async Task<Session> GetSession()
    {
        if (_session != null)
        {
            return _session;
        }
        
        string? sessionString = _webCookieService.Get(AuthConstants.SessionCookieName);
        Guid sessionId = sessionString == null ? Guid.NewGuid() : Guid.Parse(sessionString);

        var foundSession = await _appDbContext.Sessions.FirstOrDefaultAsync(s => s.Id == sessionId);
        if (foundSession == null)
        {
            foundSession = await CreateSession();
            StoreSession(foundSession.Id);
        }
        _session = foundSession;
        return foundSession;
    }

    public async Task SetUserId(int userId)
    {
        Session session = await GetSession();
        session.UserId = userId;
        session.Id = Guid.NewGuid();
        await _appDbContext.SaveChangesAsync();
        StoreSession(session.Id);
    }

    public async Task<int?> GetUserId()
    {
        Session session = await GetSession();
        return session.UserId;
    }

    public async Task<bool> IsLoggedIn()
    {
        Session session = await GetSession();
        return session.UserId != null;
    }
}