import React from 'react';
import { useChatStore } from './store/chatStore';
import { LoginForm } from './components/LoginForm';
import { Sidebar } from './components/Sidebar';
import { ChatRoom } from './components/ChatRoom';

function App() {
  const { isAuthenticated } = useChatStore();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="h-screen bg-slate-900 flex">
      <Sidebar />
      <ChatRoom />
    </div>
  );
}

export default App;