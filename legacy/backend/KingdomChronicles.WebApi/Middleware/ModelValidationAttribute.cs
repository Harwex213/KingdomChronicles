using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace KingdomChronicles.WebApi.Middleware;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class ModelValidationAttribute : Attribute, IActionFilter
{
    public void OnActionExecuting(ActionExecutingContext context)
    {
        if (context.ModelState.IsValid)
        {
            return;
        }

        var error = context.ModelState.FirstOrDefault(v => v.Value?.Errors.Count > 0);
        context.Result = new BadRequestObjectResult(new DTOs.ErrorDto { Message = error.Value!.Errors[0].ErrorMessage });
    }

    public void OnActionExecuted(ActionExecutedContext context) { }
}