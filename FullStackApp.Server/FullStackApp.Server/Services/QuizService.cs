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
        public async Task<string> SubmitQuizResponse(QuizResponse response)
        {
            var quiz = await _context.Quizzes.FindAsync(response.QuizId);
            if (quiz == null) return "Quiz not found!";

            // ✅ Prevent multiple submissions
            var existingResponse = await _context.QuizResponses
                .FirstOrDefaultAsync(r => r.QuizId == response.QuizId && r.UserId == response.UserId);

            if (existingResponse != null)
                return "You have already attempted this quiz!";

            // ✅ Ensure selected answer is valid
            if (!new[] { quiz.OptionA, quiz.OptionB, quiz.OptionC, quiz.OptionD }.Contains(response.SelectedAnswer))
                return "Invalid answer selection.";

            response.IsCorrect = response.SelectedAnswer == quiz.CorrectAnswer;

            _context.QuizResponses.Add(response);
            await _context.SaveChangesAsync();

            return response.IsCorrect ? "Correct answer!" : $"Incorrect! The correct answer is: {quiz.CorrectAnswer}";
        }
    }
}
