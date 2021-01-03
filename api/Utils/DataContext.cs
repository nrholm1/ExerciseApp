using Microsoft.EntityFrameworkCore;
using ExerciseAPI.Entities;

namespace ExerciseAPI.Utils
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}

        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<Set> Sets { get; set; }
        public DbSet<Workout> Workouts { get; set; }
    }
}
