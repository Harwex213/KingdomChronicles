using Newtonsoft.Json;

namespace KingdomChronicles.WebApi.Middleware.Exceptions;

public class ExceptionHandlerMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IExceptionAnalyzer _exceptionAnalyzer;

    public ExceptionHandlerMiddleware(RequestDelegate next,
        IExceptionAnalyzer exceptionAnalyzer)
    {
        _next = next;
        _exceptionAnalyzer = exceptionAnalyzer;
    }
    
    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception e)
        {
            ExceptionInfo exceptionInfo = _exceptionAnalyzer.Analyze(e);
            HttpResponse response = context.Response;
            response.StatusCode = exceptionInfo.HttpCode;
            response.ContentType = "application/json";
            string result = JsonConvert.SerializeObject(new DTOs.ErrorDto { Message = exceptionInfo.Message });
            await response.WriteAsync(result);
        }
    }
}