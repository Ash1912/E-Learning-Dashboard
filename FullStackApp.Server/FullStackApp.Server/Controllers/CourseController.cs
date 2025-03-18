using FullStackApp.Data;
using FullStackApp.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FullStackApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CourseController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ Get all courses (async + error handling)
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetCourses()
        {
            try
            {
                List<Course> courses = await _context.Courses.ToListAsync();
                return Ok(courses);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error retrieving courses", error = ex.Message });
            }
        }

        // ✅ Get a single course by ID
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetCourseById(int id)
        {
            try
            {
                var course = await _context.Courses.FindAsync(id);
                if (course == null)
                    return NotFound(new { message = "Course not found" });

                return Ok(course);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error retrieving course", error = ex.Message });
            }
        }

        // ✅ Create a new course (validates uniqueness)
        [HttpPost]
        [Authorize(Roles = "Admin")]  // ✅ Only Admins can create courses
        public async Task<IActionResult> CreateCourse([FromBody] Course course)
        {
            try
            {
                if (course == null || string.IsNullOrEmpty(course.Title) || string.IsNullOrEmpty(course.Description) || string.IsNullOrEmpty(course.VideoUrl) || string.IsNullOrEmpty(course.ImageUrl))
                    return BadRequest(new { message = "Invalid course data or All fields are required including Video URL and Image URL." });

                // ✅ Case-Insensitive Title Check
                if (await _context.Courses.AnyAsync(c => c.Title.ToLower() == course.Title.ToLower()))
                    return BadRequest(new { message = "Course with this title already exists." });

                _context.Courses.Add(course);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetCourseById), new { id = course.Id }, course);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error creating course", error = ex.Message });
            }
        }

        // ✅ Update an existing course
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]  // ✅ Only Admins can update courses
        public async Task<IActionResult> UpdateCourse(int id, [FromBody] Course updatedCourse)
        {
            try
            {
                var course = await _context.Courses.FindAsync(id);
                if (course == null)
                    return NotFound(new { message = "Course not found" });

                // Validate input
                if (string.IsNullOrEmpty(updatedCourse.Title) || string.IsNullOrEmpty(updatedCourse.Description) || string.IsNullOrEmpty(updatedCourse.ImageUrl))
                {
                    return BadRequest(new { message = "All fields are required, including Image URL." });
                }

                // ✅ Case-Insensitive Title Check (excluding current course)
                if (await _context.Courses.AnyAsync(c => c.Title.ToLower() == updatedCourse.Title.ToLower() && c.Id != id))
                    return BadRequest(new { message = "Course with this title already exists." });

                course.Title = updatedCourse.Title;
                course.Description = updatedCourse.Description;
                course.VideoUrl = updatedCourse.VideoUrl; // ✅ Update Video URL
                course.ImageUrl = updatedCourse.ImageUrl;  // ✅ Update Image URL
                await _context.SaveChangesAsync();

                return Ok(new { message = "Course updated successfully!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error updating course", error = ex.Message });
            }
        }

        // ✅ Delete a course
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]  // ✅ Only Admins can delete courses
        public async Task<IActionResult> DeleteCourse(int id)
        {
            try
            {
                var course = await _context.Courses.FindAsync(id);
                if (course == null)
                    return NotFound(new { message = "Course not found" });

                _context.Courses.Remove(course);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Course deleted successfully!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error deleting course", error = ex.Message });
            }
        }
    }
}
