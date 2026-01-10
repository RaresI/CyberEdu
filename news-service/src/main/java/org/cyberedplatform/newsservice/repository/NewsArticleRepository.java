package org.cyberedplatform.newsservice.repository;

import org.cyberedplatform.newsservice.model.NewsArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsArticleRepository extends JpaRepository<NewsArticle, Long> {
    List<NewsArticle> findByCategory(String category);
    List<NewsArticle> findByAuthor(String author);
    List<NewsArticle> findAllByOrderByPublishedAtDesc();
}
