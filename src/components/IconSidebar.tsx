import { MessageSquare, Search, Settings } from 'lucide-react';

const IconSidebar = () => (
  <div className="w-16 bg-gray-900 p-4 flex flex-col items-center transition-all duration-300 ease-in-out">
    <div className="mb-8">
      <MessageSquare size={32} />
    </div>
    <div className="mb-8">
      <Search size={32} />
    </div>
    <div className="mt-auto">
      <Settings size={32} />
    </div>
  </div>
);

export default IconSidebar;
