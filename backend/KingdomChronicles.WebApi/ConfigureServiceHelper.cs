using KingdomChronicles.Services.Auth;
using KingdomChronicles.Services.UserProfile;
using KingdomChronicles.WebApi.Middleware;
using Microsoft.EntityFrameworkCore;

namespace KingdomChronicles.WebApi;

public static class ConfigureServiceHelper
{
    public static void AddServices(this IServiceCollection services, IWebHostEnvironment environment)
    {
        services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        services.AddSingleton<Middleware.Exceptions.IExceptionAnalyzer, Middleware.Exceptions.ExceptionAnalyzer>();

        // Services.Internal
        if (environment.IsProduction())
        {
            services.AddScoped<Services.Internal.IWebCookieService, Services.Internal.WebCookieService>();
        }
        
        if (environment.IsDevelopment())
        {
            services.AddScoped<Services.Internal.IWebCookieService, Services.Internal.DevWebCookieService>();
        }
        
        // Services.Auth
        services.AddScoped<IDbSession, DbSession>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddSingleton<IPasswordHasher, PasswordHasher>();
        
        // Services.UserProfile
        services.AddScoped<IUserProfileService, UserProfileService>();
        
        // Services.Title
        services.AddScoped<Services.Title.ITitleService, Services.Title.TitleService>();
    }

    public static void AddDatabase(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<DataAccess.AppDbContext>(options =>
        {
            options
                .UseLazyLoadingProxies()
                .UseNpgsql(configuration.GetConnectionString("DefaultConnection"));
        });
    }

    public static void AddCustomAuthentication(this IServiceCollection services)
    {
        services.AddOptions<CustomAuthenticationOptions>();
        services.AddAuthentication(Constants.MiddlewareConstants.AuthenticationScheme)
            .AddScheme<CustomAuthenticationOptions, CustomAuthenticationHandler>(
                Constants.MiddlewareConstants.AuthenticationScheme, null);
    }
}