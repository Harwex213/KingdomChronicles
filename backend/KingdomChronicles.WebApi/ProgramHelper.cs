using KingdomChronicles.Services.Auth;
using KingdomChronicles.Services.UserProfile;
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