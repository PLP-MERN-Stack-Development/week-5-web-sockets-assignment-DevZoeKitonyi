import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useChatStore } from '../store/chatStore';

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const {
    setConnected,
    setRooms,
    setCurrentRoom,
    setRoomUsers,
    addMessage,
    setRoomMessages,
    addPrivateMessage,
    addTypingUser,
    removeTypingUser,
    user
  } = useChatStore();

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io('http://localhost:3001');

    const socket = socketRef.current;

    // Connection events
    socket.on('connect', () => {
      console.log('Connected to server');
      setConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      setConnected(false);
    });

    // Authentication events
    socket.on('login_success', (data) => {
      console.log('Login successful:', data);
      setRooms(data.rooms);
      setCurrentRoom('general');
    });

    // Room events
    socket.on('room_messages', (data) => {
      setRoomMessages(data.roomId, data.messages);
    });

    socket.on('room_users', (data) => {
      setRoomUsers(data.roomId, data.users);
    });

    socket.on('user_joined', (data) => {
      console.log('User joined:', data);
    });

    socket.on('user_left', (data) => {
      console.log('User left:', data);
    });

    // Message events
    socket.on('new_message', (message) => {
      addMessage(message);
    });

    socket.on('private_message', (message) => {
      addPrivateMessage(message);
    });

    socket.on('private_message_sent', (message) => {
      addPrivateMessage(message);
    });

    // Typing events
    socket.on('user_typing', (data) => {
      addTypingUser(data);
    });

    socket.on('user_stop_typing', (data) => {
      removeTypingUser(data.userId, data.roomId);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const login = (userData: { username: string; avatar: string }) => {
    socketRef.current?.emit('login', userData);
  };

  const joinRoom = (roomId: string) => {
    socketRef.current?.emit('join_room', roomId);
    setCurrentRoom(roomId);
  };

  const sendMessage = (content: string, roomId: string) => {
    socketRef.current?.emit('send_message', { content, roomId });
  };

  const sendPrivateMessage = (content: string, toUserId: string) => {
    socketRef.current?.emit('private_message', { content, toUserId });
  };

  const startTyping = (roomId: string) => {
    socketRef.current?.emit('typing_start', { roomId });
  };

  const stopTyping = (roomId: string) => {
    socketRef.current?.emit('typing_stop', { roomId });
  };

  return {
    login,
    joinRoom,
    sendMessage,
    sendPrivateMessage,
    startTyping,
    stopTyping,
    socket: socketRef.current
  };
};