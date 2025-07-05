import { MessageSquare, Plus, Trash2 } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { formatMessageTime } from '../utils/chat';

const ChatSidebar = () => {
  const { state, dispatch } = useChat();

  const handleNewChat = () => {
    dispatch({ type: 'CREATE_NEW_SESSION' });
  };

  const handleSelectSession = (sessionId: string) => {
    const session = state.sessions.find((s) => s.id === sessionId);
    if (session) {
      dispatch({ type: 'SET_CURRENT_SESSION', payload: session });
    }
  };

  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Add delete logic here
    console.log('Delete session:', sessionId);
  };

  return (
    <div className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={handleNewChat}
          className="w-full flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
        >
          <Plus size={16} />
          <span>New Chat</span>
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {state.sessions.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            <MessageSquare size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No conversations yet</p>
            <p className="text-xs">Start a new chat to begin</p>
          </div>
        ) : (
          <div className="p-2">
            {state.sessions.map((session) => (
              <div
                key={session.id}
                onClick={() => handleSelectSession(session.id)}
                className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors duration-200 mb-1 ${
                  state.currentSession?.id === session.id
                    ? 'bg-blue-100 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 dark:text-gray-100 truncate">
                    {session.title}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {session.messages.length} messages
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">
                    {formatMessageTime(session.updatedAt)}
                  </div>
                </div>
                <button
                  onClick={(e) => handleDeleteSession(session.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
