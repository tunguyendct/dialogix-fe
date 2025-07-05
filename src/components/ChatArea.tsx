import { useEffect } from 'react';
import { useChat } from '../hooks/useChat';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const ChatArea = () => {
  const { state, dispatch } = useChat();

  // Initialize a new chat session when component mounts if none exists
  useEffect(() => {
    if (!state.currentSession) {
      dispatch({ type: 'CREATE_NEW_SESSION' });
    }
  }, [state.currentSession, dispatch]);

  return (
    <div className="flex-grow flex flex-col bg-white text-gray-900">
      <MessageList />
      <div className="border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <MessageInput />
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
