using System.Net;
using KingdomChronicles.Services.Exceptions;

namespace KingdomChronicles.WebApi.Middleware.Exceptions;

public class ExceptionInfo
{
    public ExceptionInfo()
    {
        HttpCode = (int)HttpStatusCode.InternalServerError;
        Message = ExceptionMessages.InternalServerError;
    }

    public int HttpCode { get; set; }
    public string Message { get; set; }
}
