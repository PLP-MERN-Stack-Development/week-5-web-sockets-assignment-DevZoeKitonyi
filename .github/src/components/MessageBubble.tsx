import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwn }) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs lg:max-w-md ${isOwn ? 'order-2' : 'order-1'}`}>
        {!isOwn && (
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xs">
              {message.avatar}
            </div>
            <span className="text-white/70 text-sm font-medium">{message.username}</span>
          </div>
        )}
        <div
          className={`px-4 py-2 rounded-2xl shadow-lg ${
            isOwn
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
              : 'bg-slate-700 text-white'
          } ${isOwn ? 'rounded-br-md' : 'rounded-bl-md'}`}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
          <p
            className={`text-xs mt-1 ${
              isOwn ? 'text-blue-100' : 'text-white/50'
            }`}
          >
            {formatTime(message.timestamp)}
          </p>
        </div>
      </div>
    </div>
  );
};