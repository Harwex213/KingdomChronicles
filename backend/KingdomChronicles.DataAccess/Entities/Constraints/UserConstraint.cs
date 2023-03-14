namespace KingdomChronicles.DataAccess.Entities.Constraints;

public static class UserConstraint
{
    public const int UsernameMaxLength = 20;
    public const int PasswordHashMaxLength = 100;
    public const int SaltMaxLength = 50;
    public const string UsernameIndexName = "UserEntityUniqueUsername";
}