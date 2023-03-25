using KingdomChronicles.WebApi.Hubs;
using Microsoft.EntityFrameworkCore;

namespace KingdomChronicles.WebApi;

public static class ConfigureHelper
{
    
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
    }

    public static void UseSignalrHubs(this WebApplication app)
    {
        app.MapHub<StartGameHub>($"/{Constants.GameHubConstants.Route}");
    }
}