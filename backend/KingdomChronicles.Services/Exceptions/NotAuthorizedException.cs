namespace KingdomChronicles.Services.Exceptions;

public class NotAuthorizedException : Exception
{
    public NotAuthorizedException(string message = ExceptionMessages.Unauthorized) : base(message)
    {
    }
}

internal class CannotLoginException : NotAuthorizedException
{
    public CannotLoginException() : base(ExceptionMessages.UnauthorizedMessages.CannotLogin)
    {
    }
}