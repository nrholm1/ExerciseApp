using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ExerciseAPI.Entities
{
    public class Workout : IExEntity
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public DateTime DateCreated { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double AvgDifficulty { get; set; }
        public double Rating { get; set; }
    }
}
