using FullStackApp.Data;
using FullStackApp.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace FullStackApp.Server.Services
{
    public class QuizService : IQuizService
    {
        private readonly AppDbContext _context;

        public QuizService(AppDbContext context)
        {
            _context = context;
        }

        // ✅ Get all quizzes for a course
        public async Task<List<Quiz>> GetQuizzesByCourse(int courseId)
        {
            return await _context.Quizzes.Where(q => q.CourseId == courseId).ToListAsync();
        }

        // ✅ Submit a quiz response and validate the answer
        public async Task<bool> SubmitQuizResponse(QuizResponse response)
        {
            var quiz = await _context.Quizzes.FindAsync(response.QuizId);
            if (quiz == null) return false;

            // Check if the submitted answer is correct
            response.IsCorrect = response.SelectedAnswer == quiz.CorrectAnswer;

            _context.QuizResponses.Add(response);
            await _context.SaveChangesAsync();

            return response.IsCorrect;
        }
    }
}
