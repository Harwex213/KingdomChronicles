using KingdomChronicles.Services.Internal;
using KingdomChronicles.Services.Auth;
using Microsoft.EntityFrameworkCore;

namespace KingdomChronicles.WebApi;

public static class ProgramHelper
{
    public static void AddServices(this IServiceCollection services)
    {
        services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        services.AddSingleton<Middleware.Exceptions.IExceptionAnalyzer, Middleware.Exceptions.ExceptionAnalyzer>();

        // Services.Internal
        services.AddScoped<IWebCookieService, WebCookieService>();
        
        // Services.Auth
        services.AddScoped<IDbSession, DbSession>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddSingleton<IPasswordHasher, PasswordHasher>();
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

    public static void UpdateDatabaseMigrations(this IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<DataAccess.AppDbContext>();    
        dbContext.Database.Migrate();
    }
}