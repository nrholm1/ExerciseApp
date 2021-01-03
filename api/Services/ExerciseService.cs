using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExerciseAPI.Entities;
using ExerciseAPI.Utils;
using Microsoft.EntityFrameworkCore;

namespace ExerciseAPI.Services
{
    public interface IExerciseService : IExService<Exercise>
    {
        // add ExerciseSpecific methods here
    }

    public class ExerciseService : IExerciseService
    {
        private readonly DataContext _context;

        public ExerciseService(DataContext context)
        {
            _context = context;
        }

        public async Task<Exercise> Create(Exercise entity)
        {
            await _context.Exercises.AddAsync(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<IEnumerable<Exercise>> GetAll()
        {
            return await _context.Exercises.ToListAsync();
        }

        public async Task<Exercise> GetById(int id)
        {
            Exercise exercise = await _context.Exercises.FindAsync(id);

            if (exercise != null)
                return exercise;
            
            throw new AppException($"No Exercise with ID {id} found.");
        }

        public async Task<Exercise> Update(Exercise entityParam)
        {
            throw new NotImplementedException();
        }

        public async Task Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
