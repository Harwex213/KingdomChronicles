namespace KingdomChronicles.WebApi.Middleware.Exceptions;

public interface IExceptionAnalyzer
{
    ExceptionInfo Analyze(Exception exception);
}