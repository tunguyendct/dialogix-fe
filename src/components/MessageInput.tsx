import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { ArrowUp, Paperclip } from 'lucide-react';
import { useSendMessage } from '../hooks/useApi';
import { useChat } from '../hooks/useChat';
import { createAssistantMessage, createUserMessage } from '../utils/chat';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { state, dispatch } = useChat();
  const sendMessageMutation = useSendMessage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || sendMessageMutation.isPending) return;

    const userMessage = createUserMessage(message.trim());

    // Add user message to chat
    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });

    // Clear input
    setMessage('');

    // Create loading assistant message
    const loadingMessage = createAssistantMessage('', true);
    dispatch({ type: 'ADD_MESSAGE', payload: loadingMessage });

    // Send message using React Query
    try {
      const response = await sendMessageMutation.mutateAsync({
        message: userMessage.content,
        conversationId: state.currentSession?.id,
      });

      // Update the loading message with the response
      dispatch({
        type: 'UPDATE_MESSAGE',
        payload: {
          id: loadingMessage.id,
          content: response.message,
          isLoading: false,
        },
      });
    } catch (error) {
      // Handle error
      dispatch({
        type: 'UPDATE_MESSAGE',
        payload: {
          id: loadingMessage.id,
          content: 'Sorry, I encountered an error. Please try again.',
          isLoading: false,
        },
      });

      const errorMessage =
        error instanceof Error ? error.message : 'Failed to send message';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center bg-gray-700 rounded-lg p-2"
    >
      <button
        type="button"
        className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
      >
        <Paperclip size={20} />
      </button>
      <textarea
        ref={textareaRef}
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type a message and press Enter to send ..."
        className="flex-grow bg-transparent text-white focus:outline-none resize-none overflow-hidden min-h-[2.5rem] max-h-32 py-2 px-2"
        rows={1}
        disabled={sendMessageMutation.isPending}
      />
      <button
        type="submit"
        disabled={!message.trim() || sendMessageMutation.isPending}
        className="ml-2 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-full transition-colors duration-200"
      >
        <ArrowUp size={20} />
      </button>
    </form>
  );
};

export default MessageInput;
