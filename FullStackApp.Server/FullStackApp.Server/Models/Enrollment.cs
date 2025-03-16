using System.ComponentModel.DataAnnotations;

namespace FullStackApp.Server.Models
{
    public class Enrollment
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CourseId { get; set; }
        
        [Required]
        public string Status { get; set; } = "Enrolled"; // Default status
        
        [Required]
        public int Progress { get; set; } = 0; // Default progress

    }
}
