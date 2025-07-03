import React from 'react';
import { Hash, Users, Settings, LogOut } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { useSocket } from '../hooks/useSocket';

export const Sidebar: React.FC = () => {
  const { user, rooms, currentRoom, roomUsers } = useChatStore();
  const { joinRoom } = useSocket();

  const handleLogout = () => {
    window.location.reload();
  };

  return (
    <div className="w-64 bg-slate-800 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
            {user?.avatar}
          </div>
          <div>
            <h2 className="text-white font-semibold">{user?.username}</h2>
            <p className="text-green-400 text-sm flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              Online
            </p>
          </div>
        </div>
      </div>

      {/* Rooms */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-white/70 text-sm font-medium mb-3 flex items-center">
            <Hash className="w-4 h-4 mr-2" />
            Rooms
          </h3>
          <div className="space-y-1">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => joinRoom(room.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center justify-between ${
                  currentRoom === room.id
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                    : 'text-white/70 hover:text-white hover:bg-slate-700'
                }`}
              >
                <span className="font-medium">{room.name}</span>
                <span className="text-xs bg-slate-600 px-2 py-1 rounded-full">
                  {roomUsers[room.id]?.length || 0}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Online Users */}
        {currentRoom && roomUsers[currentRoom] && (
          <div className="p-4 border-t border-slate-700">
            <h3 className="text-white/70 text-sm font-medium mb-3 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Online Users ({roomUsers[currentRoom]?.length || 0})
            </h3>
            <div className="space-y-2">
              {roomUsers[currentRoom]?.map((roomUser) => (
                <div
                  key={roomUser.id}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm">
                    {roomUser.avatar}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{roomUser.username}</p>
                    <div className="flex items-center text-xs text-green-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                      Online
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex space-x-2">
          <button className="flex-1 flex items-center justify-center px-3 py-2 text-white/70 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 flex items-center justify-center px-3 py-2 text-white/70 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};