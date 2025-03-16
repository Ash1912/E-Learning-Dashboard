using FullStackApp.Data;
using FullStackApp.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace FullStackApp.Server.Services
{
    public class EnrollmentService : IEnrollmentService
    {
        private readonly AppDbContext _context;

        public EnrollmentService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<string> EnrollUser(Enrollment enrollment)
        {
            var existingEnrollment = await _context.Enrollments
                .FirstOrDefaultAsync(e => e.UserId == enrollment.UserId && e.CourseId == enrollment.CourseId);

            if (existingEnrollment != null)
                return "User is already enrolled in this course.";

            _context.Enrollments.Add(enrollment);
            await _context.SaveChangesAsync();
            return "Enrollment Successful!";
        }

        public async Task<List<Enrollment>> GetUserEnrollments(int userId)
        {
            return await _context.Enrollments.Where(e => e.UserId == userId).ToListAsync();
        }
    }
}
