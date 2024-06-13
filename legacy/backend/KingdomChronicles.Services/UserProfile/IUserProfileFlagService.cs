using KingdomChronicles.Services.DTOs.UserProfile;

namespace KingdomChronicles.Services.UserProfile;

public interface IUserProfileFlagService
{
    bool IsForegroundSvgExist(string name);
    bool IsEmblemSvgExist(string name);
    UserProfileFlagSvgsDto GetFlagPossibleSvgIcons();
    void LoadMeta(string rootPath);
}