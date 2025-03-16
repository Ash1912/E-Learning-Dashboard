-- ✅ Drop tables if they exist
DROP TABLE IF EXISTS QuizResponses, Quizzes, Enrollments, Courses, Users;

-- ✅ Create Users Table
CREATE TABLE Users (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(255) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    Role NVARCHAR(20) DEFAULT 'Student' NOT NULL
);

-- ✅ Create Courses Table
CREATE TABLE Courses (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(255) UNIQUE NOT NULL,
    Description TEXT NOT NULL
);

-- ✅ Create Enrollments Table (Updated with Status column)
CREATE TABLE Enrollments (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    CourseId INT NOT NULL,
    Status NVARCHAR(50) DEFAULT 'Enrolled' NOT NULL,
    Progress INT DEFAULT 0 NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (CourseId) REFERENCES Courses(Id) ON DELETE CASCADE
);

-- ✅ Create Quizzes Table
CREATE TABLE Quizzes (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    CourseId INT NOT NULL,
    Question NVARCHAR(500) NOT NULL,
    OptionA NVARCHAR(255) NOT NULL,
    OptionB NVARCHAR(255) NOT NULL,
    OptionC NVARCHAR(255) NOT NULL,
    OptionD NVARCHAR(255) NOT NULL,
    CorrectAnswer NVARCHAR(255) NOT NULL,
    FOREIGN KEY (CourseId) REFERENCES Courses(Id) ON DELETE CASCADE
);

-- ✅ Create QuizResponses Table
CREATE TABLE QuizResponses (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    QuizId INT NOT NULL,
    UserId INT NOT NULL,
    SelectedAnswer NVARCHAR(255) NOT NULL,
    IsCorrect BIT NOT NULL,
    FOREIGN KEY (QuizId) REFERENCES Quizzes(Id) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
);

-- ✅ Insert Sample Admin User
INSERT INTO Users (Name, Email, PasswordHash, Role)
VALUES 
('Admin User', 'admin@example.com', 'hashed_admin_password', 'Admin');

-- ✅ Insert Sample Student Users
INSERT INTO Users (Name, Email, PasswordHash, Role)
VALUES 
('John Doe', 'student@example.com', 'john@123', 'Student'),
('Jane Smith', 'jane@example.com', 'jane@123', 'Student');

-- ✅ Insert Sample Courses
INSERT INTO Courses (Title, Description)
VALUES 
('React for Beginners', 'Learn the basics of React.'),
('ASP.NET Core Basics', 'Introduction to .NET Core.');

-- ✅ Insert Sample Enrollments with Status
INSERT INTO Enrollments (UserId, CourseId, Status, Progress)
VALUES 
(2, 1, 'Enrolled', 20),  -- John Doe in React Course (20% progress)
(3, 2, 'Enrolled', 50);  -- Jane Smith in .NET Course (50% progress)

-- ✅ Insert Sample Quizzes
INSERT INTO Quizzes (CourseId, Question, OptionA, OptionB, OptionC, OptionD, CorrectAnswer)
VALUES 
(1, 'What is React?', 'Library', 'Framework', 'Language', 'Database', 'Library'),
(2, 'What is ASP.NET Core?', 'Front-End Framework', 'Back-End Framework', 'Database', 'Scripting Language', 'Back-End Framework');

-- ✅ Insert Sample Quiz Responses
INSERT INTO QuizResponses (QuizId, UserId, SelectedAnswer, IsCorrect)
VALUES 
(1, 2, 'Library', 1),   -- John answered correctly
(2, 3, 'Database', 0);  -- Jane answered incorrectly

SELECT * FROM Users;
SELECT * FROM Courses;
SELECT * FROM Enrollments;
SELECT * FROM Quizzes;
SELECT * FROM QuizResponses;
