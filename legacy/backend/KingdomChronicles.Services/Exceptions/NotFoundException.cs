namespace KingdomChronicles.Services.Exceptions;

public class NotFoundException : Exception
{
    public NotFoundException(string message = ExceptionMessages.NotFound) : base(message)
    {
    }
}