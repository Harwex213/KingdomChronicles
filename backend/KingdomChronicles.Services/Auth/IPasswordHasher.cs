namespace KingdomChronicles.Services.Auth;

public interface IPasswordHasher
{
    string HashPassword(string password, string salt);
}