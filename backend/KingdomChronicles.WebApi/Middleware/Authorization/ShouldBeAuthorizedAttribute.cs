﻿using KingdomChronicles.Services.Auth;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace KingdomChronicles.WebApi.Middleware.Authorization;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class ShouldBeAuthorizedAttribute : Attribute, IAsyncAuthorizationFilter
{
    public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
    {
        IDbSession dbSession = context.HttpContext.RequestServices.GetService<IDbSession>()!;

        bool isLoggedIn = await dbSession.IsLoggedIn();
        if (isLoggedIn == false)
        {
            context.Result = new UnauthorizedObjectResult(new DTOs.ErrorDto
            {
                Message = Constants.MiddlewareConstants.ShouldBeAuthorizedMessage
            });
        }
    }
}