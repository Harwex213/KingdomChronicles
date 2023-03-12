using KingdomChronicles.DataAccess.Entities;

namespace KingdomChronicles.Services.Auth;

public interface IAuthService
{
    Task ValidateUsername(string email);
    
    Task CreateUser(User user);
    
    Task Register(User user);

    Task Login(string login, string password);
}