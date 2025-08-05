package com.aptibattle.repository;

import com.aptibattle.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    
    List<Quiz> findByIsActiveTrue();
    
    List<Quiz> findByCategory(Quiz.QuizCategory category);
    
    List<Quiz> findByDifficulty(Quiz.DifficultyLevel difficulty);
    
    List<Quiz> findByCategoryAndDifficulty(Quiz.QuizCategory category, Quiz.DifficultyLevel difficulty);
    
    @Query("SELECT q FROM Quiz q WHERE q.title LIKE %:title% AND q.isActive = true")
    List<Quiz> findByTitleContainingAndIsActiveTrue(@Param("title") String title);
    
    @Query("SELECT q FROM Quiz q WHERE q.isActive = true ORDER BY q.createdAt DESC")
    List<Quiz> findActiveQuizzesOrderByCreatedAtDesc();
    
    @Query("SELECT COUNT(qs) FROM QuizSession qs WHERE qs.quiz.id = :quizId")
    Long countSessionsByQuizId(@Param("quizId") Long quizId);
}