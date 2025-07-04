import MessageInput from './MessageInput';

const ChatArea = () => (
  <div className="flex-grow flex flex-col items-center justify-between p-6">
    <div className="flex-grow flex items-center justify-center text-gray-600 text-4xl font-bold">
      LM STUDIO
    </div>
    <div className="w-full max-w-3xl">
      <MessageInput />
    </div>
  </div>
);

export default ChatArea;
