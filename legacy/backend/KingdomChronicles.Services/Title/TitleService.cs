using KingdomChronicles.Services.DTOs.Common;
using Microsoft.EntityFrameworkCore;

namespace KingdomChronicles.Services.Title;

public class TitleService : ITitleService
{
    private readonly DataAccess.AppDbContext _appDbContext;
    private readonly AutoMapper.IMapper _mapper;

    public TitleService(DataAccess.AppDbContext appDbContext, AutoMapper.IMapper mapper)
    {
        _appDbContext = appDbContext;
        _mapper = mapper;
    }

    public async Task<IEnumerable<TitleDto>> GetPossibleTitles()
    {
        var titles = _appDbContext.Titles.AsNoTracking();
        return await _mapper.ProjectTo<TitleDto>(titles).ToListAsync();
    }
}