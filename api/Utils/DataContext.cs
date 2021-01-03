using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ExerciseAPI.Entities;

namespace ExerciseAPI.Utils
{
    public class DataContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public DataContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer(Configuration.GetConnectionString("PostgresConnectionString"));
        }

        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<Set> Sets { get; set; }
        public DbSet<Workout> Workouts { get; set; }
    }
}
