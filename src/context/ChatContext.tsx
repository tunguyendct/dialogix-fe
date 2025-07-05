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

// Initial state
export const initialState: ChatState = {
  currentSession: null,
  sessions: [],
  isLoading: false,
  error: null,
};

// Reducer function
export const chatReducer = (
  state: ChatState,
  action: ChatAction
): ChatState => {
  switch (action.type) {
    case 'SET_CURRENT_SESSION':
      return {
        ...state,
        currentSession: action.payload,
      };

    case 'ADD_MESSAGE': {
      if (!state.currentSession) return state;

      const updatedSession = {
        ...state.currentSession,
        messages: [...state.currentSession.messages, action.payload],
        updatedAt: new Date(),
      };

      return {
        ...state,
        currentSession: updatedSession,
        sessions: state.sessions.map((session) =>
          session.id === updatedSession.id ? updatedSession : session
        ),
      };
    }

    case 'UPDATE_MESSAGE': {
      if (!state.currentSession) return state;

      const sessionWithUpdatedMessage = {
        ...state.currentSession,
        messages: state.currentSession.messages.map((msg) =>
          msg.id === action.payload.id
            ? {
                ...msg,
                content: action.payload.content,
                isLoading: action.payload.isLoading ?? msg.isLoading,
              }
            : msg
        ),
        updatedAt: new Date(),
      };

      return {
        ...state,
        currentSession: sessionWithUpdatedMessage,
        sessions: state.sessions.map((session) =>
          session.id === sessionWithUpdatedMessage.id
            ? sessionWithUpdatedMessage
            : session
        ),
      };
    }

    case 'CREATE_NEW_SESSION': {
      const newSession: ChatSession = {
        id: `session-${Date.now()}`,
        title: 'New Chat',
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return {
        ...state,
        currentSession: newSession,
        sessions: [newSession, ...state.sessions],
      };
    }

    case 'ADD_SESSION':
      return {
        ...state,
        sessions: [action.payload, ...state.sessions],
      };

    case 'UPDATE_SESSION_TITLE':
      return {
        ...state,
        sessions: state.sessions.map((session) =>
          session.id === action.payload.id
            ? { ...session, title: action.payload.title }
            : session
        ),
        currentSession:
          state.currentSession?.id === action.payload.id
            ? { ...state.currentSession, title: action.payload.title }
            : state.currentSession,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

// Context
export const ChatContext = createContext<{
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
} | null>(null);
