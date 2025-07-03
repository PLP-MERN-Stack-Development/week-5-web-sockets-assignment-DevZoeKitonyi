import { create } from 'zustand';
import { User, Room, Message, PrivateMessage, TypingUser } from '../types';

interface ChatState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  
  // Room state
  rooms: Room[];
  currentRoom: string | null;
  roomUsers: { [roomId: string]: User[] };
  
  // Messages
  messages: { [roomId: string]: Message[] };
  privateMessages: { [userId: string]: PrivateMessage[] };
  
  // UI state
  typingUsers: TypingUser[];
  isConnected: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setRooms: (rooms: Room[]) => void;
  setCurrentRoom: (roomId: string | null) => void;
  setRoomUsers: (roomId: string, users: User[]) => void;
  addMessage: (message: Message) => void;
  setRoomMessages: (roomId: string, messages: Message[]) => void;
  addPrivateMessage: (message: PrivateMessage) => void;
  setTypingUsers: (users: TypingUser[]) => void;
  addTypingUser: (user: TypingUser) => void;
  removeTypingUser: (userId: string, roomId: string) => void;
  setConnected: (connected: boolean) => void;
  reset: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  rooms: [],
  currentRoom: null,
  roomUsers: {},
  messages: {},
  privateMessages: {},
  typingUsers: [],
  isConnected: false,
  
  // Actions
  setUser: (user) => set({ user }),
  
  setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
  
  setRooms: (rooms) => set({ rooms }),
  
  setCurrentRoom: (roomId) => set({ currentRoom: roomId }),
  
  setRoomUsers: (roomId, users) => set((state) => ({
    roomUsers: { ...state.roomUsers, [roomId]: users }
  })),
  
  addMessage: (message) => set((state) => ({
    messages: {
      ...state.messages,
      [message.roomId]: [...(state.messages[message.roomId] || []), message]
    }
  })),
  
  setRoomMessages: (roomId, messages) => set((state) => ({
    messages: { ...state.messages, [roomId]: messages }
  })),
  
  addPrivateMessage: (message) => set((state) => {
    const otherUserId = message.fromUserId === state.user?.id ? message.toUserId : message.fromUserId;
    return {
      privateMessages: {
        ...state.privateMessages,
        [otherUserId]: [...(state.privateMessages[otherUserId] || []), message]
      }
    };
  }),
  
  setTypingUsers: (users) => set({ typingUsers: users }),
  
  addTypingUser: (user) => set((state) => {
    const exists = state.typingUsers.some(u => u.userId === user.userId && u.roomId === user.roomId);
    if (!exists) {
      return { typingUsers: [...state.typingUsers, user] };
    }
    return state;
  }),
  
  removeTypingUser: (userId, roomId) => set((state) => ({
    typingUsers: state.typingUsers.filter(u => !(u.userId === userId && u.roomId === roomId))
  })),
  
  setConnected: (connected) => set({ isConnected: connected }),
  
  reset: () => set({
    user: null,
    isAuthenticated: false,
    rooms: [],
    currentRoom: null,
    roomUsers: {},
    messages: {},
    privateMessages: {},
    typingUsers: [],
    isConnected: false
  })
}));