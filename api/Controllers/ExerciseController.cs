using ExerciseAPI.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExerciseAPI.Services;
using ExerciseAPI.Utils;

namespace ExerciseAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ExerciseController : ControllerBase
    {
        private readonly ILogger<ExerciseController> _logger;
        private readonly IExerciseService _exerciseService;

        public ExerciseController(ILogger<ExerciseController> logger, IExerciseService exerciseService)
        {
            _exerciseService = exerciseService;
            _logger = logger;

        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var exercises = await _exerciseService.GetAll();
            return Ok(exercises);
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var exercise = await _exerciseService.GetById(id);
            return Ok(exercise);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]Exercise exercise)
        {
            try
            {
                await _exerciseService.Create(exercise);
                return Ok();
            }
            catch (AppException e) 
            {
                return BadRequest(new {message = e.Message});
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Exercise entityParam)
        {
            // mapping from model to entity here when creating models
            entityParam.Id = id;

            try
            {
                await _exerciseService.Update(entityParam);
                return Ok();
            }
            catch (AppException e)
            {
                return BadRequest(new { message = e.Message });
            }
        }
    }
}
