using FullStackApp.Data;
using FullStackApp.Server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FullStackApp.Server.Services
{
    public class CourseService : ICourseService
    {
        private readonly AppDbContext _context;

        public CourseService(AppDbContext context)
        {
            _context = context;
        }

        // ✅ Get all courses
        public async Task<List<Course>> GetAllCourses()
        {
            return await _context.Courses.ToListAsync();
        }

        // ✅ Get course by ID
        public async Task<Course> GetCourseById(int id)
        {
            return await _context.Courses.FindAsync(id);
        }

        // ✅ Create a new course (Ensures valid data)
        public async Task<bool> CreateCourse(Course course)
        {
            if (course == null || string.IsNullOrWhiteSpace(course.Title) || string.IsNullOrWhiteSpace(course.Description))
                return false;

            // Check for duplicate course title
            if (await _context.Courses.AnyAsync(c => c.Title == course.Title))
                return false;

            _context.Courses.Add(course);
            await _context.SaveChangesAsync();
            return true;
        }

        // ✅ Update an existing course
        public async Task<bool> UpdateCourse(int id, Course updatedCourse)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null) return false;

            // Ensure title is unique
            if (await _context.Courses.AnyAsync(c => c.Title == updatedCourse.Title && c.Id != id))
                return false;

            course.Title = updatedCourse.Title;
            course.Description = updatedCourse.Description;
            await _context.SaveChangesAsync();
            return true;
        }

        // ✅ Delete a course
        public async Task<bool> DeleteCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null) return false;

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
