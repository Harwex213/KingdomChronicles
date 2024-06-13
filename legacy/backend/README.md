### How to run

1) run `database/run_database.bat`

2) `dotnet run`

### Database Migrations

`dotnet ef migrations add [migration_name] -s ./KingdomChronicles.WebApi/KingdomChronicles.WebApi.csproj -p KingdomChronicles.DataAccess/KingdomChronicles.DataAccess.csproj`

`dotnet ef migrations remove -s ./KingdomChronicles.WebApi/KingdomChronicles.WebApi.csproj -p KingdomChronicles.DataAccess/KingdomChronicles.DataAccess.csproj`
add *--force* to remove migration (and unaply from database?)

`dotnet ef database update`
