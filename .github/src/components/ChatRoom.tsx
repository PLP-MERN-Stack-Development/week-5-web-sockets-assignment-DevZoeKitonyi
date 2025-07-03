import React from 'react';
import { Hash, Users } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';

export const ChatRoom: React.FC = () => {
  const { rooms, currentRoom, roomUsers, isConnected } = useChatStore();

  const currentRoomData = rooms.find(r => r.id === currentRoom);
  const currentRoomUsers = currentRoom ? roomUsers[currentRoom] || [] : [];

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-slate-700 bg-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Hash className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-semibold text-lg">
                {currentRoomData?.name || 'Select a room'}
              </h2>
              <p className="text-white/70 text-sm">
                {currentRoomData?.description || 'Join a room to start chatting'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-white/70">
              <Users className="w-4 h-4" />
              <span className="text-sm">{currentRoomUsers.length}</span>
            </div>
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <MessageList />

      {/* Input */}
      <MessageInput />
    </div>
  );
};