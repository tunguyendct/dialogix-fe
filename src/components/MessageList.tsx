import { useEffect, useRef } from 'react';
import { Bot, Loader2, User } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import type { Message } from '../types';
import { formatMessageTime } from '../utils/chat';
import { MarkdownContent } from '../utils/markdown';

const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex gap-3 p-4 ${
        isUser ? 'bg-transparent' : 'bg-gray-50 dark:bg-gray-800/50 rounded-lg'
      }`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser
            ? 'bg-blue-600 dark:bg-blue-500'
            : 'bg-green-600 dark:bg-green-500'
        }`}
      >
        {isUser ? (
          <User size={16} className="text-white" />
        ) : (
          <Bot size={16} className="text-white" />
        )}
      </div>

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {isUser ? 'You' : 'Dialogix'}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatMessageTime(message.timestamp)}
          </span>
        </div>

        <div className="text-gray-800 dark:text-gray-200">
          {message.isLoading ? (
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Loader2 size={16} className="animate-spin" />
              <span>Thinking...</span>
            </div>
          ) : (
            <MarkdownContent content={message.content} />
          )}
        </div>
      </div>
    </div>
  );
};

const MessageList = () => {
  const { state } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state.currentSession?.messages]);

  if (!state.currentSession || state.currentSession.messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="text-center max-w-2xl">
          <Bot
            size={64}
            className="mx-auto mb-6 text-blue-500 dark:text-blue-400"
          />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Welcome to Dialogix
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
            Your AI-powered chat assistant is ready to help! Start a
            conversation by typing a message below.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                💡 Ask anything
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Get help with coding, writing, analysis, or general questions
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2">
                🚀 Code assistance
              </h4>
              <p className="text-sm text-green-700 dark:text-green-400">
                Debug, explain, or generate code in any programming language
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="max-w-4xl mx-auto">
        {state.currentSession.messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;
