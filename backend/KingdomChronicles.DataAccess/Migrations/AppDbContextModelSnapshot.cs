﻿// <auto-generated />
using System;
using KingdomChronicles.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace KingdomChronicles.DataAccess.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.3")
                .HasAnnotation("Proxies:ChangeTracking", false)
                .HasAnnotation("Proxies:CheckEquality", false)
                .HasAnnotation("Proxies:LazyLoading", true)
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("KingdomChronicles.DataAccess.Entities.SessionEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Content")
                        .HasColumnType("text");

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("LastAccessed")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int?>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Sessions");
                });

            modelBuilder.Entity("KingdomChronicles.DataAccess.Entities.TitleEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("character varying(15)");

                    b.HasKey("Id");

                    b.ToTable("Titles");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "King"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Emperor"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Consul"
                        },
                        new
                        {
                            Id = 4,
                            Name = "Senator"
                        },
                        new
                        {
                            Id = 5,
                            Name = "Tsar"
                        },
                        new
                        {
                            Id = 6,
                            Name = "Prince"
                        },
                        new
                        {
                            Id = 7,
                            Name = "Nobleman"
                        },
                        new
                        {
                            Id = 8,
                            Name = "Trader"
                        });
                });

            modelBuilder.Entity("KingdomChronicles.DataAccess.Entities.UserEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("Salt")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.HasKey("Id");

                    b.HasIndex("Username")
                        .IsUnique()
                        .HasDatabaseName("UserEntityUniqueUsername");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("KingdomChronicles.DataAccess.Entities.UserProfileEntity", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.Property<string>("FlagBackgroundColor")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("FlagEmblemColor")
                        .HasColumnType("text");

                    b.Property<string>("FlagEmblemSvg")
                        .HasColumnType("text");

                    b.Property<string>("FlagForegroundColor")
                        .HasColumnType("text");

                    b.Property<string>("FlagForegroundSvg")
                        .HasColumnType("text");

                    b.Property<string>("KingdomName")
                        .IsRequired()
                        .HasMaxLength(35)
                        .HasColumnType("character varying(35)");

                    b.Property<string>("Motto")
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(25)
                        .HasColumnType("character varying(25)");

                    b.Property<int?>("TitleId")
                        .HasColumnType("integer");

                    b.HasKey("UserId");

                    b.ToTable("UserProfiles");
                });

            modelBuilder.Entity("KingdomChronicles.DataAccess.Entities.SessionEntity", b =>
                {
                    b.HasOne("KingdomChronicles.DataAccess.Entities.UserEntity", "User")
                        .WithMany("Sessions")
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("KingdomChronicles.DataAccess.Entities.UserProfileEntity", b =>
                {
                    b.HasOne("KingdomChronicles.DataAccess.Entities.TitleEntity", "TitleEntity")
                        .WithMany("Profiles")
                        .HasForeignKey("TitleId");

                    b.HasOne("KingdomChronicles.DataAccess.Entities.UserEntity", "UserEntity")
                        .WithOne("UserProfileEntity")
                        .HasForeignKey("KingdomChronicles.DataAccess.Entities.UserProfileEntity", "UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("TitleEntity");

                    b.Navigation("UserEntity");
                });

            modelBuilder.Entity("KingdomChronicles.DataAccess.Entities.TitleEntity", b =>
                {
                    b.Navigation("Profiles");
                });

            modelBuilder.Entity("KingdomChronicles.DataAccess.Entities.UserEntity", b =>
                {
                    b.Navigation("Sessions");

                    b.Navigation("UserProfileEntity")
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
