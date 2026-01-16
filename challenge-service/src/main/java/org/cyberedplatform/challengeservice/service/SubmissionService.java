package org.cyberedplatform.challengeservice.service;

import org.cyberedplatform.challengeservice.dto.LeaderboardEntry;
import org.cyberedplatform.challengeservice.dto.SubmissionResponse;
import org.cyberedplatform.challengeservice.dto.SubmitFlagRequest;
import org.cyberedplatform.challengeservice.model.Challenge;
import org.cyberedplatform.challengeservice.model.Submission;
import org.cyberedplatform.challengeservice.model.UserScore;
import org.cyberedplatform.challengeservice.repository.ChallengeRepository;
import org.cyberedplatform.challengeservice.repository.SubmissionRepository;
import org.cyberedplatform.challengeservice.repository.UserScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class SubmissionService {

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private ChallengeRepository challengeRepository;

    @Autowired
    private UserScoreRepository userScoreRepository;

    @Autowired
    private RestTemplate restTemplate;

    private static final String USER_SERVICE_URL = "http://user-service:8081";

    @Transactional
    public SubmissionResponse submitFlag(SubmitFlagRequest request) {
        // Check if challenge exists
        Challenge challenge = challengeRepository.findById(request.getChallengeId())
                .orElseThrow(() -> new RuntimeException("Challenge not found"));

        // Check if user already solved this challenge
        Optional<Submission> existingSolution = submissionRepository
                .findByUserIdAndChallengeIdAndCorrect(request.getUserId(), request.getChallengeId(), true);

        if (existingSolution.isPresent()) {
            return new SubmissionResponse(
                    false,
                    "You already solved this challenge!",
                    0,
                    getUserTotalPoints(request.getUserId())
            );
        }

        // Validate flag (case-insensitive comparison)
        boolean correct = challenge.getFlag().equalsIgnoreCase(request.getFlag().trim());

        // Create submission record
        Submission submission = new Submission();
        submission.setUserId(request.getUserId());
        submission.setChallengeId(request.getChallengeId());
        submission.setSubmittedFlag(request.getFlag());
        submission.setCorrect(correct);
        submission.setPointsAwarded(correct ? challenge.getPoints() : 0);
        submissionRepository.save(submission);

        // Update user score if correct
        if (correct) {
            updateUserScore(request.getUserId(), challenge.getPoints());
        }

        int totalPoints = getUserTotalPoints(request.getUserId());

        return new SubmissionResponse(
                correct,
                correct ? "Correct! Flag accepted! 🎉" : "Incorrect flag. Try again!",
                correct ? challenge.getPoints() : 0,
                totalPoints
        );
    }

    private void updateUserScore(Long userId, Integer points) {
        UserScore userScore = userScoreRepository.findByUserId(userId)
                .orElse(new UserScore(null, userId, 0, 0, null));

        userScore.setTotalPoints(userScore.getTotalPoints() + points);
        userScore.setChallengesSolved(userScore.getChallengesSolved() + 1);
        userScoreRepository.save(userScore);
    }

    private int getUserTotalPoints(Long userId) {
        return userScoreRepository.findByUserId(userId)
                .map(UserScore::getTotalPoints)
                .orElse(0);
    }

    public List<Submission> getUserSubmissions(Long userId) {
        return submissionRepository.findByUserIdOrderBySubmittedAtDesc(userId);
    }

    public List<LeaderboardEntry> getLeaderboard() {
        List<UserScore> topScores = userScoreRepository.findTop10ByOrderByTotalPointsDesc();
        List<LeaderboardEntry> leaderboard = new ArrayList<>();

        int rank = 1;
        for (UserScore score : topScores) {
            LeaderboardEntry entry = new LeaderboardEntry();
            entry.setUserId(score.getUserId());
            
            // Fetch username from user service
            String username = getUsernameFromUserService(score.getUserId());
            entry.setUsername(username);
            
            entry.setTotalPoints(score.getTotalPoints());
            entry.setChallengesSolved(score.getChallengesSolved());
            entry.setRank(rank++);
            leaderboard.add(entry);
        }

        return leaderboard;
    }

    private String getUsernameFromUserService(Long userId) {
        try {
            String url = USER_SERVICE_URL + "/api/users/" + userId;
            Map<String, Object> userResponse = restTemplate.getForObject(url, Map.class);
            if (userResponse != null && userResponse.containsKey("username")) {
                return (String) userResponse.get("username");
            }
        } catch (Exception e) {
            System.err.println("Failed to fetch username for user " + userId + ": " + e.getMessage());
        }
        return "User" + userId; // Fallback to placeholder if service call fails
    }

    public UserScore getUserScore(Long userId) {
        return userScoreRepository.findByUserId(userId)
                .orElse(new UserScore(null, userId, 0, 0, null));
    }

    public List<Long> getSolvedChallenges(Long userId) {
        return submissionRepository.findByUserId(userId).stream()
                .filter(Submission::getCorrect)
                .map(Submission::getChallengeId)
                .distinct()
                .toList();
    }
}
