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

    public DbSet<UserProfileEntity> UserProfiles { get; set; }
    public DbSet<TitleEntity> Titles { get; set; }
    public DbSet<SessionEntity> Sessions { get; set; }
    public DbSet<UserEntity> Users { get; set; }

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
        
        ConfigureSessionEntity(modelBuilder.Entity<SessionEntity>());
        ConfigureUserEntity(modelBuilder.Entity<UserEntity>());
        ConfigureTitleEntity(modelBuilder.Entity<TitleEntity>());
        ConfigureUserProfileEntity(modelBuilder.Entity<UserProfileEntity>());
    }

    private static void ConfigureSessionEntity(EntityTypeBuilder<SessionEntity> typeBuilder)
    {
        // Primary key
        typeBuilder.HasKey(s => s.Id);
        
        // UserId
        typeBuilder
            .HasOne(s => s.User)
            .WithMany(e => e.Sessions)
            .HasForeignKey(s => s.UserId);
    }
    
    private static void ConfigureUserEntity(EntityTypeBuilder<UserEntity> typeBuilder)
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

    private static void ConfigureTitleEntity(EntityTypeBuilder<TitleEntity> typeBuilder)
    {
        // Primary key
        typeBuilder.HasKey(t => t.Id);
        
        // Name
        typeBuilder
            .Property(t => t.Name)
            .HasMaxLength(TitleConstraint.NameMaxLength)
            .IsRequired();

        // Initial Data
        typeBuilder.HasData(TitleEntity.InitialData);
    }
    

    private static void ConfigureUserProfileEntity(EntityTypeBuilder<UserProfileEntity> typeBuilder)
    {
        // Primary key
        typeBuilder.HasKey(p => p.UserId);
        
        // UserId
        typeBuilder
            .HasOne(p => p.UserEntity)
            .WithOne(u => u.UserProfileEntity)
            .HasForeignKey<UserProfileEntity>(p => p.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        // Name
        typeBuilder
            .Property(p => p.Name)
            .HasMaxLength(UserProfileConstraint.NameMaxLength)
            .IsRequired();
        
        // Motto
        typeBuilder
            .Property(p => p.Motto)
            .HasMaxLength(UserProfileConstraint.MottoMaxLength);
        
        // Title
        typeBuilder
            .HasOne(p => p.TitleEntity)
            .WithMany(t => t.Profiles)
            .HasForeignKey(p => p.TitleId);
    }
}