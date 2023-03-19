namespace KingdomChronicles.Services.DTOs;

public static class ValidationErrorMessages
{
    public const string UsernameRequired = "Username is required";
    public const string UsernameMaxLengthExceeded = "Username is too long";
    
    public const string PasswordRequired = "Password is required";
    public const string PasswordMinLengthExceeded = "Password is too short";
    public const string PasswordMaxLengthExceeded = "Password is too long";
    public const string RepeatedPasswordRequired = "Repeated password is required";

    public const string NameRequired = "In-game Name is required";
    public const string NameMaxLengthExceeded = "In-game Name is too long";
    
    public const string MottoMaxLengthExceeded = "Motto is too long";

    public const string TitleRequired = "Title is required";
}