using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ExerciseAPI.Entities
{
    public class Set : IExEntity
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public DateTime DateCreated { get; set; }
        [Required]
        public int WorkoutId { get; set; }
        [Required]
        public int ExerciseId { get; set; }

        public int SetCount { get; set; }
        public int RepCount { get; set; }

    }
}
