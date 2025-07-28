const Footer = () => (
  <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800">
    <div>Dialogix v1.0.0</div>
    <div className="flex space-x-4">
      <span className="hidden md:inline">⌘N New Chat</span>
      <span className="hidden md:inline">⌘K Search</span>
      <span className="hidden md:inline">ESC Clear Error</span>
    </div>
    <div className="flex items-center space-x-2">
      <span>Made with ❤️</span>
    </div>
  </div>
);

export default Footer;
