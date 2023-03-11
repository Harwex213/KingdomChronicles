using Microsoft.EntityFrameworkCore;

namespace KingdomChronicles.WebApi;

public static class ProgramHelper
{
    public static void AddServices(this IServiceCollection services)
    {
        services.AddSingleton<Middleware.Exceptions.IExceptionAnalyzer, Middleware.Exceptions.ExceptionAnalyzer>();
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