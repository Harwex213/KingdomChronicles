namespace KingdomChronicles.Services.Exceptions;

public class NotAuthorizedException : Exception
{
    public NotAuthorizedException(string message = ExceptionMessages.Unauthorized) : base(message)
    {
    }
}