using FullStackApp.Server.Models;

namespace FullStackApp.Server.Services
{
    public interface IEnrollmentService
    {
        Task<string> EnrollUser(Enrollment enrollment);
        Task<List<Enrollment>> GetUserEnrollments(int userId);
    }
}
