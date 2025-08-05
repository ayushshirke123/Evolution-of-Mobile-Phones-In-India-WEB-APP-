package com.aptibattle.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "player_answers",
       uniqueConstraints = @UniqueConstraint(columnNames = {"player_session_id", "question_id"}))
public class PlayerAnswer {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "player_session_id", nullable = false)
    private PlayerSession playerSession;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;
    
    @Enumerated(EnumType.STRING)
    @Column
    private Question.CorrectOption selectedAnswer;
    
    @Column(nullable = false)
    private Boolean isCorrect = false;
    
    @Column(nullable = false)
    private Integer pointsEarned = 0;
    
    @Column(nullable = false)
    private Long timeSpent = 0L; // in milliseconds
    
    @Column(nullable = false)
    private Boolean isAnswered = false;
    
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime answeredAt;
    
    // Constructors
    public PlayerAnswer() {}
    
    public PlayerAnswer(PlayerSession playerSession, Question question) {
        this.playerSession = playerSession;
        this.question = question;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public PlayerSession getPlayerSession() {
        return playerSession;
    }
    
    public void setPlayerSession(PlayerSession playerSession) {
        this.playerSession = playerSession;
    }
    
    public Question getQuestion() {
        return question;
    }
    
    public void setQuestion(Question question) {
        this.question = question;
    }
    
    public Question.CorrectOption getSelectedAnswer() {
        return selectedAnswer;
    }
    
    public void setSelectedAnswer(Question.CorrectOption selectedAnswer) {
        this.selectedAnswer = selectedAnswer;
        this.isAnswered = selectedAnswer != null;
        this.isCorrect = selectedAnswer != null && selectedAnswer.equals(question.getCorrectAnswer());
        this.pointsEarned = this.isCorrect ? question.getPoints() : 0;
    }
    
    public Boolean getIsCorrect() {
        return isCorrect;
    }
    
    public void setIsCorrect(Boolean isCorrect) {
        this.isCorrect = isCorrect;
    }
    
    public Integer getPointsEarned() {
        return pointsEarned;
    }
    
    public void setPointsEarned(Integer pointsEarned) {
        this.pointsEarned = pointsEarned;
    }
    
    public Long getTimeSpent() {
        return timeSpent;
    }
    
    public void setTimeSpent(Long timeSpent) {
        this.timeSpent = timeSpent;
    }
    
    public Boolean getIsAnswered() {
        return isAnswered;
    }
    
    public void setIsAnswered(Boolean isAnswered) {
        this.isAnswered = isAnswered;
    }
    
    public LocalDateTime getAnsweredAt() {
        return answeredAt;
    }
    
    public void setAnsweredAt(LocalDateTime answeredAt) {
        this.answeredAt = answeredAt;
    }
}