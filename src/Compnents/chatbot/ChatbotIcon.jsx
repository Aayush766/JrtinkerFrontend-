import React from 'react'
import { TbMessageChatbot } from "react-icons/tb";
const ChatbotIcon = () => {
    return (
      <div className="w-10 h-10 rounded-full bg-purple-400 flex items-center justify-center shadow-md">
        <TbMessageChatbot className="text-2xl text-white" />
      </div>
    );
  };

export default ChatbotIcon