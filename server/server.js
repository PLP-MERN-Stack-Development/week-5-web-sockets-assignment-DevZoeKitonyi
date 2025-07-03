import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// In-memory storage (replace with database in production)
const users = new Map();
const rooms = new Map();
const messages = new Map();

// Initialize default rooms
const defaultRooms = [
  { id: 'general', name: 'General', description: 'General discussion' },
  { id: 'random', name: 'Random', description: 'Random chat' },
  { id: 'tech', name: 'Tech Talk', description: 'Technology discussions' }
];

defaultRooms.forEach(room => {
  rooms.set(room.id, { ...room, users: new Set(), messages: [] });
  messages.set(room.id, []);
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle user login
  socket.on('login', (userData) => {
    const user = {
      id: socket.id,
      username: userData.username,
      avatar: userData.avatar,
      status: 'online',
      joinedAt: new Date().toISOString()
    };
    
    users.set(socket.id, user);
    
    // Join general room by default
    socket.join('general');
    const generalRoom = rooms.get('general');
    if (generalRoom) {
      generalRoom.users.add(socket.id);
    }
    
    // Send user data and available rooms
    socket.emit('login_success', {
      user,
      rooms: Array.from(rooms.entries()).map(([id, room]) => ({
        id,
        name: room.name,
        description: room.description,
        userCount: room.users.size
      }))
    });
    
    // Notify others in the room
    socket.to('general').emit('user_joined', { user, roomId: 'general' });
    
    // Send room users
    updateRoomUsers('general');
  });

  // Handle joining a room
  socket.on('join_room', (roomId) => {
    const user = users.get(socket.id);
    if (!user) return;

    // Leave current rooms
    const currentRooms = Array.from(socket.rooms).filter(room => room !== socket.id);
    currentRooms.forEach(roomId => {
      socket.leave(roomId);
      const room = rooms.get(roomId);
      if (room) {
        room.users.delete(socket.id);
        socket.to(roomId).emit('user_left', { user, roomId });
        updateRoomUsers(roomId);
      }
    });

    // Join new room
    socket.join(roomId);
    const room = rooms.get(roomId);
    if (room) {
      room.users.add(socket.id);
      
      // Send room messages
      const roomMessages = messages.get(roomId) || [];
      socket.emit('room_messages', { roomId, messages: roomMessages });
      
      // Notify others
      socket.to(roomId).emit('user_joined', { user, roomId });
      updateRoomUsers(roomId);
    }
  });

  // Handle sending messages
  socket.on('send_message', (data) => {
    const user = users.get(socket.id);
    if (!user) return;

    const message = {
      id: uuidv4(),
      userId: user.id,
      username: user.username,
      avatar: user.avatar,
      content: data.content,
      roomId: data.roomId,
      timestamp: new Date().toISOString(),
      type: data.type || 'text'
    };

    // Store message
    const roomMessages = messages.get(data.roomId) || [];
    roomMessages.push(message);
    messages.set(data.roomId, roomMessages);

    // Send to room
    io.to(data.roomId).emit('new_message', message);
  });

  // Handle typing indicators
  socket.on('typing_start', (data) => {
    const user = users.get(socket.id);
    if (!user) return;
    
    socket.to(data.roomId).emit('user_typing', {
      userId: user.id,
      username: user.username,
      roomId: data.roomId
    });
  });

  socket.on('typing_stop', (data) => {
    const user = users.get(socket.id);
    if (!user) return;
    
    socket.to(data.roomId).emit('user_stop_typing', {
      userId: user.id,
      roomId: data.roomId
    });
  });

  // Handle private messages
  socket.on('private_message', (data) => {
    const user = users.get(socket.id);
    if (!user) return;

    const message = {
      id: uuidv4(),
      fromUserId: user.id,
      fromUsername: user.username,
      fromAvatar: user.avatar,
      toUserId: data.toUserId,
      content: data.content,
      timestamp: new Date().toISOString(),
      type: 'private'
    };

    // Send to recipient
    socket.to(data.toUserId).emit('private_message', message);
    
    // Send back to sender for confirmation
    socket.emit('private_message_sent', message);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      // Remove from all rooms
      const userRooms = Array.from(socket.rooms).filter(room => room !== socket.id);
      userRooms.forEach(roomId => {
        const room = rooms.get(roomId);
        if (room) {
          room.users.delete(socket.id);
          socket.to(roomId).emit('user_left', { user, roomId });
          updateRoomUsers(roomId);
        }
      });
      
      users.delete(socket.id);
    }
    
    console.log('User disconnected:', socket.id);
  });

  function updateRoomUsers(roomId) {
    const room = rooms.get(roomId);
    if (!room) return;
    
    const roomUsers = Array.from(room.users).map(userId => users.get(userId)).filter(Boolean);
    io.to(roomId).emit('room_users', { roomId, users: roomUsers });
  }
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});