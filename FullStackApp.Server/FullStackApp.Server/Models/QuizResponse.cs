﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FullStackApp.Server.Models
{
    public class QuizResponse
    {
        public int Id { get; set; }
        public int QuizId { get; set; }
        public int UserId { get; set; }

        [Required]
        public string SelectedAnswer { get; set; }

        [Required]
        public bool IsCorrect { get; set; }
    }
}
