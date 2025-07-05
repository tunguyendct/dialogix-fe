import ChatArea from './components/ChatArea';
import ChatSidebar from './components/ChatSidebar';
import ErrorDisplay from './components/ErrorDisplay';
import Footer from './components/Footer';
import Header from './components/Header';
import { ChatProvider } from './context/ChatContext';
import { ThemeProvider } from './context/ThemeContext';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

function AppContent() {
  useKeyboardShortcuts();

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200">
      <ChatSidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <ChatArea />
        <Footer />
      </div>
      <ErrorDisplay />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ChatProvider>
        <AppContent />
      </ChatProvider>
    </ThemeProvider>
  );
}

export default App;
