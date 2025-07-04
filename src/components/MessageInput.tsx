import { ArrowUp, Paperclip } from 'lucide-react';

const MessageInput = () => (
  <form className="relative flex items-center bg-gray-700 rounded-lg p-2">
    <button className="p-2 text-gray-400 hover:text-white transition-colors duration-200">
      <Paperclip size={20} />
    </button>
    <textarea
      placeholder="Type a message and press Enter to send ..."
      className="flex-grow bg-transparent text-white focus:outline-none resize-none overflow-hidden h-10 py-2 px-2"
      rows={1}
    />
    <button
      type="submit"
      className="ml-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors duration-200"
    >
      <ArrowUp size={20} />
    </button>
  </form>
);

export default MessageInput;
