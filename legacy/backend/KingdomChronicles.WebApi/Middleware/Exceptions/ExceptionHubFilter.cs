using Microsoft.AspNetCore.SignalR;

namespace KingdomChronicles.WebApi.Middleware.Exceptions;

public class ExceptionHubFilter : IHubFilter 
{
    private readonly IExceptionAnalyzer _exceptionAnalyzer;

    public ExceptionHubFilter(IExceptionAnalyzer exceptionAnalyzer)
    {
        _exceptionAnalyzer = exceptionAnalyzer;
    }

    public async ValueTask<object?> InvokeMethodAsync(
        HubInvocationContext invocationContext, Func<HubInvocationContext, ValueTask<object?>> next)
    {
        try
        {
            return await next(invocationContext);
        }
        catch (HubException)
        {
            throw;
        }
        catch (Exception ex)
        {
            ExceptionInfo exceptionInfo = _exceptionAnalyzer.Analyze(ex);
            throw new HubException(exceptionInfo.Message);
        }
    }
}