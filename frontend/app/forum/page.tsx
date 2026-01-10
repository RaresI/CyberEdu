'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

interface Post {
  id: number;
  userId: number;
  title: string;
  content: string;
  createdAt: string;
  commentCount: number;
}

export default function ForumPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await api.get('/forum/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await api.post('/forum/posts', {
        userId: user.id,
        title,
        content
      });
      setTitle('');
      setContent('');
      setShowForm(false);
      loadPosts();
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl">Loading forum...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Community Forum</h1>
        {user && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary hover:bg-primary-dark px-6 py-2 rounded font-semibold"
          >
            {showForm ? 'Cancel' : 'New Post'}
          </button>
        )}
      </div>

      {showForm && user && (
        <div className="card mb-8">
          <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-primary"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark px-6 py-2 rounded font-semibold"
            >
              Post
            </button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="card">
            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
            <p className="text-gray-400 mb-4">{post.content}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Posted by User #{post.userId}</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-gray-400">No posts yet. Be the first to post!</p>
        </div>
      )}
    </div>
  );
}
