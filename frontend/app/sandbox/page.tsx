'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

export default function SandboxPage() {
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(null);
  const [sandboxData, setSandboxData] = useState<any>(null);
  const [sqlUsername, setSqlUsername] = useState('');
  const [sqlPassword, setSqlPassword] = useState('');
  const [sqlResult, setSqlResult] = useState<any>(null);

  const challenges = [
    { id: 1, title: '🎯 Base64 Decoder', difficulty: 'BEGINNER', description: 'Practice decoding Base64 strings' },
    { id: 2, title: '🔐 ROT13 Cipher', difficulty: 'BEGINNER', description: 'Decrypt ROT13 encoded messages' },
    { id: 3, title: '💉 SQL Injection', difficulty: 'BEGINNER', description: 'Try SQL injection on a vulnerable login' },
    { id: 4, title: '⚡ XSS Analysis', difficulty: 'INTERMEDIATE', description: 'Analyze XSS payload hints' },
    { id: 6, title: '🎫 JWT Decoder', difficulty: 'INTERMEDIATE', description: 'Decode JWT tokens' },
    { id: 9, title: '🔓 Hash Cracker', difficulty: 'EXPERT', description: 'Crack MD5 password hashes' },
    { id: 10, title: '🔧 Hex to ASCII', difficulty: 'EXPERT', description: 'Convert hex to ASCII characters' },
  ];

  const loadSandbox = async (challengeId: number) => {
    try {
      setSelectedChallenge(challengeId);
      setSqlResult(null);
      
      const response = await api.get(`/sandbox/challenge${challengeId}`);
      setSandboxData(response.data);
    } catch (error) {
      console.error('Failed to load sandbox:', error);
    }
  };

  const handleSqlLogin = async () => {
    try {
      const response = await api.post('/sandbox/challenge3/login', {
        username: sqlUsername,
        password: sqlPassword
      });
      setSqlResult(response.data);
    } catch (error) {
      console.error('SQL login failed:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">🛡️ Challenge Sandbox</h1>
        <p className="text-gray-400">
          Practice cybersecurity challenges in a safe, isolated environment. 
          <span className="text-orange-500 font-semibold"> ⚠️ These are simulations for educational purposes only!</span>
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Challenge List */}
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold mb-4">Available Challenges</h2>
          <div className="space-y-3">
            {challenges.map(challenge => (
              <div
                key={challenge.id}
                onClick={() => loadSandbox(challenge.id)}
                className={`card cursor-pointer hover:border-primary transition ${
                  selectedChallenge === challenge.id ? 'border-primary border-2' : ''
                }`}
              >
                <h3 className="font-bold mb-1">{challenge.title}</h3>
                <p className="text-sm text-gray-400 mb-2">{challenge.description}</p>
                <span className={`text-xs px-2 py-1 rounded ${
                  challenge.difficulty === 'BEGINNER' ? 'bg-green-900 text-green-300' :
                  challenge.difficulty === 'INTERMEDIATE' ? 'bg-yellow-900 text-yellow-300' :
                  'bg-red-900 text-red-300'
                }`}>
                  {challenge.difficulty}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sandbox Playground */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Playground</h2>
          
          {!sandboxData ? (
            <div className="card text-center py-16">
              <p className="text-gray-400 text-lg">Select a challenge to start practicing →</p>
            </div>
          ) : (
            <div className="card">
              <h3 className="text-xl font-bold mb-4">{sandboxData.title}</h3>
              <p className="text-gray-400 mb-6">{sandboxData.instructions}</p>

              {/* Challenge 2: ROT13 */}
              {selectedChallenge === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Encrypted Text:</label>
                    <div className="bg-gray-800 p-4 rounded font-mono text-green-400">
                      {sandboxData.encryptedText}
                    </div>
                  </div>
                  <div className="bg-blue-900/30 border border-blue-700 p-4 rounded">
                    <p className="text-sm"><strong>💡 Hint:</strong> {sandboxData.hint}</p>
                  </div>
                </div>
              )}

              {/* Challenge 3: SQL Injection */}
              {selectedChallenge === 3 && (
                <div className="space-y-4">
                  <div className="bg-gray-800 p-6 rounded">
                    <h4 className="font-semibold mb-4">🔐 Login Portal</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm mb-1">Username:</label>
                        <input
                          type="text"
                          value={sqlUsername}
                          onChange={(e) => setSqlUsername(e.target.value)}
                          placeholder="Enter username"
                          className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Password:</label>
                        <input
                          type="text"
                          value={sqlPassword}
                          onChange={(e) => setSqlPassword(e.target.value)}
                          placeholder="Enter password (try SQL injection!)"
                          className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-primary"
                        />
                      </div>
                      <button
                        onClick={handleSqlLogin}
                        className="w-full bg-primary hover:bg-primary-dark px-6 py-2 rounded font-semibold"
                      >
                        Login
                      </button>
                    </div>
                  </div>

                  {sqlResult && (
                    <div className={`p-4 rounded ${
                      sqlResult.success ? 'bg-green-900/30 border border-green-700' : 'bg-red-900/30 border border-red-700'
                    }`}>
                      <p className="font-semibold mb-2">{sqlResult.message}</p>
                      {sqlResult.hint && <p className="text-sm">💡 {sqlResult.hint}</p>}
                    </div>
                  )}
                </div>
              )}

              {/* Challenge 4: XSS */}
              {selectedChallenge === 4 && (
                <div className="space-y-4">
                  <div className="bg-gray-800 p-4 rounded">
                    <p className="text-sm mb-2"><strong>Simulated Admin Cookie:</strong></p>
                    <div className="bg-gray-900 p-3 rounded font-mono text-xs text-green-400">
                      {sandboxData.adminCookie}
                    </div>
                  </div>
                  <div className="bg-blue-900/30 border border-blue-700 p-4 rounded">
                    <p className="text-sm"><strong>💡 Hint:</strong> {sandboxData.hint}</p>
                  </div>
                </div>
              )}

              {/* Challenge 6: JWT */}
              {selectedChallenge === 6 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">JWT Token:</label>
                    <div className="bg-gray-800 p-4 rounded font-mono text-xs text-green-400 break-all">
                      {sandboxData.token}
                    </div>
                  </div>
                  <div className="bg-blue-900/30 border border-blue-700 p-4 rounded">
                    <p className="text-sm"><strong>💡 Hint:</strong> {sandboxData.hint}</p>
                    <p className="text-sm mt-2">Copy the token above and paste it into <a href="https://jwt.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">jwt.io</a></p>
                  </div>
                </div>
              )}

              {/* Challenge 9: Hash Cracking */}
              {selectedChallenge === 9 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Password Hash ({sandboxData.hashType}):</label>
                    <div className="bg-gray-800 p-4 rounded font-mono text-green-400">
                      {sandboxData.passwordHash}
                    </div>
                  </div>
                  <div className="bg-blue-900/30 border border-blue-700 p-4 rounded">
                    <p className="text-sm"><strong>💡 Hint:</strong> {sandboxData.hint}</p>
                  </div>
                </div>
              )}

              {/* Challenge 10: Hex to ASCII */}
              {selectedChallenge === 10 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Hex String:</label>
                    <div className="bg-gray-800 p-4 rounded font-mono text-xs text-green-400 break-all">
                      {sandboxData.hexString}
                    </div>
                  </div>
                  <div className="bg-blue-900/30 border border-blue-700 p-4 rounded">
                    <p className="text-sm"><strong>💡 Hint:</strong> {sandboxData.hint}</p>
                  </div>
                </div>
              )}

              {/* Generic sandbox for challenges 1 */}
              {(selectedChallenge === 1) && (
                <div className="bg-blue-900/30 border border-blue-700 p-4 rounded">
                  <p className="text-sm"><strong>💡 Hint:</strong> {sandboxData.hint}</p>
                  <p className="text-sm mt-2">Go back to the Challenges page and look at the challenge description for the encoded data.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 p-6 bg-orange-900/20 border border-orange-700 rounded-lg">
        <h3 className="text-xl font-bold mb-2">⚠️ Educational Disclaimer</h3>
        <p className="text-sm text-gray-300">
          These challenges are simulations designed for educational purposes only. The vulnerabilities shown here are isolated 
          and do not affect the actual platform security. <strong className="text-orange-400">Never attempt these techniques on real systems without authorization.</strong>
        </p>
      </div>
    </div>
  );
}
