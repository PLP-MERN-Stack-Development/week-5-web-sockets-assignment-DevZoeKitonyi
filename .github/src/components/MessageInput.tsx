import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { useSocket } from '../hooks/useSocket';

export const MessageInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { currentRoom } = useChatStore();
  const { sendMessage, startTyping, stopTyping } = useSocket();
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !currentRoom) return;

    sendMessage(message.trim(), currentRoom);
    setMessage('');
    
    // Stop typing indicator
    if (isTyping) {
      stopTyping(currentRoom);
      setIsTyping(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    
    if (!currentRoom) return;

    // Start typing indicator
    if (!isTyping && e.target.value.trim()) {
      startTyping(currentRoom);
      setIsTyping(true);
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing
    typingTimeoutRef.current = setTimeout(() => {
      if (isTyping) {
        stopTyping(currentRoom);
        setIsTyping(false);
      }
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="p-4 border-t border-slate-700">
      <form onSubmit={handleSubmit} className="flex space-x-4">
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className="flex-1 px-4 py-3 bg-slate-700 text-white rounded-xl border border-slate-600 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 placeholder-white/50"
          maxLength={1000}
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold transition-all duration-200 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center space-x-2"
        >
          <Send className="w-5 h-5" />
          <span className="hidden sm:block">Send</span>
        </button>
      </form>
    </div>
  );
};