package org.cyberedplatform.challengeservice.controller;

import org.cyberedplatform.challengeservice.dto.ChallengeDTO;
import org.cyberedplatform.challengeservice.dto.LeaderboardEntry;
import org.cyberedplatform.challengeservice.dto.SubmissionResponse;
import org.cyberedplatform.challengeservice.dto.SubmitFlagRequest;
import org.cyberedplatform.challengeservice.model.Challenge;
import org.cyberedplatform.challengeservice.model.Submission;
import org.cyberedplatform.challengeservice.model.UserScore;
import org.cyberedplatform.challengeservice.repository.ChallengeRepository;
import org.cyberedplatform.challengeservice.service.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/challenges")
public class ChallengeController {

    @Autowired
    private ChallengeRepository challengeRepository;

    @Autowired
    private SubmissionService submissionService;

    @GetMapping("/health")
    public Map<String, String> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        return response;
    }

    @GetMapping
    public List<ChallengeDTO> getAllChallenges() {
        return challengeRepository.findAll().stream()
                .map(ChallengeDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChallengeDTO> getChallengeById(@PathVariable Long id) {
        return challengeRepository.findById(id)
                .map(ChallengeDTO::fromEntity)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/difficulty/{difficulty}")
    public List<ChallengeDTO> getChallengesByDifficulty(@PathVariable String difficulty) {
        return challengeRepository.findByDifficulty(difficulty).stream()
                .map(ChallengeDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @GetMapping("/category/{category}")
    public List<Challenge> getChallengesByCategory(@PathVariable String category) {
        return challengeRepository.findByCategory(category);
    }

    @PostMapping
    public Challenge createChallenge(@RequestBody Challenge challenge) {
        return challengeRepository.save(challenge);
    }

    // New: Submit flag for a challenge
    @PostMapping("/submit")
    public ResponseEntity<SubmissionResponse> submitFlag(@RequestBody SubmitFlagRequest request) {
        SubmissionResponse response = submissionService.submitFlag(request);
        return ResponseEntity.ok(response);
    }

    // Get user's submission history
    @GetMapping("/submissions/user/{userId}")
    public ResponseEntity<List<Submission>> getUserSubmissions(@PathVariable Long userId) {
        return ResponseEntity.ok(submissionService.getUserSubmissions(userId));
    }

    // Get user's score
    @GetMapping("/score/user/{userId}")
    public ResponseEntity<UserScore> getUserScore(@PathVariable Long userId) {
        return ResponseEntity.ok(submissionService.getUserScore(userId));
    }

    // Get leaderboard
    @GetMapping("/leaderboard")
    public ResponseEntity<List<LeaderboardEntry>> getLeaderboard() {
        return ResponseEntity.ok(submissionService.getLeaderboard());
    }

    // Get challenges solved by user
    @GetMapping("/solved/user/{userId}")
    public ResponseEntity<List<Long>> getSolvedChallenges(@PathVariable Long userId) {
        return ResponseEntity.ok(submissionService.getSolvedChallenges(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Challenge> updateChallenge(@PathVariable Long id, @RequestBody Challenge challengeDetails) {
        return challengeRepository.findById(id)
                .map(challenge -> {
                    challenge.setTitle(challengeDetails.getTitle());
                    challenge.setDescription(challengeDetails.getDescription());
                    challenge.setDifficulty(challengeDetails.getDifficulty());
                    challenge.setPoints(challengeDetails.getPoints());
                    challenge.setHint(challengeDetails.getHint());
                    challenge.setCategory(challengeDetails.getCategory());
                    challenge.setFlag(challengeDetails.getFlag());
                    return ResponseEntity.ok(challengeRepository.save(challenge));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChallenge(@PathVariable Long id) {
        return challengeRepository.findById(id)
                .map(challenge -> {
                    challengeRepository.delete(challenge);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
