using FullStackApp.Server.Models;

namespace FullStackApp.Server.Services
{
    public interface ICourseService
    {
        Task<List<Course>> GetAllCourses();
        Task<Course> GetCourseById(int id);
        Task<bool> CreateCourse(Course course);
        Task<bool> UpdateCourse(int id, Course updatedCourse);
        Task<bool> DeleteCourse(int id);
    }
}
