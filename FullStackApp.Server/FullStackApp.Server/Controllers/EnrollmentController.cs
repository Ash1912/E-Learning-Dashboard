using FullStackApp.Data;
using FullStackApp.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FullStackApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnrollmentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EnrollmentController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ Enroll a user in a course (prevents duplicate enrollments)
        [HttpPost("enroll")]
        [Authorize(Roles = "Student")]  // ✅ Only Students can enroll
        public async Task<IActionResult> EnrollUser([FromBody] Enrollment enrollment)
        {
            try
            {
                var existingEnrollment = await _context.Enrollments
                    .FirstOrDefaultAsync(e => e.UserId == enrollment.UserId && e.CourseId == enrollment.CourseId);

                if (existingEnrollment != null)
                    return BadRequest(new { message = "User is already enrolled in this course." });

                _context.Enrollments.Add(enrollment);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Enrollment Successful!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error enrolling user", error = ex.Message });
            }
        }

        // ✅ Get all courses a user is enrolled in
        [HttpGet("{userId}")]
        [Authorize(Roles = "Student")]  // ✅ Only Students can view their enrollments
        public async Task<IActionResult> GetUserEnrollments(int userId)
        {
            try
            {
                var enrollments = await _context.Enrollments.Where(e => e.UserId == userId).ToListAsync();
                return Ok(enrollments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error fetching enrollments", error = ex.Message });
            }
        }

        // ✅ Update user's progress in a course
        [HttpPut("update-progress")]
        public async Task<IActionResult> UpdateProgress([FromBody] Enrollment enrollment)
        {
            try
            {
                var record = await _context.Enrollments
                    .FirstOrDefaultAsync(e => e.UserId == enrollment.UserId && e.CourseId == enrollment.CourseId);

                if (record == null)
                    return NotFound(new { message = "Enrollment not found" });

                record.Progress = enrollment.Progress;
                await _context.SaveChangesAsync();
                return Ok(new { message = "Progress updated successfully!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error updating progress", error = ex.Message });
            }
        }
    }
}
