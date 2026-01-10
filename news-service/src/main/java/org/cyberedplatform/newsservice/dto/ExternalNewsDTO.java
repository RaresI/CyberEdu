package org.cyberedplatform.newsservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExternalNewsDTO {
    private String title;
    private String url;
    private String author;
    private String source;
    private LocalDateTime publishedAt;
    private String category;
    private String summary;
    private Integer upvotes;
    private Integer comments;
}
