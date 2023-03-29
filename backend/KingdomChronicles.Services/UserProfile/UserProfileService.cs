using KingdomChronicles.Services.DTOs.UserProfile;
using Microsoft.EntityFrameworkCore;

namespace KingdomChronicles.Services.UserProfile;

public class UserProfileService : IUserProfileService
{
    private readonly DataAccess.AppDbContext _appDbContext;
    private readonly Auth.IDbSession _dbSession;
    private readonly AutoMapper.IMapper _mapper;

    public UserProfileService(DataAccess.AppDbContext appDbContext, 
        Auth.IDbSession dbSession, 
        AutoMapper.IMapper mapper)
    {
        _appDbContext = appDbContext;
        _dbSession = dbSession;
        _mapper = mapper;
    }

    public async Task<UserProfileDto> GetProfile()
    {
        var userId = await _dbSession.GetUserId();
        var query = _appDbContext.UserProfiles.Where(p => p.UserId == userId!.Value);
        return await _mapper.ProjectTo<UserProfileDto>(query).FirstAsync();
    }

    public Task EditProfileInfo(EditUserProfileInfoDto editUserProfileInfoDto)
    {
        throw new NotImplementedException();
    }

    public Task EditProfileFlag(EditUserProfileFlagDto editUserProfileFlagDto)
    {
        throw new NotImplementedException();
    }
}