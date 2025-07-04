import MessageInput from './MessageInput';
import MessageList from './MessageList';

const ChatArea = () => (
  <div className="flex-grow flex flex-col">
    <div className="flex-grow p-6 overflow-y-auto">
      <MessageList />
    </div>
    <div className="p-6">
      <MessageInput />
    </div>
  </div>
);

export default ChatArea;
