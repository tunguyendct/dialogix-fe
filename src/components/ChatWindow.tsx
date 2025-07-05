import { useEffect } from 'react';
import { useChat } from '../hooks/useChat';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const ChatWindow = () => {
  const { state, dispatch } = useChat();

  // Initialize a new chat session when component mounts if none exists
  useEffect(() => {
    if (!state.currentSession) {
      dispatch({ type: 'CREATE_NEW_SESSION' });
    }
  }, [state.currentSession, dispatch]);

  return (
    <div className="bg-white w-full max-w-4xl h-[80vh] my-8 rounded-2xl shadow-lg flex flex-col overflow-hidden">
      <MessageList />
      <div className="border-t border-gray-200 p-4">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatWindow;
