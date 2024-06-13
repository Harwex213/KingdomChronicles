using System.Net;
using EntityFramework.Exceptions.Common;
using KingdomChronicles.DataAccess.Entities.Constraints;
using KingdomChronicles.Services.Exceptions;

namespace KingdomChronicles.WebApi.Middleware.Exceptions;

public class ExceptionAnalyzer : IExceptionAnalyzer
{
    private readonly ILogger<ExceptionAnalyzer> _logger;
    
    public ExceptionAnalyzer(ILogger<ExceptionAnalyzer> logger)
    {
        _logger = logger;
    }

    public ExceptionInfo Analyze(Exception exception)
    {
        var exceptionInfo = new ExceptionInfo();

        switch (exception)
        {
            case CannotInsertNullException:
            case MaxLengthExceededException:
            case NumericOverflowException:
            case ReferenceConstraintException:
                exceptionInfo.HttpCode = (int)HttpStatusCode.BadRequest;
                exceptionInfo.Message = ExceptionMessages.BadRequest;
                break;
            case UniqueConstraintException:
                exceptionInfo.HttpCode = (int)HttpStatusCode.BadRequest;
                exceptionInfo.Message = ExceptionMessages.BadRequest;
                if (exception.InnerException is Npgsql.PostgresException postgresException)
                {
                    exceptionInfo.Message = MapConstraintNameToError(postgresException.ConstraintName);
                }
                break;
            case BadRequestException:
                exceptionInfo.HttpCode = (int)HttpStatusCode.BadRequest;
                exceptionInfo.Message = exception.Message;
                break;
            case NotAuthorizedException:
                exceptionInfo.HttpCode = (int)HttpStatusCode.Unauthorized;
                exceptionInfo.Message = exception.Message;
                break;
            case NotFoundException:
                exceptionInfo.HttpCode = (int)HttpStatusCode.NotFound;
                exceptionInfo.Message = exception.Message;
                break;
            default:
                _logger.LogError("Server internal error: {errorMessage}", exception.Message);
                break;
        }

        return exceptionInfo;
    }
    
    private static string MapConstraintNameToError(string? constraintName)
    {
        return constraintName switch
        {
            UserConstraint.UsernameIndexName => "Username should be unique",
            _ => "Field should be unique"
        };
    }
}