using KingdomChronicles.DataAccess.Entities;
using KingdomChronicles.Services.DTOs.Auth;

namespace KingdomChronicles.Services.Auth;

public interface IAuthService
{
    Task ValidateUsername(string email);
    
    Task CreateUser(UserEntity userEntity);
    
    Task Register(RegisterDto user);

    Task Login(LoginDto loginDto);

    Task Logout();
}