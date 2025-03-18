using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace FullStackApp.Server.Models
{
    public class Enrollment
    {
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }

        [Required]
        public int CourseId { get; set; }

        [Required]
        [DefaultValue("Unenrolled")] // ✅ Default status
        public string Status { get; set; }

        [Required]
        [Range(0, 100)] // ✅ Ensures valid progress range
        public int Progress { get; set; } = 0;

    }
}
