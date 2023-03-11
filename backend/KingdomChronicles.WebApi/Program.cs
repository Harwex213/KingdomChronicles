using KingdomChronicles.WebApi;
using KingdomChronicles.WebApi.Middleware.Exceptions;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddDatabase(builder.Configuration);
builder.Services.AddServices();
builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.AddSwaggerGen(o =>
{
    o.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
});

WebApplication app = builder.Build();

if (app.Environment.IsProduction())
{
    app.Services.UpdateDatabaseMigrations();
}

app.UseSwagger();
app.UseSwaggerUI();
app.UseMiddleware<ExceptionHandlerMiddleware>();
app.MapControllers();

app.Run();