using KingdomChronicles.DataAccess.Entities;

namespace KingdomChronicles.Services.Auth;

public interface IDbSession
{
    Task<SessionEntity> Get();
    
    Task Destroy();
    
    Task SetUserId(int userId);

    Task<int?> GetUserId();

    Task<bool> IsLoggedIn();

}