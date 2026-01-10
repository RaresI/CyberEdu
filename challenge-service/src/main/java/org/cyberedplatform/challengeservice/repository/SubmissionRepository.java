package org.cyberedplatform.challengeservice.repository;

import org.cyberedplatform.challengeservice.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByUserId(Long userId);
    List<Submission> findByChallengeId(Long challengeId);
    Optional<Submission> findByUserIdAndChallengeIdAndCorrect(Long userId, Long challengeId, Boolean correct);
    List<Submission> findByUserIdOrderBySubmittedAtDesc(Long userId);
}
