import { Send } from 'lucide-react';

const MessageInput = () => (
  <form className="relative">
    <input
      type="text"
      placeholder="Type your message..."
      className="w-full bg-gray-700 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      type="submit"
      className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white font-bold p-2 rounded-full"
    >
      <Send />
    </button>
  </form>
);

export default MessageInput;
