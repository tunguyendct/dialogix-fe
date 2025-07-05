// Message types for the chat system
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
  isLoading?: boolean;
}

// Chat session/conversation types
export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ChatCompletionResponse {
  message: string;
  messageId: string;
  conversationId?: string;
}

// UI state types
export interface ChatState {
  currentSession: ChatSession | null;
  sessions: ChatSession[];
  isLoading: boolean;
  error: string | null;
}

// API request types
export interface SendMessageRequest {
  message: string;
  conversationId?: string;
}
