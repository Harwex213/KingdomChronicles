using AutoMapper;
using KingdomChronicles.DataAccess.Entities;
using KingdomChronicles.Services.DTOs.Auth;

namespace KingdomChronicles.Services.DTOs;

public class Automapper : Profile
{
    public Automapper()
    {
        MapAuthDto();
    }

    private void MapAuthDto()
    {
        CreateMap<RegisterDto, User>()
            .ForMember(u => u.PasswordHash, op => op.MapFrom(r => r.Password));
        CreateMap<LoginDto, User>();
    }
}