using KingdomChronicles.Services.DTOs.UserProfile;

namespace KingdomChronicles.Services.UserProfile;

public class UserProfileFlagService : IUserProfileFlagService
{
    private const string ForegroundSvgIconsPath = "flag/foreground";
    private const string EmblemSvgIconsPath = "flag/emblem";
    
    private List<string> _possibleForegroundSvgIcons;
    private List<string> _possibleEmblemSvgIcons;
    
    public void LoadMeta(string rootPath)
    {
        throw new NotImplementedException();
    }
    
    public bool IsForegroundSvgExist(string name)
    {
        throw new NotImplementedException();
    }

    public bool IsEmblemSvgExist(string name)
    {
        throw new NotImplementedException();
    }

    public UserProfileFlagSvgsDto GetFlagPossibleSvgIcons()
    {
        throw new NotImplementedException();
    }
}