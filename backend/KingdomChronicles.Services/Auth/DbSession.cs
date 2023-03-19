using KingdomChronicles.DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace KingdomChronicles.Services.Auth;

public class DbSession : IDbSession
{
    private readonly DataAccess.AppDbContext _appDbContext;
    private readonly Internal.IWebCookieService _webCookieService;
    private SessionEntity? _session;
    
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
    
    private async Task<SessionEntity> Create(int? userId = null)
    {
        var createdSession = new SessionEntity
        {
            Id = Guid.NewGuid(),
            Created = DateTime.UtcNow,
            LastAccessed = DateTime.UtcNow
        };
        if (userId.HasValue)
        {
            createdSession.UserId = userId;
        }
        await _appDbContext.Sessions.AddAsync(createdSession);
        await _appDbContext.SaveChangesAsync();
        return createdSession;
    }

    public async Task<SessionEntity> Get()
    {
        if (_session != null)
        {
            return _session;
        }
        
        string? sessionString = _webCookieService.Get(AuthConstants.SessionCookieName);
        Guid sessionId = sessionString == null ? Guid.NewGuid() : Guid.Parse(sessionString);

        var foundSession = await _appDbContext.Sessions.FirstOrDefaultAsync(s => s.Id == sessionId 
            && s.Created.AddDays(AuthConstants.SessionDaysLifetime) > DateTime.UtcNow);
        if (foundSession == null)
        {
            foundSession = await Create();
            StoreSession(foundSession.Id);
        }
        _session = foundSession;
        return foundSession;
    }

    public async Task SetUserId(int userId)
    {
        SessionEntity sessionEntity = await Create(userId);
        _session = sessionEntity;
        StoreSession(sessionEntity.Id);
    }

    public async Task<int?> GetUserId()
    {
        SessionEntity sessionEntity = await Get();
        return sessionEntity.UserId;
    }

    public async Task<bool> IsLoggedIn()
    {
        SessionEntity sessionEntity = await Get();
        return sessionEntity.UserId != null;
    }

    public async Task Destroy()
    {
        SessionEntity sessionEntity = await Get();
        _appDbContext.Sessions.Remove(sessionEntity);
        await _appDbContext.SaveChangesAsync();
        _webCookieService.Delete(AuthConstants.SessionCookieName);
    }
    
}