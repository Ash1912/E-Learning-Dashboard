using System.ComponentModel.DataAnnotations;

namespace FullStackApp.Server.Models
{
    public class Course
    {
        public int Id { get; set; }
        [Required, MaxLength(200)]
        public string Title { get; set; }

        [Required, MaxLength(1000)]
        public string Description { get; set; }

        [Required, Url] // ✅ Ensures a valid URL is provided
        public string VideoUrl { get; set; }

        [Required, Url] // ✅ Ensures a valid Image URL
        public string ImageUrl { get; set; }

    }
}
