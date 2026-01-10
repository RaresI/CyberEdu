package org.cyberedplatform.challengeservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_scores")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserScore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long userId;

    @Column(nullable = false)
    private Integer totalPoints;

    @Column(nullable = false)
    private Integer challengesSolved;

    @Column(nullable = false)
    private LocalDateTime lastSubmission;

    @PrePersist
    protected void onCreate() {
        if (totalPoints == null) totalPoints = 0;
        if (challengesSolved == null) challengesSolved = 0;
        lastSubmission = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        lastSubmission = LocalDateTime.now();
    }
}
