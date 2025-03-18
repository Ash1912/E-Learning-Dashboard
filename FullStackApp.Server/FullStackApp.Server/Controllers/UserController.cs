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
    //[Authorize]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ Register a new user (uses DTOs and input validation)
        //[HttpPost("register")]
        //[AllowAnonymous]  // 🔓 Allows new users to register
        //public async Task<IActionResult> Register([FromBody] RegisterDTO registerDto)
        //{
        //    try
        //    {
        //        if (string.IsNullOrWhiteSpace(registerDto.Name) ||
        //            string.IsNullOrWhiteSpace(registerDto.Email) ||
        //            string.IsNullOrWhiteSpace(registerDto.Password))
        //            return BadRequest(new { message = "All fields are required." });

        //        if (await _context.Users.AnyAsync(u => u.Email == registerDto.Email))
        //            return BadRequest(new { message = "User with this email already exists." });

        //        // Hash password before storing
        //        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(registerDto.Password);

        //        var user = new User
        //        {
        //            Name = registerDto.Name,
        //            Email = registerDto.Email,
        //            PasswordHash = hashedPassword,
        //            Role = registerDto.Role ?? "Student" // Assign default role if none provided
        //        };

        //        _context.Users.Add(user);
        //        await _context.SaveChangesAsync();
        //        return Ok(new { message = "User registered successfully!" });
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, new { message = "Error registering user", error = ex.Message });
        //    }
        //}

        // ✅ Get all users (Admin Only)
        [HttpGet("all")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await _context.Users
                    .Select(u => new { u.Id, u.Name, u.Email, u.Role })
                    .ToListAsync();

                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error fetching users", error = ex.Message });
            }
        }

        // ✅ Get user by ID
        [HttpGet("{userId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUser(int userId)
        {
            try
            {
                var user = await _context.Users.FindAsync(userId);
                if (user == null) return NotFound(new { message = "User not found" });

                return Ok(new { id = user.Id, name = user.Name, email = user.Email, role = user.Role });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error retrieving user", error = ex.Message });
            }
        }

        // ✅ Update user profile
        [HttpPut("update")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateUserDTO updatedUser)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    var errors = ModelState.Values
                                           .SelectMany(v => v.Errors)
                                           .Select(e => e.ErrorMessage)
                                           .ToList();
                    return BadRequest(new { message = "Validation failed", errors });
                }

                var user = await _context.Users.FindAsync(updatedUser.Id);
                if (user == null) return NotFound(new { message = "User not found" });

                // ✅ Ensure email is unique (excluding current user)
                if (await _context.Users.AnyAsync(u => u.Email == updatedUser.Email && u.Id != updatedUser.Id))
                    return BadRequest(new { message = "Email is already in use" });

                // ✅ Check if changes were made
                bool isModified = false;

                if (user.Name != updatedUser.Name)
                {
                    user.Name = updatedUser.Name;
                    isModified = true;
                }

                if (user.Email != updatedUser.Email)
                {
                    user.Email = updatedUser.Email;
                    isModified = true;
                }

                if (!string.IsNullOrWhiteSpace(updatedUser.Password) && !BCrypt.Net.BCrypt.Verify(updatedUser.Password, user.PasswordHash))
                {
                    user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(updatedUser.Password);
                    isModified = true;
                }

                // ✅ If no changes, return success without modifying the database
                if (!isModified)
                {
                    return Ok(new { message = "No changes detected, profile remains the same." });
                }

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
