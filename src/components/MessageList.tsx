import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Bot, Check, Copy, Loader2, User } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import type { Message } from '../types';
import { formatMessageTime } from '../utils/chat';

const CodeBlock = ({ code, language }: { code: string; language?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="relative bg-gray-900 rounded-lg my-2 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-gray-300 text-sm">
        <span>{language || 'code'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-700 transition-colors"
        >
          {copied ? (
            <>
              <Check size={14} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 text-gray-100 text-sm overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const MessageContent = ({ content }: { content: string }) => {
  // Simple regex to detect code blocks (```language\ncode\n```)
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Add text before code block
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: content.slice(lastIndex, match.index),
      });
    }

    // Add code block
    parts.push({
      type: 'code',
      language: match[1],
      content: match[2].trim(),
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < content.length) {
    parts.push({
      type: 'text',
      content: content.slice(lastIndex),
    });
  }

  if (parts.length === 0) {
    parts.push({ type: 'text', content });
  }

  return (
    <div>
      {parts.map((part, index) => {
        if (part.type === 'code') {
          return (
            <CodeBlock
              key={index}
              code={part.content}
              language={part.language}
            />
          );
        }
        return (
          <div key={index} className="whitespace-pre-wrap">
            {part.content}
          </div>
        );
      })}
    </div>
  );
};

const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex gap-3 p-4 ${isUser ? 'bg-transparent' : 'bg-gray-50'}`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-blue-600' : 'bg-green-600'
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
          <span className="font-semibold text-gray-900">
            {isUser ? 'You' : 'Dialogix'}
          </span>
          <span className="text-xs text-gray-500">
            {formatMessageTime(message.timestamp)}
          </span>
        </div>

        <div className="text-gray-800">
          {message.isLoading ? (
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 size={16} className="animate-spin" />
              <span>Thinking...</span>
            </div>
          ) : (
            <MessageContent content={message.content} />
          )}
        </div>
      </div>
    </div>
  );
};

const MessageList = () => {
  const { state } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state.currentSession?.messages]);

  if (!state.currentSession || state.currentSession.messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <Bot size={48} className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Welcome to Dialogix
          </h3>
          <p className="text-gray-600 max-w-md">
            Start a conversation by typing a message below. I'm here to help
            with any questions you have!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
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
