package org.cyberedplatform.challengeservice.repository;

import org.cyberedplatform.challengeservice.model.UserScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserScoreRepository extends JpaRepository<UserScore, Long> {
    Optional<UserScore> findByUserId(Long userId);
    List<UserScore> findTop10ByOrderByTotalPointsDesc();
    List<UserScore> findAllByOrderByTotalPointsDesc();
}
