using System;
using System.ComponentModel.DataAnnotations;

namespace ExerciseAPI.Entities
{
    public interface IExEntity
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public DateTime DateCreated { get; set; }
    }
}
