export interface User {
  id: string;
  username: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  joinedAt: string;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  userCount: number;
}

export interface Message {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  roomId: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
}

export interface PrivateMessage {
  id: string;
  fromUserId: string;
  fromUsername: string;
  fromAvatar: string;
  toUserId: string;
  content: string;
  timestamp: string;
  type: 'private';
}

export interface TypingUser {
  userId: string;
  username: string;
  roomId: string;
}