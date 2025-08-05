package com.aptibattle.repository;

import com.aptibattle.entity.QuizSession;
import com.aptibattle.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface QuizSessionRepository extends JpaRepository<QuizSession, Long> {
    
    Optional<QuizSession> findBySessionCode(String sessionCode);
    
    List<QuizSession> findByHost(User host);
    
    List<QuizSession> findByStatus(QuizSession.SessionStatus status);
    
    @Query("SELECT qs FROM QuizSession qs WHERE qs.host.id = :hostId AND qs.status = :status")
    List<QuizSession> findByHostIdAndStatus(@Param("hostId") Long hostId, @Param("status") QuizSession.SessionStatus status);
    
    @Query("SELECT qs FROM QuizSession qs WHERE qs.status = 'WAITING' OR qs.status = 'ACTIVE'")
    List<QuizSession> findActiveOrWaitingSessions();
    
    @Query("SELECT qs FROM QuizSession qs WHERE qs.createdAt >= :startDate ORDER BY qs.createdAt DESC")
    List<QuizSession> findRecentSessions(@Param("startDate") LocalDateTime startDate);
    
    @Query("SELECT COUNT(ps) FROM PlayerSession ps WHERE ps.session.id = :sessionId AND ps.isActive = true")
    Long countActivePlayersBySessionId(@Param("sessionId") Long sessionId);
    
    Boolean existsBySessionCode(String sessionCode);
}