package org.cyberedplatform.newsservice.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ExternalNewsService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Fetch live cybersecurity news from multiple sources
     */
    public List<Map<String, Object>> fetchLiveCyberSecurityNews() {
        List<Map<String, Object>> allNews = new ArrayList<>();
        
        try {
            // Source 1: Hacker News (HN) - Technology/Security stories
            allNews.addAll(fetchHackerNews());
            
            // Source 2: Reddit Cybersecurity (via JSON API)
            allNews.addAll(fetchRedditCybersecurity());
            
            // Source 3: NewsAPI.org (if you have API key)
            // allNews.addAll(fetchNewsAPI());
            
        } catch (Exception e) {
            System.err.println("Error fetching external news: " + e.getMessage());
        }
        
        return allNews;
    }

    /**
     * Fetch from Hacker News API
     * https://github.com/HackerNews/API
     */
    private List<Map<String, Object>> fetchHackerNews() {
        List<Map<String, Object>> news = new ArrayList<>();
        
        try {
            // Get top stories
            String topStoriesUrl = "https://hacker-news.firebaseio.com/v0/topstories.json";
            String response = restTemplate.getForObject(topStoriesUrl, String.class);
            
            if (response != null) {
                JsonNode storyIds = objectMapper.readTree(response);
                
                // Get first 5 stories only (reduced from 10 for faster loading)
                int count = 0;
                for (JsonNode idNode : storyIds) {
                    if (count >= 5) break;
                    
                    Long storyId = idNode.asLong();
                    String storyUrl = "https://hacker-news.firebaseio.com/v0/item/" + storyId + ".json";
                    
                    try {
                        String storyJson = restTemplate.getForObject(storyUrl, String.class);
                        
                        if (storyJson != null) {
                            JsonNode story = objectMapper.readTree(storyJson);
                            
                            // Filter for security/cyber related stories
                            String title = story.has("title") ? story.get("title").asText() : "";
                            if (isCyberSecurityRelated(title)) {
                                Map<String, Object> article = new HashMap<>();
                                article.put("title", title);
                                article.put("url", story.has("url") ? story.get("url").asText() : "https://news.ycombinator.com/item?id=" + storyId);
                                article.put("author", story.has("by") ? story.get("by").asText() : "HackerNews");
                                article.put("source", "Hacker News");
                                article.put("publishedAt", convertUnixToLocalDateTime(story.has("time") ? story.get("time").asLong() : 0));
                                article.put("category", "Technology");
                                article.put("summary", "Trending cybersecurity discussion on Hacker News");
                                
                                news.add(article);
                                count++;
                            }
                        }
                    } catch (Exception e) {
                        // Skip this story if there's an error
                        System.err.println("Error fetching story " + storyId + ": " + e.getMessage());
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("Error fetching Hacker News: " + e.getMessage());
        }
        
        return news;
    }

    /**
     * Fetch from Reddit r/cybersecurity
     * Using Reddit's public JSON API (no auth needed)
     */
    private List<Map<String, Object>> fetchRedditCybersecurity() {
        List<Map<String, Object>> news = new ArrayList<>();
        
        try {
            String url = "https://www.reddit.com/r/cybersecurity/hot.json?limit=5";
            
            // Reddit requires a User-Agent header
            org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
            headers.set("User-Agent", "CyberEduPlatform/1.0");
            
            org.springframework.http.HttpEntity<String> entity = new org.springframework.http.HttpEntity<>(headers);
            
            org.springframework.http.ResponseEntity<String> response = restTemplate.exchange(
                url,
                org.springframework.http.HttpMethod.GET,
                entity,
                String.class
            );
            
            if (response.getBody() != null) {
                JsonNode root = objectMapper.readTree(response.getBody());
                JsonNode posts = root.path("data").path("children");
                
                for (JsonNode post : posts) {
                    JsonNode data = post.path("data");
                    
                    Map<String, Object> article = new HashMap<>();
                    article.put("title", data.path("title").asText());
                    article.put("url", data.path("url").asText());
                    article.put("author", data.path("author").asText());
                    article.put("source", "Reddit r/cybersecurity");
                    article.put("publishedAt", convertUnixToLocalDateTime(data.path("created_utc").asLong()));
                    article.put("category", "Community");
                    article.put("summary", data.path("selftext").asText("Click to read discussion on Reddit"));
                    article.put("upvotes", data.path("ups").asInt());
                    article.put("comments", data.path("num_comments").asInt());
                    
                    news.add(article);
                }
            }
        } catch (Exception e) {
            System.err.println("Error fetching Reddit: " + e.getMessage());
        }
        
        return news;
    }

    /**
     * Check if title is cybersecurity related
     */
    private boolean isCyberSecurityRelated(String title) {
        String lowerTitle = title.toLowerCase();
        String[] keywords = {
            "security", "cyber", "hack", "vulnerability", "breach", "malware",
            "ransomware", "encryption", "privacy", "authentication", "firewall",
            "phishing", "exploit", "zero-day", "password", "attack", "threat",
            "penetration", "infosec", "crypto", "ssl", "tls", "vpn"
        };
        
        for (String keyword : keywords) {
            if (lowerTitle.contains(keyword)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Convert Unix timestamp to LocalDateTime
     */
    private LocalDateTime convertUnixToLocalDateTime(long unixTime) {
        return LocalDateTime.ofInstant(
            Instant.ofEpochSecond(unixTime),
            ZoneId.systemDefault()
        );
    }
}
