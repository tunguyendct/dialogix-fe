import ChatArea from './components/ChatArea';
import Footer from './components/Footer';
import Header from './components/Header';
import IconSidebar from './components/IconSidebar';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="flex h-screen bg-gray-800 text-white">
      <IconSidebar />
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <ChatArea />
        <Footer />
      </div>
    </div>
  );
}

export default App;
