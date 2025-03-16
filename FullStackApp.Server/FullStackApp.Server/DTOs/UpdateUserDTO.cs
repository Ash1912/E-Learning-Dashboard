namespace FullStackApp.Server.DTOs
{
    public class UpdateUserDTO
    {
        public int Id { get; set; } // ✅ Required for update
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; } // Optional: Only if updating password
    }
}
