namespace KingdomChronicles.Services.Exceptions;

public class BadRequestException : Exception
{
    public BadRequestException(string message = ExceptionMessages.BadRequest) : base(message) 
    {
    }
}

internal class DuplicateLoginException : BadRequestException
{
    public DuplicateLoginException() : base (ExceptionMessages.BadRequestMessages.DuplicateLogin)
    {
    }
}

internal class PasswordAndRepeatedPasswordNotEqualsException : BadRequestException
{
    public PasswordAndRepeatedPasswordNotEqualsException() 
        : base (ExceptionMessages.BadRequestMessages.PasswordAndRepeatedPasswordNotEquals)
    {
    }
}

internal class CannotLoginException : BadRequestException
{
    public CannotLoginException() : base(ExceptionMessages.UnauthorizedMessages.CannotLogin)
    {
    }
}