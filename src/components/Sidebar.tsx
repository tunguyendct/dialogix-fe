import { Folder, Plus } from 'lucide-react';

const Sidebar = () => (
  <div className="w-64 bg-gray-900 p-4 flex flex-col border-r border-gray-700 transition-all duration-300 ease-in-out">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-bold">Chats</h2>
      <div className="flex space-x-2">
        <Folder className="text-gray-400 hover:text-white cursor-pointer" />
        <Plus className="text-gray-400 hover:text-white cursor-pointer" />
      </div>
    </div>
    <button className="flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mb-4">
      <Plus className="mr-2" />
      New Chat
    </button>
    <div className="flex-grow overflow-y-auto">
      <ul>
        <li className="flex items-center mb-2 cursor-pointer bg-blue-600 p-2 rounded">
          <span>Chat 1</span>
        </li>
        <li className="flex items-center mb-2 cursor-pointer hover:bg-gray-700 p-2 rounded">
          <span>Chat 2</span>
        </li>
      </ul>
    </div>
  </div>
);

export default Sidebar;
