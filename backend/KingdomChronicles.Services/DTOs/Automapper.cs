using KingdomChronicles.DataAccess.Entities;
using KingdomChronicles.Services.DTOs.Auth;
using KingdomChronicles.Services.DTOs.Common;
using KingdomChronicles.Services.DTOs.UserProfile;

namespace KingdomChronicles.Services.DTOs;

public class Automapper : AutoMapper.Profile
{
    public Automapper()
    {
        MapAuthDto();
        MapUserProfileDto();
        MapTitleDto();
    }

    private void MapAuthDto()
    {
        CreateMap<RegisterDto, UserEntity>()
            .ForMember(u => u.PasswordHash, op => op.MapFrom(r => r.Password));
        CreateMap<LoginDto, UserEntity>();
    }

    private void MapUserProfileDto()
    {
        CreateProjection<UserProfileEntity, UserProfileDto>()
            .ForMember(dto => dto.Flag, op => op.MapFrom(u => new UserProfileFlagDto
            {
                BackgroundColor = u.FlagBackgroundColor,
                ForegroundColor = u.FlagForegroundColor,
                ForegroundSvg = u.FlagForegroundSvg,
                EmblemSvg = u.FlagEmblemSvg
            }));
    }

    private void MapTitleDto()
    {
        CreateProjection<TitleEntity, TitleDto>();
    }
}