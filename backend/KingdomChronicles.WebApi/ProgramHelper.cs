using KingdomChronicles.Services.Internal;
using KingdomChronicles.Services.Auth;
using Microsoft.EntityFrameworkCore;

namespace KingdomChronicles.WebApi;

public static class ProgramHelper
{
    public static void AddServices(this IServiceCollection services, IWebHostEnvironment environment)
    {
        services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        services.AddSingleton<Middleware.Exceptions.IExceptionAnalyzer, Middleware.Exceptions.ExceptionAnalyzer>();

        // Services.Internal
        if (environment.IsProduction())
        {
            services.AddScoped<IWebCookieService, WebCookieService>();
        }
        
        if (environment.IsDevelopment())
        {
            services.AddScoped<IWebCookieService, DevWebCookieService>();
        }
        
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

    public static void UseCors(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.UseCors(b =>
            {
                b.SetIsOriginAllowed(_ => true);
                b.AllowAnyHeader();
                b.AllowAnyMethod();
                b.AllowCredentials();
            });
        }

        if (app.Environment.IsProduction())
        {
            // TODO: set production cors
        }
    }
}