import { ChevronDown, Copy, Settings, Trash2 } from 'lucide-react';
import ConnectionStatus from './ConnectionStatus';

const Header = () => (
  <div className="flex items-center justify-between p-4 border-b border-gray-700">
    <div className="flex items-center gap-4">
      <button className="flex items-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
        <span className="mr-2">Select a model to load</span>
        <ChevronDown />
      </button>
      <ConnectionStatus />
    </div>
    <div className="flex items-center space-x-4">
      <button className="flex items-center text-gray-400 hover:text-white transition-colors duration-200">
        <Settings className="mr-2" />
        <span>System Prompt</span>
      </button>
      <button className="flex items-center text-gray-400 hover:text-white transition-colors duration-200">
        <Trash2 className="mr-2" />
        <span>Clear All</span>
      </button>
      <button className="flex items-center text-gray-400 hover:text-white transition-colors duration-200">
        <Copy className="mr-2" />
        <span>Duplicate</span>
      </button>
    </div>
  </div>
);

export default Header;
