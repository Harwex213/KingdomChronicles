using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace KingdomChronicles.Services.Auth;

public class PasswordHasher : IPasswordHasher
{
    private const int IterationCount = 100_000;
    private const int KeyBytesLength = 64;
    
    public string HashPassword(string password, string salt)
    {
        return Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password,
            System.Text.Encoding.ASCII.GetBytes(salt),
            KeyDerivationPrf.HMACSHA512,
            IterationCount,
            KeyBytesLength
        ));
    }
}