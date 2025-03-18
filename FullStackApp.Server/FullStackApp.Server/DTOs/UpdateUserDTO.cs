using System.ComponentModel.DataAnnotations;

namespace FullStackApp.Server.DTOs
{
    public class UpdateUserDTO
    {
        [Required(ErrorMessage = "User ID is required.")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        [StringLength(100, ErrorMessage = "Name must be between 2 and 100 characters.", MinimumLength = 2)]
        public string Name { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string Email { get; set; }

        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters long.")]
        public string? Password { get; set; }

    }
}
