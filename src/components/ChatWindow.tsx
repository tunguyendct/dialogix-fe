import MessageInput from './MessageInput';
import MessageList from './MessageList';

const ChatWindow = () => (
  <div className="bg-white w-full max-w-2xl h-[80vh] my-8 rounded-2xl shadow-lg flex flex-col overflow-hidden">
    <MessageList />
    <MessageInput />
  </div>
);

export default ChatWindow;
