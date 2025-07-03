import React, { useEffect, useRef } from 'react';
import { useChatStore } from '../store/chatStore';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';

export const MessageList: React.FC = () => {
  const { messages, currentRoom, typingUsers, user } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentMessages = currentRoom ? messages[currentRoom] || [] : [];
  const currentTypingUsers = typingUsers.filter(t => t.roomId === currentRoom && t.userId !== user?.id);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages, currentTypingUsers]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {currentMessages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <p className="text-white/70">No messages yet. Start the conversation!</p>
          </div>
        </div>
      ) : (
        currentMessages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={message.userId === user?.id}
          />
        ))
      )}
      
      {currentTypingUsers.length > 0 && (
        <TypingIndicator users={currentTypingUsers} />
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};