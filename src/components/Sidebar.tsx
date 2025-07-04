import { MessageSquare, Plus } from 'lucide-react';
import LoginButton from './LoginButton';
import Logo from './Logo';

const Sidebar = () => (
  <div className="w-64 bg-gray-900 p-4 flex flex-col">
    <div className="flex items-center mb-6">
      <Logo />
    </div>
    <button className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-6">
      <Plus className="mr-2" />
      New Chat
    </button>
    <div className="flex-grow overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">History</h2>
      <ul>
        <li className="flex items-center mb-2 cursor-pointer hover:bg-gray-700 p-2 rounded">
          <MessageSquare className="mr-2" />
          <span>Conversation 1</span>
        </li>
        <li className="flex items-center mb-2 cursor-pointer hover:bg-gray-700 p-2 rounded">
          <MessageSquare className="mr-2" />
          <span>Conversation 2</span>
        </li>
      </ul>
    </div>
    <div className="mt-auto">
      <LoginButton />
    </div>
  </div>
);

export default Sidebar;
