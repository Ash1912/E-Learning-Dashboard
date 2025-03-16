using Microsoft.EntityFrameworkCore;
using FullStackApp.Server.Models;

namespace FullStackApp.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Enrollment> Enrollments { get; set; }
        public DbSet<Quiz> Quizzes { get; set; }
        public DbSet<QuizResponse> QuizResponses { get; set; } // ✅ Added QuizResponses
    }
}
