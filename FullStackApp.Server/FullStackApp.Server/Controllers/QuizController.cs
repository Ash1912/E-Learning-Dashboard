using FullStackApp.Data;
using FullStackApp.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FullStackApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly AppDbContext _context;

        public QuizController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ Get all quiz questions for a course
        [HttpGet("{courseId}")]
        public async Task<IActionResult> GetQuizzes(int courseId)
        {
            try
            {
                var quizzes = await _context.Quizzes.Where(q => q.CourseId == courseId).ToListAsync();
                return Ok(quizzes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error retrieving quizzes", error = ex.Message });
            }
        }

        // ✅ Submit a quiz response (new table for storing answers)
        [HttpPost("submit")]
        public async Task<IActionResult> SubmitQuiz([FromBody] QuizResponse response)
        {
            try
            {
                if (response == null || string.IsNullOrEmpty(response.SelectedAnswer))
                    return BadRequest(new { message = "Invalid quiz response data" });

                var quiz = await _context.Quizzes.FindAsync(response.QuizId);
                if (quiz == null) return NotFound(new { message = "Quiz question not found" });

                response.IsCorrect = response.SelectedAnswer == quiz.CorrectAnswer;

                _context.QuizResponses.Add(response);
                await _context.SaveChangesAsync();

                if (response.IsCorrect)
                {
                    return Ok(new { message = "Correct answer!", isCorrect = true });
                }
                else
                {
                    return Ok(new { message = $"Incorrect! The correct answer is: {quiz.CorrectAnswer}", isCorrect = false });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error submitting quiz response", error = ex.Message });
            }
        }
    }
}
