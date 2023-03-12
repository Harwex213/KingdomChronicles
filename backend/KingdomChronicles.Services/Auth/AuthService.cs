using KingdomChronicles.DataAccess.Entities;
using KingdomChronicles.Services.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace KingdomChronicles.Services.Auth;

public class AuthService : IAuthService
{
    private readonly DataAccess.AppDbContext _appDbContext;
    private readonly IDbSession _dbSession;
    private readonly IPasswordHasher _passwordHasher;
    
    public AuthService(DataAccess.AppDbContext appDbContext, 
        IDbSession dbSession, 
        IPasswordHasher passwordHasher)
    {
        _appDbContext = appDbContext;
        _dbSession = dbSession;
        _passwordHasher = passwordHasher;
    }

    private async Task AuthenticateUser(int userId)
    {
        await _dbSession.SetUserId(userId);
    }
    
    public async Task ValidateUsername(string username)
    {
        var user = await _appDbContext.Users.FirstOrDefaultAsync(u => u.Username == username);
        if (user?.Id != null)
            throw new DuplicateLoginException();
    }

    public async Task Login(string username, string password)
    {
        var user = await _appDbContext.Users.FirstOrDefaultAsync(u => u.Username == username);
        if (user == null || _passwordHasher.HashPassword(password, user.Salt) != user.PasswordHash)
        {
            throw new CannotLoginException();
        }

        await AuthenticateUser(user.Id);
    }
    
    public async Task CreateUser(User user)
    {
        user.Salt = Guid.NewGuid().ToString();
        user.PasswordHash = _passwordHasher.HashPassword(user.PasswordHash, user.Salt);

        await _appDbContext.Users.AddAsync(user);
        await _appDbContext.SaveChangesAsync();
        await AuthenticateUser(user.Id);
    }

    public async Task Register(User user)
    {
        using (var scope = ServiceHelper.CreateTransactionScope())
        {
            await ValidateUsername(user.Username);
            await CreateUser(user);
            scope.Complete();
        }
    }
}