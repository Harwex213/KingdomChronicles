using KingdomChronicles.WebApi;
using KingdomChronicles.WebApi.BackgroundServices;
using KingdomChronicles.WebApi.Middleware.Exceptions;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

JsonConvert.DefaultSettings = () => new JsonSerializerSettings
{
    ContractResolver = new CamelCasePropertyNamesContractResolver()
};

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddDatabase(builder.Configuration);
builder.Services.AddAutoMapper(typeof(KingdomChronicles.Services.DTOs.Automapper).Assembly);
builder.Services.AddServices(builder.Environment);
builder.Services.AddCustomAuthentication();
builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.AddSwaggerGen(o =>
{
    o.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
});
builder.Services.ConfigureSignalR();
builder.Services.AddHostedService<GameTickerHostedService>();

WebApplication app = builder.Build();

if (app.Environment.IsProduction())
{
    app.Services.UpdateDatabaseMigrations();
}

app.UseSwagger();
app.UseSwaggerUI();
app.UseCors();
app.UseMiddleware<ExceptionHandlerMiddleware>();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.UseSignalrHubs();

app.Run();