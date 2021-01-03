using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ExerciseAPI.Entities;
using ExerciseAPI.Utils;

namespace ExerciseAPI.Services
{
    // generic interface for CRUD operations to adhere to DRY principle
    public interface IExService<T> where T : IExEntity
    {
        Task<T> Create(T entity);
        Task<IEnumerable<T>> GetAll();
        Task<T> GetById(int id);
        Task<T> Update(int id, T entityParam);
        Task Delete(int id);
    }
}
