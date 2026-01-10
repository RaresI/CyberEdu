'use client';

import { useState, useEffect, useRef } from 'react';
import { api } from '@/lib/api';

interface NewsArticle {
  id: number;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  summary?: string;
}

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLive, setIsLive] = useState(true);
  const [newArticlesCount, setNewArticlesCount] = useState(0);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadArticles();
    
    // Start live updates if enabled
    if (isLive) {
      startLiveUpdates();
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isLive]);

  const loadArticles = async (showNotification = false) => {
    try {
      const response = await api.get('/news');
      const newArticles = response.data;
      
      // Check for new articles
      if (showNotification && articles.length > 0) {
        const newCount = newArticles.filter((newArticle: NewsArticle) => 
          !articles.some(oldArticle => oldArticle.id === newArticle.id)
        ).length;
        
        if (newCount > 0) {
          setNewArticlesCount(prev => prev + newCount);
          showNewArticleNotification(newCount);
        }
      }
      
      setArticles(newArticles);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Failed to load news:', error);
    } finally {
      setLoading(false);
    }
  };

  const startLiveUpdates = () => {
    // Check for new articles every 30 seconds
    intervalRef.current = setInterval(() => {
      loadArticles(true);
    }, 30000);
  };

  const showNewArticleNotification = (count: number) => {
    // Browser notification (if permission granted)
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('📰 CyberEdu News', {
        body: `${count} new article${count > 1 ? 's' : ''} published!`,
        icon: '/favicon.ico'
      });
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  };

  const toggleLiveMode = () => {
    setIsLive(!isLive);
    if (!isLive) {
      loadArticles(true);
    }
  };

  const clearNewArticlesBadge = () => {
    setNewArticlesCount(0);
  };

  const filteredArticles = selectedCategory === 'all'
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  const categories = ['all', ...Array.from(new Set(articles.map(a => a.category)))];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl">Loading news...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with Live Controls */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold">Cybersecurity News</h1>
          
          {/* Live Indicator */}
          <div className="flex items-center gap-2">
            {isLive && (
              <div className="flex items-center gap-2 px-3 py-1 bg-red-900/30 border border-red-700 rounded-full">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  <span className="text-red-400 text-sm font-semibold">LIVE</span>
                </div>
              )}
              
              {/* New Articles Badge */}
              {newArticlesCount > 0 && (
                <div 
                  onClick={clearNewArticlesBadge}
                  className="px-3 py-1 bg-green-900/30 border border-green-700 rounded-full cursor-pointer hover:bg-green-900/50 transition"
                >
                  <span className="text-green-400 text-sm font-semibold">
                    +{newArticlesCount} New
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Live Controls */}
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-400">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </div>
            
            <button
              onClick={toggleLiveMode}
              className={`px-4 py-2 rounded font-semibold transition ${
                isLive
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}
            >
              {isLive ? '⏸️ Pause Live' : '▶️ Start Live'}
            </button>

            <button
              onClick={() => loadArticles(true)}
              className="px-4 py-2 rounded bg-primary hover:bg-primary/80 text-white font-semibold transition"
            >
              🔄 Refresh
            </button>

            <button
              onClick={requestNotificationPermission}
              className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold transition"
              title="Enable browser notifications"
            >
              🔔
            </button>
          </div>
        </div>

      {/* Category Filter */}
      <div className="flex gap-4 mb-8 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded capitalize ${
              selectedCategory === cat
                ? 'bg-primary text-white'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredArticles.map(article => (
          <div key={article.id} className="card hover:border-primary/50 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>By {article.author}</span>
                  <span>•</span>
                  <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span className="px-2 py-1 rounded bg-gray-800 text-gray-300">
                    {article.category}
                  </span>
                </div>
              </div>
            </div>

            {article.summary && (
              <p className="text-lg text-gray-300 mb-4">{article.summary}</p>
            )}

            <p className="text-gray-400 leading-relaxed">{article.content}</p>
          </div>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-gray-400">No articles found in this category.</p>
        </div>
      )}
    </div>
  );
}
