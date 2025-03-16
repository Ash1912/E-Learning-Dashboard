using FullStackApp.Data;
using FullStackApp.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using BCrypt.Net;
using FullStackApp.Server.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace FullStackApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ Register a new user (uses DTOs and input validation)
        [HttpPost("register")]
        [AllowAnonymous]  // 🔓 Allows new users to register
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDto)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(registerDto.Name) ||
                    string.IsNullOrWhiteSpace(registerDto.Email) ||
                    string.IsNullOrWhiteSpace(registerDto.Password))
                    return BadRequest(new { message = "All fields are required." });

                if (await _context.Users.AnyAsync(u => u.Email == registerDto.Email))
                    return BadRequest(new { message = "User with this email already exists." });

                // Hash password before storing
                var hashedPassword = BCrypt.Net.BCrypt.HashPassword(registerDto.Password);

                var user = new User
                {
                    Name = registerDto.Name,
                    Email = registerDto.Email,
                    PasswordHash = hashedPassword
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return Ok(new { message = "User registered successfully!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error registering user", error = ex.Message });
            }
        }

        // ✅ Get user by ID (hides password hash)
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUser(int userId)
        {
            try
            {
                var user = await _context.Users.FindAsync(userId);
                if (user == null) return NotFound(new { message = "User not found" });

                return Ok(new { id = user.Id, name = user.Name, email = user.Email });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error retrieving user", error = ex.Message });
            }
        }

        // ✅ Update user profile (Ensures email uniqueness & password update)
        [HttpPut("update")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateUserDTO updatedUser)
        {
            try
            {
                var user = await _context.Users.FindAsync(updatedUser.Id);
                if (user == null) return NotFound(new { message = "User not found" });

                // Prevent updating email to an already registered one
                if (await _context.Users.AnyAsync(u => u.Email == updatedUser.Email && u.Id != updatedUser.Id))
                    return BadRequest(new { message = "Email is already in use by another user" });

                user.Name = updatedUser.Name;
                user.Email = updatedUser.Email;

                // ✅ Update password if provided
                if (!string.IsNullOrWhiteSpace(updatedUser.Password))
                    user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(updatedUser.Password);

                await _context.SaveChangesAsync();

                return Ok(new { message = "Profile updated successfully!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error updating profile", error = ex.Message });
            }
        }
    }
}
