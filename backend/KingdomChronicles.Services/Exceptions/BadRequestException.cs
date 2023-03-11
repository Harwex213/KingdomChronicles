namespace KingdomChronicles.Services.Exceptions;

public class BadRequestException : Exception
{
    public BadRequestException(string message = ExceptionMessages.BadRequest) : base(message) 
    {
    }
}