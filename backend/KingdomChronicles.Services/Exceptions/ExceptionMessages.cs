namespace KingdomChronicles.Services.Exceptions;

public static class ExceptionMessages
{
    public const string InternalServerError = "Internal server error";
    public const string BadRequest = "Bad request";
    public const string NotFound = "Not found";
    public const string Unauthorized = "Unathorized";

    public static class BadRequestMessages
    {
        public const string DuplicateLogin = "Such login is already taken";
    }

    public static class UnauthorizedMessages
    {
        public const string CannotLogin = "Login or password are incorrect";
    }
}