'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface LiveNewsArticle {
  title: string;
  url: string;
  source: string;
  author?: string;
  score?: number;
  time?: number;
  upvotes?: number;
  comments?: number;
}

export default function LiveNewsPage() {
  const [articles, setArticles] = useState<LiveNewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const loadLiveNews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 35000); // 35 second timeout (backend takes ~26s)
      
      const response = await api.get('/news/live', {
        signal: controller.signal,
        timeout: 35000 // Also set axios timeout
      });
      
      clearTimeout(timeoutId);
      
      if (response.data.success) {
        setArticles(response.data.articles || []);
        setLastUpdate(new Date());
      } else {
        setError(response.data.error || 'Failed to fetch live news');
      }
    } catch (error: any) {
      console.error('Error fetching live news:', error);
      if (error.name === 'AbortError' || error.code === 'ECONNABORTED') {
        setError('Request timeout. The news sources are taking longer than expected. Please try again.');
      } else if (error.response) {
        setError(`Server error: ${error.response.status}. ${error.response.data?.message || 'Please try again later.'}`);
      } else if (error.request) {
        setError('No response from server. Please check your connection and try again.');
      } else {
        setError('Unable to fetch live news. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLiveNews();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="cyber-loader mx-auto mb-4"></div>
        <p className="text-xl text-primary terminal mb-2">Fetching live cybersecurity news...</p>
        <p className="text-sm text-gray-400">This may take up to 30 seconds as we query external sources</p>
        <div className="mt-8 max-w-md mx-auto">
          <div className="card">
            <p className="text-xs text-gray-500 mb-2">Querying:</p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center justify-center gap-2">
                <span className="pulse text-primary">●</span>
                <span className="text-secondary">Hacker News</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="pulse text-primary" style={{ animationDelay: '0.5s' }}>●</span>
                <span className="text-accent">Reddit r/cybersecurity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-danger mb-4">Error Loading Live News</h2>
        <p className="text-gray-400 mb-6">{error}</p>
        <button onClick={loadLiveNews} className="btn-primary">
          [ Retry ]
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 grid-bg">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold glow-text mb-2">
            <span className="text-accent">{'>'}</span> LIVE CYBERSECURITY NEWS
          </h1>
          <p className="text-gray-400">
            Real-time updates from Hacker News and Reddit r/cybersecurity
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-400 terminal">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </div>
          <button onClick={loadLiveNews} className="btn-primary">
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Live Indicator */}
      <div className="flex items-center gap-2 mb-6">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
        </span>
        <span className="text-primary text-sm font-semibold terminal">
          LIVE - {articles.length} Articles
        </span>
      </div>

      {/* Articles Grid */}
      <div className="space-y-4">
        {articles.map((article, index) => (
          <div key={index} className="card hover:border-primary/50 transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xl font-bold text-primary hover:text-secondary transition mb-2 block"
                >
                  {article.title}
                </a>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                  <span className="badge">
                    {article.source}
                  </span>
                  
                  {article.author && (
                    <>
                      <span>•</span>
                      <span>By {article.author}</span>
                    </>
                  )}
                  
                  {article.score && (
                    <>
                      <span>•</span>
                      <span className="text-secondary">⬆ {article.score} points</span>
                    </>
                  )}
                  
                  {article.upvotes && (
                    <>
                      <span>•</span>
                      <span className="text-secondary">⬆ {article.upvotes} upvotes</span>
                    </>
                  )}
                  
                  {article.comments !== undefined && (
                    <>
                      <span>•</span>
                      <span className="text-accent">💬 {article.comments} comments</span>
                    </>
                  )}
                  
                  {article.time && (
                    <>
                      <span>•</span>
                      <span>{new Date(article.time * 1000).toLocaleString()}</span>
                    </>
                  )}
                </div>
              </div>
              
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary text-sm whitespace-nowrap"
              >
                [ Read More ]
              </a>
            </div>
          </div>
        ))}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-gray-400">No live articles found at the moment.</p>
          <button onClick={loadLiveNews} className="btn-primary mt-4">
            [ Refresh ]
          </button>
        </div>
      )}

      {/* Info Section */}
      <div className="card neon-box mt-12 text-center">
        <h3 className="text-xl font-bold text-primary mb-4">
          <span className="text-accent">{'>'}</span> ABOUT LIVE NEWS
        </h3>
        <p className="text-gray-400 mb-2">
          Articles are fetched in real-time from trusted cybersecurity sources:
        </p>
        <div className="flex gap-4 justify-center mt-4">
          <span className="badge badge-secondary">Hacker News</span>
          <span className="badge">Reddit r/cybersecurity</span>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Only articles containing cybersecurity-related keywords are displayed
        </p>
      </div>
    </div>
  );
}
