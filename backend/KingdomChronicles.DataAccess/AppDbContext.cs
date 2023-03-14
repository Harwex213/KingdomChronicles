using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using EntityFramework.Exceptions.PostgreSQL;
using KingdomChronicles.DataAccess.Entities;
using KingdomChronicles.DataAccess.Entities.Constraints;

namespace KingdomChronicles.DataAccess;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Session> Sessions { get; set; } = null!;
    public DbSet<User> Users { get; set; } = null!;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseExceptionProcessor();
    }

    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        base.ConfigureConventions(configurationBuilder);
        
        configurationBuilder.Conventions.Remove(typeof(ForeignKeyIndexConvention));
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        ConfigureSessionEntity(modelBuilder.Entity<Session>());
        ConfigureUserEntity(modelBuilder.Entity<User>());
    }

    private static void ConfigureSessionEntity(EntityTypeBuilder<Session> typeBuilder)
    {
        typeBuilder.HasKey(s => s.Id);
        
        // UserId
        typeBuilder
            .HasOne(s => s.User)
            .WithMany(e => e.Sessions)
            .HasForeignKey(s => s.UserId);
    }
    
    private static void ConfigureUserEntity(EntityTypeBuilder<User> typeBuilder)
    {
        // Primary key
        typeBuilder.HasKey(u => u.Id);

        // Username
        typeBuilder
            .Property(u => u.Username)
            .HasMaxLength(UserConstraint.UsernameMaxLength)
            .IsRequired();
        
        typeBuilder
            .HasIndex(u => u.Username)
            .HasDatabaseName(UserConstraint.UsernameIndexName)
            .IsUnique();

        // Password Hash
        typeBuilder
            .Property(u => u.PasswordHash)
            .HasMaxLength(UserConstraint.PasswordHashMaxLength)
            .IsRequired();
        
        // Salt
        typeBuilder
            .Property(u => u.Salt)
            .HasMaxLength(UserConstraint.SaltMaxLength)
            .IsRequired();
    }
}