package com.aptibattle.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@Entity
@Table(name = "questions")
public class Question {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Column(nullable = false, columnDefinition = "TEXT")
    private String questionText;
    
    @NotBlank
    @Column(nullable = false)
    private String optionA;
    
    @NotBlank
    @Column(nullable = false)
    private String optionB;
    
    @NotBlank
    @Column(nullable = false)
    private String optionC;
    
    @NotBlank
    @Column(nullable = false)
    private String optionD;
    
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CorrectOption correctAnswer;
    
    @Column(columnDefinition = "TEXT")
    private String explanation;
    
    @Column(nullable = false)
    private Integer points = 10;
    
    @Column(nullable = false)
    private Integer orderIndex;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;
    
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<PlayerAnswer> playerAnswers;
    
    // Enum for correct answer
    public enum CorrectOption {
        A, B, C, D
    }
    
    // Constructors
    public Question() {}
    
    public Question(String questionText, String optionA, String optionB, 
                   String optionC, String optionD, CorrectOption correctAnswer) {
        this.questionText = questionText;
        this.optionA = optionA;
        this.optionB = optionB;
        this.optionC = optionC;
        this.optionD = optionD;
        this.correctAnswer = correctAnswer;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getQuestionText() {
        return questionText;
    }
    
    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }
    
    public String getOptionA() {
        return optionA;
    }
    
    public void setOptionA(String optionA) {
        this.optionA = optionA;
    }
    
    public String getOptionB() {
        return optionB;
    }
    
    public void setOptionB(String optionB) {
        this.optionB = optionB;
    }
    
    public String getOptionC() {
        return optionC;
    }
    
    public void setOptionC(String optionC) {
        this.optionC = optionC;
    }
    
    public String getOptionD() {
        return optionD;
    }
    
    public void setOptionD(String optionD) {
        this.optionD = optionD;
    }
    
    public CorrectOption getCorrectAnswer() {
        return correctAnswer;
    }
    
    public void setCorrectAnswer(CorrectOption correctAnswer) {
        this.correctAnswer = correctAnswer;
    }
    
    public String getExplanation() {
        return explanation;
    }
    
    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }
    
    public Integer getPoints() {
        return points;
    }
    
    public void setPoints(Integer points) {
        this.points = points;
    }
    
    public Integer getOrderIndex() {
        return orderIndex;
    }
    
    public void setOrderIndex(Integer orderIndex) {
        this.orderIndex = orderIndex;
    }
    
    public Quiz getQuiz() {
        return quiz;
    }
    
    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }
    
    public List<PlayerAnswer> getPlayerAnswers() {
        return playerAnswers;
    }
    
    public void setPlayerAnswers(List<PlayerAnswer> playerAnswers) {
        this.playerAnswers = playerAnswers;
    }
}