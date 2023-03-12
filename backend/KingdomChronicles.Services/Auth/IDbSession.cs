using KingdomChronicles.DataAccess.Entities;

namespace KingdomChronicles.Services.Auth;

public interface IDbSession
{
    Task<Session> GetSession();

    Task SetUserId(int userId);

    Task<int?> GetUserId();

    Task<bool> IsLoggedIn();
}