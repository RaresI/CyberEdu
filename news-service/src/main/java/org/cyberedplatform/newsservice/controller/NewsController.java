package org.cyberedplatform.newsservice.controller;

import org.cyberedplatform.newsservice.model.NewsArticle;
import org.cyberedplatform.newsservice.repository.NewsArticleRepository;
import org.cyberedplatform.newsservice.service.ExternalNewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/news")
public class NewsController {

    @Autowired
    private NewsArticleRepository newsArticleRepository;
    
    @Autowired
    private ExternalNewsService externalNewsService;

    @GetMapping("/health")
    public Map<String, String> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        return response;
    }

    @GetMapping
    public List<NewsArticle> getAllNews() {
        return newsArticleRepository.findAllByOrderByPublishedAtDesc();
    }

    @GetMapping("/{id}")
    public ResponseEntity<NewsArticle> getNewsById(@PathVariable Long id) {
        return newsArticleRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    public List<NewsArticle> getNewsByCategory(@PathVariable String category) {
        return newsArticleRepository.findByCategory(category);
    }

    @GetMapping("/author/{author}")
    public List<NewsArticle> getNewsByAuthor(@PathVariable String author) {
        return newsArticleRepository.findByAuthor(author);
    }

    @GetMapping("/latest")
    public Map<String, Object> getLatestNews(@RequestParam(defaultValue = "5") int limit) {
        List<NewsArticle> latestArticles = newsArticleRepository.findAllByOrderByPublishedAtDesc()
                .stream()
                .limit(limit)
                .toList();
        
        Map<String, Object> response = new HashMap<>();
        response.put("articles", latestArticles);
        response.put("count", latestArticles.size());
        response.put("timestamp", LocalDateTime.now());
        response.put("live", true);
        
        return response;
    }

    @GetMapping("/breaking")
    public List<NewsArticle> getBreakingNews() {
        // Get news from the last 24 hours
        LocalDateTime yesterday = LocalDateTime.now().minusDays(1);
        return newsArticleRepository.findAllByOrderByPublishedAtDesc()
                .stream()
                .filter(article -> article.getPublishedAt().isAfter(yesterday))
                .limit(10)
                .toList();
    }

    @GetMapping("/stats")
    public Map<String, Object> getNewsStats() {
        List<NewsArticle> allArticles = newsArticleRepository.findAll();
        
        Map<String, Long> categoryCounts = new HashMap<>();
        for (NewsArticle article : allArticles) {
            categoryCounts.merge(article.getCategory(), 1L, Long::sum);
        }
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalArticles", allArticles.size());
        stats.put("categoryCounts", categoryCounts);
        stats.put("lastPublished", allArticles.stream()
                .map(NewsArticle::getPublishedAt)
                .max(LocalDateTime::compareTo)
                .orElse(null));
        
        return stats;
    }

    /**
     * NEW: Fetch LIVE cybersecurity news from external sources
     * This endpoint returns real-time news from Hacker News, Reddit, etc.
     */
    @GetMapping("/live")
    public Map<String, Object> getLiveNews() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<Map<String, Object>> liveNews = externalNewsService.fetchLiveCyberSecurityNews();
            
            response.put("success", true);
            response.put("source", "external");
            response.put("articles", liveNews);
            response.put("count", liveNews.size());
            response.put("timestamp", LocalDateTime.now());
            response.put("message", "Live news from Hacker News, Reddit r/cybersecurity, and other sources");
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
            response.put("articles", List.of());
        }
        
        return response;
    }

    @PostMapping
    public NewsArticle createNews(@RequestBody NewsArticle newsArticle) {
        if (newsArticle.getPublishedAt() == null) {
            newsArticle.setPublishedAt(LocalDateTime.now());
        }
        return newsArticleRepository.save(newsArticle);
    }

    @PutMapping("/{id}")
    public ResponseEntity<NewsArticle> updateNews(@PathVariable Long id, @RequestBody NewsArticle newsDetails) {
        return newsArticleRepository.findById(id)
                .map(article -> {
                    article.setTitle(newsDetails.getTitle());
                    article.setContent(newsDetails.getContent());
                    article.setAuthor(newsDetails.getAuthor());
                    article.setCategory(newsDetails.getCategory());
                    article.setSummary(newsDetails.getSummary());
                    article.setImageUrl(newsDetails.getImageUrl());
                    return ResponseEntity.ok(newsArticleRepository.save(article));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable Long id) {
        return newsArticleRepository.findById(id)
                .map(article -> {
                    newsArticleRepository.delete(article);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
