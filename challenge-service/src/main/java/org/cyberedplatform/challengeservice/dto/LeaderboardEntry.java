package org.cyberedplatform.challengeservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeaderboardEntry {
    private Long userId;
    private String username; // Will be fetched from user service
    private Integer totalPoints;
    private Integer challengesSolved;
    private Integer rank;
}
