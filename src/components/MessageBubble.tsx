import { Message } from '@/types/chat';
import { User, Bot } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  console.log('MessageBubble rendered for:', message.role, message.content.substring(0, 50));
  
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex gap-3 mb-4 animate-slide-up ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser 
          ? 'bg-ai-blue-100 text-ai-blue-600' 
          : 'bg-ai-green-100 text-ai-green-600'
      }`}>
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      
      <div className={`max-w-[80%] rounded-lg p-3 ${
        isUser 
          ? 'bg-ai-blue-600 text-white ml-auto' 
          : 'bg-gray-100 text-gray-800'
      }`}>
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
        <div className={`text-xs mt-2 ${
          isUser ? 'text-ai-blue-100' : 'text-gray-500'
        }`}>
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;