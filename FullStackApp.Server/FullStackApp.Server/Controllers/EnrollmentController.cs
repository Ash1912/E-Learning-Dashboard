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

        // ✅ Enroll or Unenroll a user from a course
        [HttpPost("toggle-enrollment")]
        public async Task<IActionResult> ToggleEnrollment([FromBody] Enrollment enrollment)
        {
            try
            {
                Console.WriteLine($"🔍 Received Enrollment Request: UserId={enrollment.UserId}, CourseId={enrollment.CourseId}");

                if (enrollment.UserId <= 0 || enrollment.CourseId <= 0)
                {
                    return BadRequest(new { message = "Invalid UserId or CourseId." });
                }
                var existingEnrollment = await _context.Enrollments
                            .FirstOrDefaultAsync(e => e.UserId == enrollment.UserId && e.CourseId == enrollment.CourseId);

                if (existingEnrollment != null)
                {
                    _context.Enrollments.Remove(existingEnrollment);
                    await _context.SaveChangesAsync();
                    return Ok(new { message = "Unenrolled successfully, progress reset to 0." });
                }

                _context.Enrollments.Add(new Enrollment
                {
                    UserId = enrollment.UserId,
                    CourseId = enrollment.CourseId,
                    Status = "Enrolled",
                    Progress = 0
                });

                await _context.SaveChangesAsync();
                return Ok(new { message = "Enrolled successfully!" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error Processing Enrollment: {ex.Message}");
                return StatusCode(500, new { message = "Error processing enrollment", error = ex.Message });
            }
        }

        // ✅ Enroll a user in a course (prevents duplicate enrollments)
        [HttpPost("enroll")]
        //[Authorize]  // ✅ Only Students can enroll
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
        //[Authorize(Roles = "Student")]
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
