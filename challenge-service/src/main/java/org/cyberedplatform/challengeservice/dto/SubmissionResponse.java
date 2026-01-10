package org.cyberedplatform.challengeservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmissionResponse {
    private Boolean correct;
    private String message;
    private Integer pointsAwarded;
    private Integer totalPoints;
}
