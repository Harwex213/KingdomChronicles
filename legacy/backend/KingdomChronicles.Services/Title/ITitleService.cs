using KingdomChronicles.Services.DTOs.Common;

namespace KingdomChronicles.Services.Title;

public interface ITitleService
{
    Task<IEnumerable<TitleDto>> GetPossibleTitles();
}