package com.aptibattle.repository;

import com.aptibattle.entity.PlayerSession;
import com.aptibattle.entity.QuizSession;
import com.aptibattle.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlayerSessionRepository extends JpaRepository<PlayerSession, Long> {
    
    Optional<PlayerSession> findByUserAndSession(User user, QuizSession session);
    
    List<PlayerSession> findByUser(User user);
    
    List<PlayerSession> findBySession(QuizSession session);
    
    @Query("SELECT ps FROM PlayerSession ps WHERE ps.session.id = :sessionId AND ps.isActive = true ORDER BY ps.totalScore DESC, ps.totalTimeSpent ASC")
    List<PlayerSession> findLeaderboardBySessionId(@Param("sessionId") Long sessionId);
    
    @Query("SELECT ps FROM PlayerSession ps WHERE ps.session.id = :sessionId AND ps.isActive = true")
    List<PlayerSession> findActivePlayersBySessionId(@Param("sessionId") Long sessionId);
    
    @Query("SELECT ps FROM PlayerSession ps WHERE ps.user.id = :userId ORDER BY ps.createdAt DESC")
    List<PlayerSession> findByUserIdOrderByCreatedAtDesc(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(ps) FROM PlayerSession ps WHERE ps.session.id = :sessionId AND ps.isActive = true")
    Long countActivePlayersInSession(@Param("sessionId") Long sessionId);
    
    Boolean existsByUserAndSession(User user, QuizSession session);
}