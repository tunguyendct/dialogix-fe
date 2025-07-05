import { AlertCircle, X } from 'lucide-react';
import { useChat } from '../hooks/useChat';

const ErrorDisplay = () => {
  const { state, dispatch } = useChat();

  if (!state.error) return null;

  const handleDismiss = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  return (
    <div className="fixed top-4 right-4 max-w-md bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg z-50">
      <div className="flex items-start gap-3">
        <AlertCircle size={20} className="text-red-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-red-800 mb-1">Error</h4>
          <p className="text-sm text-red-700">{state.error}</p>
        </div>
        <button
          onClick={handleDismiss}
          className="text-red-400 hover:text-red-600 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default ErrorDisplay;
