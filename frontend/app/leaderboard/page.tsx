'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface LeaderboardEntry {
  userId: number;
  username: string;
  totalPoints: number;
  challengesSolved: number;
  rank: number;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await api.get('/challenges/leaderboard');
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMedalEmoji = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-xl">Loading leaderboard...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          🏆 CTF Leaderboard 🏆
        </h1>

        {leaderboard.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-400">No submissions yet. Be the first to solve a challenge!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {leaderboard.map((entry) => (
              <div
                key={entry.userId}
                className={`p-6 rounded-lg shadow-lg transition-all hover:scale-105 ${
                  entry.rank === 1
                    ? 'bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border-2 border-yellow-400'
                    : entry.rank === 2
                    ? 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-2 border-gray-400'
                    : entry.rank === 3
                    ? 'bg-gradient-to-r from-orange-600/20 to-orange-700/20 border-2 border-orange-600'
                    : 'bg-gray-800 border border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl font-bold w-16 text-center">
                      {getMedalEmoji(entry.rank)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{entry.username}</h3>
                      <p className="text-gray-400">
                        {entry.challengesSolved} challenge{entry.challengesSolved !== 1 ? 's' : ''} solved
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-400">
                      {entry.totalPoints}
                    </div>
                    <div className="text-sm text-gray-400">points</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <a
            href="/challenges"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            View Challenges
          </a>
        </div>
      </div>
    </div>
  );
}
