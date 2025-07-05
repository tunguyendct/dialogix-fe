import type { Message } from '../types';

// Generate unique ID for messages
export const generateMessageId = (): string => {
  return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Generate unique ID for chat sessions
export const generateSessionId = (): string => {
  return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Create a new user message
export const createUserMessage = (content: string): Message => ({
  id: generateMessageId(),
  content,
  role: 'user',
  timestamp: new Date(),
  isLoading: false,
});

// Create a new assistant message
export const createAssistantMessage = (
  content: string,
  isLoading = false
): Message => ({
  id: generateMessageId(),
  content,
  role: 'assistant',
  timestamp: new Date(),
  isLoading,
});

// Format timestamp for display
export const formatMessageTime = (timestamp: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(timestamp);
};

// Generate chat title from first message
export const generateChatTitle = (firstMessage: string): string => {
  const words = firstMessage.trim().split(' ');
  if (words.length <= 6) {
    return firstMessage;
  }
  return words.slice(0, 6).join(' ') + '...';
};

// Scroll to bottom of chat container
export const scrollToBottom = (
  elementRef: React.RefObject<HTMLElement>
): void => {
  if (elementRef.current) {
    elementRef.current.scrollTop = elementRef.current.scrollHeight;
  }
};
