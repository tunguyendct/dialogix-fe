import ChatArea from './components/ChatArea';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="flex h-screen bg-gray-800 text-white">
      <Sidebar />
      <ChatArea />
    </div>
  );
}

export default App;
