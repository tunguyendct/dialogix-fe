import { Bot, User } from 'lucide-react';

const MessageList = () => (
  <div className="space-y-4">
    <div className="flex items-start">
      <div className="flex-shrink-0">
        <User className="h-8 w-8 rounded-full bg-gray-600 p-1" />
      </div>
      <div className="ml-3">
        <p className="font-bold">You</p>
        <p>Hello, how are you?</p>
      </div>
    </div>
    <div className="flex items-start">
      <div className="flex-shrink-0">
        <Bot className="h-8 w-8 rounded-full bg-blue-500 p-1" />
      </div>
      <div className="ml-3">
        <p className="font-bold">Dialogix</p>
        <p>I am fine, thank you. How can I help you today?</p>
      </div>
    </div>
  </div>
);

export default MessageList;
