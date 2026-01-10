package org.cyberedplatform.challengeservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "challenges")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Challenge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    @Column(nullable = false)
    private String difficulty; // BEGINNER, INTERMEDIATE, ADVANCED, EXPERT

    @Column(nullable = false)
    private Integer points;

    @Column(length = 1000)
    private String hint;

    @Column(nullable = false)
    private String category; // WEB, CRYPTO, FORENSICS, REVERSE, PWN

    @Column(length = 500)
    private String resourceUrl; // URL or resource where users can access the challenge

    private String flag; // Correct answer for validation
}
