# Real-Time Chat Application with Socket.io

A modern, feature-rich real-time chat application built with React, TypeScript, Node.js, and Socket.io. This application provides seamless real-time communication with a beautiful, responsive interface.

## Features


file:///C:/Users/user/Pictures/Screenshots/Screenshot%202025-07-07%20192736.png

### Core Features
- **Real-time messaging** using Socket.io bidirectional communication
- **User authentication** with persistent sessions
- **Multiple chat rooms** with room management
- **Live user presence** and online status indicators
- **Typing indicators** showing when users are typing
- **Message history** with timestamp display
- **Responsive design** optimized for all devices

### Advanced Features
- **Private messaging** between users
- **Real-time notifications** for new messages
- **User avatars** with emoji selection
- **Room user lists** showing online participants
- **Modern UI** with gradient backgrounds and smooth animations
- **Connection status** indicators

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Zustand** for state management
- **Socket.io Client** for real-time communication
- **Lucide React** for icons
- **Vite** for build tooling

### Backend
- **Node.js** with Express
- **Socket.io** for real-time communication
- **UUID** for unique identifiers
- **CORS** for cross-origin requests

## Project Structure

```
realtime-chat-app/
├── src/                    # React frontend
│   ├── components/         # UI components
│   │   ├── LoginForm.tsx   # User authentication
│   │   ├── Sidebar.tsx     # Rooms and users sidebar
│   │   ├── ChatRoom.tsx    # Main chat interface
│   │   ├── MessageList.tsx # Messages display
│   │   ├── MessageBubble.tsx # Individual message
│   │   ├── MessageInput.tsx # Message input form
│   │   └── TypingIndicator.tsx # Typing indicator
│   ├── hooks/              # Custom React hooks
│   │   └── useSocket.ts    # Socket.io connection
│   ├── store/              # State management
│   │   └── chatStore.ts    # Zustand store
│   ├── types/              # TypeScript definitions
│   │   └── index.ts        # Type definitions
│   └── App.tsx             # Main application
├── server/                 # Node.js backend
│   ├── server.js           # Express server with Socket.io
│   └── package.json        # Server dependencies
├── package.json            # Frontend dependencies
└── README.md               # This file
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd realtime-chat-app
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install

   # Install server dependencies
   cd server
   npm install
   cd ..
   ```

3. **Start the development servers**
   ```bash
   # Start both client and server concurrently
   npm run dev
   ```

   This will start:
   - Frontend development server on `http://localhost:5173`
   - Backend server on `http://localhost:3001`

### Manual Setup

If you prefer to run the servers separately:

1. **Start the backend server**
   ```bash
   cd server
   npm start
   ```

2. **Start the frontend development server**
   ```bash
   npm run client
   ```

## Usage

1. **Login**: Enter your username and choose an avatar
2. **Join Rooms**: Select from available chat rooms (General, Random, Tech Talk)
3. **Send Messages**: Type messages and press Enter or click Send
4. **View Users**: See online users in the sidebar
5. **Typing Indicators**: See when others are typing in real-time

## API Events

### Client to Server
- `login` - User authentication
- `join_room` - Join a specific room
- `send_message` - Send a message to a room
- `private_message` - Send a private message
- `typing_start` - Start typing indicator
- `typing_stop` - Stop typing indicator

### Server to Client
- `login_success` - Successful login response
- `room_messages` - Historical messages for a room
- `room_users` - List of users in a room
- `new_message` - New message received
- `user_joined` - User joined a room
- `user_left` - User left a room
- `user_typing` - User started typing
- `user_stop_typing` - User stopped typing
- `private_message` - Private message received

## Development

### Adding New Features

1. **Frontend Components**: Add new components in `src/components/`
2. **Backend Events**: Add new socket events in `server/server.js`
3. **State Management**: Update store in `src/store/chatStore.ts`
4. **Types**: Add new TypeScript types in `src/types/index.ts`

### Environment Variables

Create a `.env` file in the root directory for environment-specific configuration:

```env
VITE_SOCKET_URL=http://localhost:3001
```

## Production Deployment

### Build the Application
```bash
npm run build
```

### Deploy Options
- **Frontend**: Deploy the `dist` folder to services like Netlify, Vercel, or GitHub Pages
- **Backend**: Deploy the `server` folder to services like Heroku, Railway, or DigitalOcean

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository or contact the development team.
