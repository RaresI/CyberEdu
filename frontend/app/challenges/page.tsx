'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

interface Challenge {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  points: number;
  category: string;
  hint?: string;
  resourceUrl?: string;
}

interface Notification {
  message: string;
  type: 'success' | 'error' | 'info';
  points?: number;
  totalPoints?: number;
}

export default function ChallengesPage() {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [flagInput, setFlagInput] = useState<{ [key: number]: string }>({});
  const [results, setResults] = useState<{ [key: number]: string | null }>({});
  const [solvedChallenges, setSolvedChallenges] = useState<number[]>([]);
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    loadChallenges();
    if (user) {
      loadSolvedChallenges();
    } else {
      // Reset solved challenges when user logs out
      setSolvedChallenges([]);
      setResults({});
      setFlagInput({});
    }
  }, [user]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (message: string, type: 'success' | 'error' | 'info', points?: number, totalPoints?: number) => {
    setNotification({ message, type, points, totalPoints });
  };

  const loadChallenges = async () => {
    try {
      const response = await api.get('/challenges');
      setChallenges(response.data);
    } catch (error) {
      console.error('Failed to load challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSolvedChallenges = async () => {
    if (!user) return;
    try {
      const response = await api.get(`/challenges/solved/user/${user.id}`);
      // Ensure we're setting fresh data for the current user
      setSolvedChallenges(response.data);
    } catch (error) {
      console.error('Failed to load solved challenges:', error);
      setSolvedChallenges([]);
    }
  };

  const handleSubmitFlag = async (challengeId: number) => {
    if (!user) {
      showNotification('Please login to submit flags!', 'info');
      return;
    }

    try {
      const response = await api.post('/challenges/submit', {
        userId: user.id,
        challengeId: challengeId,
        flag: flagInput[challengeId]
      });
      
      const message = response.data.message;
      setResults({ ...results, [challengeId]: message });
      
      if (response.data.correct) {
        showNotification(message, 'success', response.data.pointsAwarded, response.data.totalPoints);
        setSolvedChallenges([...solvedChallenges, challengeId]);
      } else {
        showNotification(message, 'error');
      }
    } catch (error) {
      console.error('Failed to submit flag:', error);
      showNotification('Failed to submit flag. Please try again.', 'error');
    }
  };

  const filteredChallenges = selectedDifficulty === 'all'
    ? challenges
    : challenges.filter(c => c.difficulty === selectedDifficulty);

  const difficulties = ['all', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl">Loading challenges...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 max-w-md animate-slide-in-right shadow-2xl ${
          notification.type === 'success' ? 'bg-green-600' :
          notification.type === 'error' ? 'bg-red-600' :
          'bg-blue-600'
        } text-white px-6 py-4 rounded-lg border-l-4 ${
          notification.type === 'success' ? 'border-green-400' :
          notification.type === 'error' ? 'border-red-400' :
          'border-blue-400'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="text-2xl">
                {notification.type === 'success' ? '🎉' : 
                 notification.type === 'error' ? '❌' : 
                 'ℹ️'}
              </div>
              <div>
                <p className="font-semibold">{notification.message}</p>
                {notification.points && (
                  <p className="text-sm mt-1 opacity-90">
                    +{notification.points} points! Total: {notification.totalPoints} points
                  </p>
                )}
              </div>
            </div>
            <button 
              onClick={() => setNotification(null)}
              className="text-white hover:text-gray-200 ml-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <h1 className="text-4xl font-bold mb-8">Cybersecurity Challenges</h1>

      <div className="flex gap-4 mb-8 flex-wrap">
        {difficulties.map(diff => (
          <button
            key={diff}
            onClick={() => setSelectedDifficulty(diff)}
            className={`px-4 py-2 rounded capitalize ${
              selectedDifficulty === diff
                ? 'bg-primary text-white'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            {diff}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredChallenges.map(challenge => {
          const isSolved = solvedChallenges.includes(challenge.id);
          
          return (
          <div key={challenge.id} className={`card ${isSolved ? 'border-2 border-green-500' : ''}`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold mb-2">
                  {challenge.title}
                  {isSolved && <span className="ml-2 text-green-500">✓ Solved</span>}
                </h3>
                <div className="flex gap-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    challenge.difficulty === 'BEGINNER' ? 'bg-green-900 text-green-300' :
                    challenge.difficulty === 'INTERMEDIATE' ? 'bg-yellow-900 text-yellow-300' :
                    challenge.difficulty === 'ADVANCED' ? 'bg-orange-900 text-orange-300' :
                    'bg-red-900 text-red-300'
                  }`}>
                    {challenge.difficulty}
                  </span>
                  <span className="text-xs px-2 py-1 rounded bg-blue-900 text-blue-300">
                    {challenge.category}
                  </span>
                  <span className="text-xs px-2 py-1 rounded bg-primary text-white">
                    {challenge.points} pts
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-400 mb-4">{challenge.description}</p>

            {challenge.resourceUrl && (
              <div className="mb-4">
                <a 
                  href={challenge.resourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  🔗 Challenge Resource / Tool
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}

            {challenge.hint && (
              <details className="mb-4">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-300">
                  💡 Show Hint
                </summary>
                <p className="text-sm text-gray-400 mt-2 ml-4">{challenge.hint}</p>
              </details>
            )}

            {!isSolved && (
              <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter flag..."
                value={flagInput[challenge.id] || ''}
                onChange={(e) => setFlagInput({ ...flagInput, [challenge.id]: e.target.value })}
                className="flex-1 bg-gray-900 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-primary"
              />
              <button
                onClick={() => handleSubmitFlag(challenge.id)}
                className="bg-primary hover:bg-primary-dark px-6 py-2 rounded font-semibold"
              >
                Submit
              </button>
            </div>
            )}

            {results[challenge.id] && (
              <div className="mt-2 text-sm text-gray-400">
                {results[challenge.id]}
              </div>
            )}
          </div>
        );
        })}
      </div>

      {filteredChallenges.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-gray-400">No challenges found in this category.</p>
        </div>
      )}
    </div>
  );
}
