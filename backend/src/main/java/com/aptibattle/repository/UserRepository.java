package com.aptibattle.repository;

import com.aptibattle.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByFirebaseUid(String firebaseUid);
    
    Optional<User> findByEmail(String email);
    
    Boolean existsByEmail(String email);
    
    Boolean existsByFirebaseUid(String firebaseUid);
    
    @Query("SELECT u FROM User u ORDER BY u.totalScore DESC")
    List<User> findTopPlayersByScore();
    
    @Query("SELECT u FROM User u ORDER BY u.totalGamesWon DESC")
    List<User> findTopPlayersByWins();
    
    @Query("SELECT u FROM User u WHERE u.displayName LIKE %:name%")
    List<User> findByDisplayNameContaining(@Param("name") String name);
}