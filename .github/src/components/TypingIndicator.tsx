import React from 'react';
import { TypingUser } from '../types';

interface TypingIndicatorProps {
  users: TypingUser[];
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ users }) => {
  if (users.length === 0) return null;

  const getTypingText = () => {
    if (users.length === 1) {
      return `${users[0].username} is typing`;
    } else if (users.length === 2) {
      return `${users[0].username} and ${users[1].username} are typing`;
    } else {
      return `${users[0].username} and ${users.length - 1} others are typing`;
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="bg-slate-700 rounded-2xl px-4 py-2 rounded-bl-md">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="text-white/70 text-sm">{getTypingText()}</span>
        </div>
      </div>
    </div>
  );
};