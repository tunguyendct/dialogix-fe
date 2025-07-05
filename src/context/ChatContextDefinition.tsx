import React, { createContext } from 'react';
import type { ChatSession, ChatState, Message } from '../types';

// Action types
export type ChatAction =
  | { type: 'SET_CURRENT_SESSION'; payload: ChatSession }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | {
      type: 'UPDATE_MESSAGE';
      payload: { id: string; content: string; isLoading?: boolean };
    }
  | { type: 'CREATE_NEW_SESSION' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_SESSION'; payload: ChatSession }
  | { type: 'UPDATE_SESSION_TITLE'; payload: { id: string; title: string } };

// Context
export const ChatContext = createContext<{
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
} | null>(null);
