using FullStackApp.Server.Models;

namespace FullStackApp.Server.Services
{
    public interface IQuizService
    {
        Task<List<Quiz>> GetQuizzesByCourse(int courseId);
        Task<string> SubmitQuizResponse(QuizResponse response);
    }
}
