package org.cyberedplatform.challengeservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmitFlagRequest {
    private Long userId;
    private Long challengeId;
    private String flag;
}
