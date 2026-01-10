package org.cyberedplatform.challengeservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.cyberedplatform.challengeservice.model.Challenge;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeDTO {
    private Long id;
    private String title;
    private String description;
    private String difficulty;
    private Integer points;
    private String hint;
    private String category;
    private String resourceUrl;
    
    // Convert Challenge entity to DTO (excluding flag)
    public static ChallengeDTO fromEntity(Challenge challenge) {
        ChallengeDTO dto = new ChallengeDTO();
        dto.setId(challenge.getId());
        dto.setTitle(challenge.getTitle());
        dto.setDescription(challenge.getDescription());
        dto.setDifficulty(challenge.getDifficulty());
        dto.setPoints(challenge.getPoints());
        dto.setHint(challenge.getHint());
        dto.setCategory(challenge.getCategory());
        dto.setResourceUrl(challenge.getResourceUrl());
        return dto;
    }
}
