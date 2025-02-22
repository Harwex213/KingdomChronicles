﻿using KingdomChronicles.DataAccess.Entities;
using KingdomChronicles.Services.DTOs.Auth;
using KingdomChronicles.Services.DTOs.Common;
using KingdomChronicles.Services.DTOs.Game;
using KingdomChronicles.Services.DTOs.UserProfile;
using KingdomChronicles.Services.Game;

namespace KingdomChronicles.Services.DTOs;

public class Automapper : AutoMapper.Profile
{
    public Automapper()
    {
        MapAuthDto();
        MapUserProfileDto();
        MapTitleDto();
        MapGameDto();
    }

    private void MapAuthDto()
    {
        CreateMap<RegisterDto, UserEntity>()
            .ForMember(u => u.PasswordHash, op => op.MapFrom(r => r.Password));
        CreateMap<LoginDto, UserEntity>();
    }

    private void MapUserProfileDto()
    {
        CreateMap<UserProfileEntity, UserProfileDto>()
            .ForMember(dto => dto.Flag, op => op.MapFrom(u => new UserProfileFlagDto
            {
                BackgroundColor = u.FlagBackgroundColor,
                ForegroundColor = u.FlagForegroundColor,
                ForegroundSvg = u.FlagForegroundSvg,
                EmblemColor = u.FlagEmblemColor,
                EmblemSvg = u.FlagEmblemSvg
            }));
    }

    private void MapTitleDto()
    {
        CreateProjection<TitleEntity, TitleDto>();
    }

    private void MapGameDto()
    {
        CreateMap<CreateGameDto, PendingStartGame>();
        CreateMap<PendingStartGame, PendingStartGameDto>()
            .ForMember(dto => dto.Players, op => op.MapFrom(
                e => e.UserProfiles.Select(p => p.Name).ToArray())
            );
        CreateMap<PendingStartGame, StartedGame>();
    }
}