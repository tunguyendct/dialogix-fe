import { useEffect } from 'react';
import { useChat } from '../hooks/useChat';

export const useKeyboardShortcuts = () => {
  const { dispatch } = useChat();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + N for new chat
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        dispatch({ type: 'CREATE_NEW_SESSION' });
      }

      // Ctrl/Cmd + K for search (placeholder)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // TODO: Open search modal
        console.log('Search shortcut triggered');
      }

      // Escape to clear current error
      if (e.key === 'Escape') {
        dispatch({ type: 'SET_ERROR', payload: null });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);
};
