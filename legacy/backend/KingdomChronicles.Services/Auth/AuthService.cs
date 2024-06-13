using System.Text;
using AutoMapper;
using KingdomChronicles.DataAccess.Entities;
using KingdomChronicles.Services.DTOs.Auth;
using KingdomChronicles.Services.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace KingdomChronicles.Services.Auth;

public class AuthService : IAuthService
{
    private readonly DataAccess.AppDbContext _appDbContext;
    private readonly IDbSession _dbSession;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IMapper _mapper;
    
    public AuthService(DataAccess.AppDbContext appDbContext, 
        IDbSession dbSession, 
        IPasswordHasher passwordHasher, 
        IMapper mapper)
    {
        _appDbContext = appDbContext;
        _dbSession = dbSession;
        _passwordHasher = passwordHasher;
        _mapper = mapper;
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

    public async Task Login(LoginDto loginDto)
    {
        var user = await _appDbContext.Users.FirstOrDefaultAsync(u => u.Username == loginDto.Username);
        if (user == null || _passwordHasher.HashPassword(loginDto.Password!, user.Salt) != user.PasswordHash)
        {
            throw new CannotLoginException();
        }

        await AuthenticateUser(user.Id);
    }
    
    public async Task CreateUser(UserEntity userEntity)
    {
        userEntity.Salt = Guid.NewGuid().ToString();
        userEntity.PasswordHash = _passwordHasher.HashPassword(userEntity.PasswordHash, userEntity.Salt);

        await _appDbContext.Users.AddAsync(userEntity);
        await _appDbContext.SaveChangesAsync();
        await AuthenticateUser(userEntity.Id);
    }

    private async Task CreateUserProfile(UserEntity userEntity)
    {
        var userProfileEntity = new UserProfileEntity
        {
            UserId = userEntity.Id,
            Name = userEntity.Username,
            KingdomName = "Realm of " + userEntity.Username,
            TitleId = TitleEntity.DefaultTitleId,
            FlagBackgroundColor = Internal.Utils.GetRandomHexColor()
        };
        
        await _appDbContext.UserProfiles.AddAsync(userProfileEntity);
        await _appDbContext.SaveChangesAsync();
    }

    public async Task Register(RegisterDto registerDto)
    {
        if (registerDto.Password != registerDto.RepeatedPassword)
        {
            throw new PasswordAndRepeatedPasswordNotEqualsException();
        }

        var user = _mapper.Map<UserEntity>(registerDto);
        
        using (var scope = ServiceHelper.CreateTransactionScope())
        {
            await ValidateUsername(user.Username);
            await CreateUser(user);
            await CreateUserProfile(user);
            scope.Complete();
        }
    }

    public async Task Logout()
    {
        await _dbSession.Destroy();
    }
}