import React, { useState } from 'react';
import { User, MessageCircle } from 'lucide-react';
import { useSocket } from '../hooks/useSocket';
import { useChatStore } from '../store/chatStore';

const avatarOptions = [
  '😀', '😎', '🤓', '😊', '🥳', '😇', '🤗', '😋', '🤔', '😴',
  '🦄', '🐱', '🐶', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁'
];

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0]);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useSocket();
  const { setUser, setAuthenticated } = useChatStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsLoading(true);
    
    const userData = {
      username: username.trim(),
      avatar: selectedAvatar
    };

    // Set user in store
    setUser({
      id: '',
      username: userData.username,
      avatar: userData.avatar,
      status: 'online',
      joinedAt: new Date().toISOString()
    });

    // Login via socket
    login(userData);
    setAuthenticated(true);
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full max-w-md shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl mb-4">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to ChatApp</h1>
          <p className="text-white/70">Enter your details to start chatting</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 backdrop-blur-sm"
                placeholder="Enter your username"
                required
                maxLength={20}
              />
            </div>
          </div>

          <div>
            <label className="block text-white/90 text-sm font-medium mb-3">
              Choose Your Avatar
            </label>
            <div className="grid grid-cols-5 gap-3">
              {avatarOptions.map((avatar, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`w-12 h-12 rounded-xl text-2xl transition-all duration-200 ${
                    selectedAvatar === avatar
                      ? 'bg-blue-500 shadow-lg shadow-blue-500/30 scale-110'
                      : 'bg-white/10 hover:bg-white/20 hover:scale-105'
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !username.trim()}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold transition-all duration-200 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Connecting...
              </div>
            ) : (
              'Start Chatting'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};