-- AptiBattle Database Schema
-- Create database
CREATE DATABASE IF NOT EXISTS aptibattle;
USE aptibattle;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    firebase_uid VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    profile_picture VARCHAR(500),
    total_games_played INT DEFAULT 0,
    total_games_won INT DEFAULT 0,
    total_score INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category ENUM('APTITUDE', 'LOGICAL_REASONING', 'QUANTITATIVE', 'VERBAL', 'GENERAL_KNOWLEDGE', 'PROGRAMMING') NOT NULL,
    difficulty ENUM('EASY', 'MEDIUM', 'HARD') NOT NULL,
    time_per_question INT DEFAULT 30,
    total_questions INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Questions table
CREATE TABLE IF NOT EXISTS questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    quiz_id BIGINT NOT NULL,
    question_text TEXT NOT NULL,
    option_a VARCHAR(500) NOT NULL,
    option_b VARCHAR(500) NOT NULL,
    option_c VARCHAR(500) NOT NULL,
    option_d VARCHAR(500) NOT NULL,
    correct_answer ENUM('A', 'B', 'C', 'D') NOT NULL,
    explanation TEXT,
    points INT DEFAULT 10,
    order_index INT NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

-- Quiz Sessions table
CREATE TABLE IF NOT EXISTS quiz_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    session_code VARCHAR(8) UNIQUE NOT NULL,
    quiz_id BIGINT NOT NULL,
    host_id BIGINT NOT NULL,
    status ENUM('WAITING', 'ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'WAITING',
    max_players INT DEFAULT 10,
    current_question_index INT DEFAULT 0,
    started_at DATETIME,
    ended_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id),
    FOREIGN KEY (host_id) REFERENCES users(id)
);

-- Player Sessions table
CREATE TABLE IF NOT EXISTS player_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    session_id BIGINT NOT NULL,
    total_score INT DEFAULT 0,
    correct_answers INT DEFAULT 0,
    wrong_answers INT DEFAULT 0,
    unanswered_questions INT DEFAULT 0,
    total_time_spent BIGINT DEFAULT 0,
    position INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    joined_at DATETIME,
    left_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (session_id) REFERENCES quiz_sessions(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_session (user_id, session_id)
);

-- Player Answers table
CREATE TABLE IF NOT EXISTS player_answers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    player_session_id BIGINT NOT NULL,
    question_id BIGINT NOT NULL,
    selected_answer ENUM('A', 'B', 'C', 'D'),
    is_correct BOOLEAN DEFAULT FALSE,
    points_earned INT DEFAULT 0,
    time_spent BIGINT DEFAULT 0,
    is_answered BOOLEAN DEFAULT FALSE,
    answered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (player_session_id) REFERENCES player_sessions(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id),
    UNIQUE KEY unique_player_question (player_session_id, question_id)
);

-- Insert sample quiz data
INSERT INTO quizzes (title, description, category, difficulty, total_questions) VALUES
('Aptitude Basics', 'Basic aptitude questions covering logical reasoning and quantitative skills', 'APTITUDE', 'EASY', 10),
('Advanced Logical Reasoning', 'Complex logical reasoning problems for advanced users', 'LOGICAL_REASONING', 'HARD', 15),
('Quick Math Challenge', 'Fast-paced quantitative questions', 'QUANTITATIVE', 'MEDIUM', 12);

-- Insert sample questions for first quiz
INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, order_index) VALUES
(1, 'What is 15% of 200?', '25', '30', '35', '40', 'B', '15% of 200 = (15/100) × 200 = 30', 1),
(1, 'If a train travels 60 km in 45 minutes, what is its speed in km/h?', '70 km/h', '75 km/h', '80 km/h', '85 km/h', 'C', 'Speed = Distance/Time = 60/(45/60) = 60/(3/4) = 80 km/h', 2),
(1, 'Which number comes next in the series: 2, 6, 12, 20, ?', '28', '30', '32', '35', 'B', 'Pattern: 2×1+0=2, 2×2+2=6, 3×3+3=12, 4×4+4=20, 5×5+5=30', 3),
(1, 'A shopkeeper marks his goods 25% above cost price and gives 10% discount. His profit percentage is:', '12.5%', '15%', '10%', '20%', 'A', 'Let CP = 100, MP = 125, SP = 125×0.9 = 112.5, Profit% = 12.5%', 4),
(1, 'The sum of three consecutive even numbers is 48. What is the largest number?', '14', '16', '18', '20', 'C', 'Let the numbers be x, x+2, x+4. Then x+(x+2)+(x+4)=48, 3x+6=48, x=14. Largest = 18', 5);

-- Create indexes for better performance
CREATE INDEX idx_quiz_sessions_code ON quiz_sessions(session_code);
CREATE INDEX idx_quiz_sessions_host ON quiz_sessions(host_id);
CREATE INDEX idx_player_sessions_user ON player_sessions(user_id);
CREATE INDEX idx_player_sessions_session ON player_sessions(session_id);
CREATE INDEX idx_questions_quiz ON questions(quiz_id);
CREATE INDEX idx_player_answers_session ON player_answers(player_session_id);