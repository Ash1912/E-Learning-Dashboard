using System.ComponentModel.DataAnnotations;

namespace FullStackApp.Server.Models
{
    public class Quiz
    {
        public int Id { get; set; }
        [Required]
        public int CourseId { get; set; }

        [Required, MaxLength(500)]
        public string Question { get; set; }

        [Required, MaxLength(200)]
        public string OptionA { get; set; }

        [Required, MaxLength(200)]
        public string OptionB { get; set; }

        [Required, MaxLength(200)]
        public string OptionC { get; set; }

        [Required, MaxLength(200)]
        public string OptionD { get; set; }

        [Required, MaxLength(200)]
        public string CorrectAnswer { get; set; }
    }
}
