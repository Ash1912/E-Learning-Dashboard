﻿USE E_LearningDB;

-- ✅ Drop tables if they exist (Maintain proper order for foreign key dependencies)
DROP TABLE IF EXISTS QuizResponses, Quizzes, Enrollments, Courses, Users;

-- ✅ Create Users Table (Includes Role with default "Student")
CREATE TABLE Users (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(255) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    Role NVARCHAR(50) DEFAULT 'Student' NOT NULL  -- ✅ Default role is "Student"
);

-- ✅ Create Courses Table (Includes ImageUrl)
CREATE TABLE Courses (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(200) UNIQUE NOT NULL,
    Description NVARCHAR(1000) NOT NULL,
    VideoUrl NVARCHAR(500) NOT NULL CHECK (VideoUrl LIKE 'https://%'),  -- ✅ Ensures valid URL
    ImageUrl NVARCHAR(500) NOT NULL CHECK (ImageUrl LIKE 'https://%')   -- ✅ Ensures valid URL
);

-- ✅ Create Enrollments Table (Includes Default Values)
CREATE TABLE Enrollments (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    CourseId INT NOT NULL,
    Status NVARCHAR(50) DEFAULT 'Unenrolled' NOT NULL,  -- ✅ Default Status
    Progress INT DEFAULT 0 NOT NULL CHECK (Progress BETWEEN 0 AND 100),  -- ✅ Ensures valid range (0-100)
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (CourseId) REFERENCES Courses(Id) ON DELETE CASCADE
);

-- ✅ Create Quizzes Table
CREATE TABLE Quizzes (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    CourseId INT NOT NULL,
    Question NVARCHAR(500) NOT NULL,
    OptionA NVARCHAR(200) NOT NULL,
    OptionB NVARCHAR(200) NOT NULL,
    OptionC NVARCHAR(200) NOT NULL,
    OptionD NVARCHAR(200) NOT NULL,
    CorrectAnswer NVARCHAR(200) NOT NULL,
    FOREIGN KEY (CourseId) REFERENCES Courses(Id) ON DELETE CASCADE
);

-- ✅ Create QuizResponses Table
CREATE TABLE QuizResponses (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    QuizId INT NOT NULL,
    UserId INT NOT NULL,
    SelectedAnswer NVARCHAR(200) NOT NULL,
    IsCorrect BIT NOT NULL,
    FOREIGN KEY (QuizId) REFERENCES Quizzes(Id) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
);

-- ✅ Insert Sample Users (Admin & Students)
INSERT INTO Users (Name, Email, PasswordHash, Role)
VALUES 
('Admin User', 'admin@example.com', 'hashed_admin_password', 'Admin'),
('John Doe', 'student@example.com', 'hashed_student_123', 'Student'),
('Jane Smith', 'jane@example.com', 'hashed_jane_123', 'Student'),
('Alice Brown', 'alice@example.com', 'hashed_alice_123', 'Student'),
('Bob Wilson', 'bob@example.com', 'hashed_bob_123', 'Student');

-- ✅ Insert Sample Courses (With Image URLs)
INSERT INTO Courses (Title, Description, VideoUrl, ImageUrl)
VALUES 
('React for Beginners', 'Learn the basics of React.', 
 'https://www.youtube.com/watch?v=Ke90Tje7VS0', 
 'https://i.ytimg.com/vi/Ke90Tje7VS0/maxresdefault.jpg'),

('ASP.NET Core Basics', 'Introduction to .NET Core.', 
 'https://www.youtube.com/watch?v=fmvcAzHpsk8', 
 'https://i.ytimg.com/vi/fmvcAzHpsk8/maxresdefault.jpg'),

('JavaScript Mastery', 'Deep dive into JavaScript concepts.', 
 'https://www.youtube.com/watch?v=W6NZfCO5SIk', 
 'https://i.ytimg.com/vi/W6NZfCO5SIk/maxresdefault.jpg'),

('Database Design', 'Learn about relational databases and SQL.', 
 'https://www.youtube.com/watch?v=ztHopE5Wnpc', 
 'https://i.ytimg.com/vi/ztHopE5Wnpc/maxresdefault.jpg'),

('Python for Data Science', 'Master Python for data analysis.', 
 'https://www.youtube.com/watch?v=LHBE6Q9XlzI', 
 'https://i.ytimg.com/vi/LHBE6Q9XlzI/maxresdefault.jpg'),

('Machine Learning Basics', 'Introduction to Machine Learning concepts.', 
 'https://www.youtube.com/watch?v=Gv9_4yMHFhI', 
 'https://i.ytimg.com/vi/Gv9_4yMHFhI/maxresdefault.jpg');

-- ✅ Insert Sample Enrollments
INSERT INTO Enrollments (UserId, CourseId, Status, Progress)
VALUES 
(2, 1, 'Enrolled', 0),  
(2, 2, 'Enrolled', 50),  
(3, 3, 'Enrolled', 100), 
(4, 4, 'Unenrolled', 10);

-- ✅ Insert Sample Quizzes
INSERT INTO Quizzes (CourseId, Question, OptionA, OptionB, OptionC, OptionD, CorrectAnswer)
VALUES 
(1, 'Who created React?', 'Facebook', 'Google', 'Microsoft', 'Apple', 'Facebook'),
(1, 'What is JSX?', 'JavaScript XML', 'JavaScript Extension', 'JSON Syntax', 'None of the above', 'JavaScript XML'),
(2, 'Which language is used in .NET Core?', 'C#', 'Python', 'Java', 'Ruby', 'C#'),
(2, 'What is the default HTTP port?', '80', '8080', '5000', '443', '5000'),
(3, 'Which keyword is used for declaring variables in JavaScript?', 'var', 'let', 'const', 'All of the above', 'All of the above'),
(3, 'What does "===" check in JavaScript?', 'Value only', 'Value and Type', 'Type only', 'None of the above', 'Value and Type'),
(4, 'What is the primary key in a database?', 'A unique identifier', 'A foreign key', 'An index', 'A constraint', 'A unique identifier'),
(4, 'Which SQL statement is used to retrieve data?', 'SELECT', 'DELETE', 'UPDATE', 'INSERT', 'SELECT'),
(5, 'Which library is widely used for data analysis in Python?', 'NumPy', 'TensorFlow', 'React', 'Pandas', 'Pandas'),
(5, 'Which Python module is used for data visualization?', 'Matplotlib', 'Scikit-learn', 'Seaborn', 'Both Matplotlib and Seaborn', 'Both Matplotlib and Seaborn'),
(6, 'What is supervised learning?', 'Training with labeled data', 'Training without labels', 'Training a robot', 'None of the above', 'Training with labeled data'),
(6, 'Which algorithm is used for classification?', 'K-Means', 'Decision Tree', 'Apriori', 'KNN', 'Decision Tree');

-- ✅ Insert Sample Quiz Responses
INSERT INTO QuizResponses (QuizId, UserId, SelectedAnswer, IsCorrect)
VALUES 
(1, 2, 'Facebook', 1),  
(2, 3, 'JavaScript Extension', 0), 
(3, 4, 'C#', 1),  
(4, 5, '8080', 0),  
(5, 2, 'All of the above', 1),  
(6, 3, 'Value and Type', 1);  

-- ✅ Select Statements for Verification
SELECT * FROM Users;
SELECT * FROM Courses;
SELECT * FROM Enrollments;
SELECT * FROM Quizzes;
SELECT * FROM QuizResponses;

-- ✅ Clear All Tables (Use carefully!)
-- TRUNCATE TABLE QuizResponses;
-- TRUNCATE TABLE Quizzes;
-- TRUNCATE TABLE Enrollments;
-- TRUNCATE TABLE Courses;
-- TRUNCATE TABLE Users;
