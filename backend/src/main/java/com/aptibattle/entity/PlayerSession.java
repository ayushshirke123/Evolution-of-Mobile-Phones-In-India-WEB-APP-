package com.aptibattle.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "player_sessions", 
       uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "session_id"}))
public class PlayerSession {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id", nullable = false)
    private QuizSession session;
    
    @Column(nullable = false)
    private Integer totalScore = 0;
    
    @Column(nullable = false)
    private Integer correctAnswers = 0;
    
    @Column(nullable = false)
    private Integer wrongAnswers = 0;
    
    @Column(nullable = false)
    private Integer unansweredQuestions = 0;
    
    @Column(nullable = false)
    private Long totalTimeSpent = 0L; // in milliseconds
    
    @Column(nullable = false)
    private Integer position = 0; // leaderboard position
    
    @Column(nullable = false)
    private Boolean isActive = true;
    
    @Column
    private LocalDateTime joinedAt;
    
    @Column
    private LocalDateTime leftAt;
    
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    @OneToMany(mappedBy = "playerSession", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<PlayerAnswer> answers;
    
    // Constructors
    public PlayerSession() {}
    
    public PlayerSession(User user, QuizSession session) {
        this.user = user;
        this.session = session;
        this.joinedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public User getUser() {
        return user;
    }
    
    public void setUser(User user) {
        this.user = user;
    }
    
    public QuizSession getSession() {
        return session;
    }
    
    public void setSession(QuizSession session) {
        this.session = session;
    }
    
    public Integer getTotalScore() {
        return totalScore;
    }
    
    public void setTotalScore(Integer totalScore) {
        this.totalScore = totalScore;
    }
    
    public Integer getCorrectAnswers() {
        return correctAnswers;
    }
    
    public void setCorrectAnswers(Integer correctAnswers) {
        this.correctAnswers = correctAnswers;
    }
    
    public Integer getWrongAnswers() {
        return wrongAnswers;
    }
    
    public void setWrongAnswers(Integer wrongAnswers) {
        this.wrongAnswers = wrongAnswers;
    }
    
    public Integer getUnansweredQuestions() {
        return unansweredQuestions;
    }
    
    public void setUnansweredQuestions(Integer unansweredQuestions) {
        this.unansweredQuestions = unansweredQuestions;
    }
    
    public Long getTotalTimeSpent() {
        return totalTimeSpent;
    }
    
    public void setTotalTimeSpent(Long totalTimeSpent) {
        this.totalTimeSpent = totalTimeSpent;
    }
    
    public Integer getPosition() {
        return position;
    }
    
    public void setPosition(Integer position) {
        this.position = position;
    }
    
    public Boolean getIsActive() {
        return isActive;
    }
    
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
    
    public LocalDateTime getJoinedAt() {
        return joinedAt;
    }
    
    public void setJoinedAt(LocalDateTime joinedAt) {
        this.joinedAt = joinedAt;
    }
    
    public LocalDateTime getLeftAt() {
        return leftAt;
    }
    
    public void setLeftAt(LocalDateTime leftAt) {
        this.leftAt = leftAt;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    public List<PlayerAnswer> getAnswers() {
        return answers;
    }
    
    public void setAnswers(List<PlayerAnswer> answers) {
        this.answers = answers;
    }
}