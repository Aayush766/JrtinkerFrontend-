import React from 'react';
import { BsSend } from 'react-icons/bs';
import { TbMessageChatbot } from 'react-icons/tb';
import { motion } from 'framer-motion';

const Chatbot = () => {
  return (
    <section className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="chat-box w-[420px] h-[600px] bg-gray-900 border border-gray-700 rounded-3xl shadow-xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="chat-top px-6 py-4 bg-gray-800 flex items-center gap-3 text-white border-b border-gray-700">
          <ChatbotIcon />
          <p className="text-xl font-semibold">AI Chatbot</p>
        </div>

        {/* Chat messages */}
        <div className="chat-middle flex-1 overflow-y-auto p-4 space-y-4">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="chatbot-text flex gap-3 items-start">
            <ChatbotIcon />
            <p className="bg-gray-700 text-gray-200 px-4 py-3 rounded-xl max-w-[75%] shadow-md">Hello! How can I assist you today?</p>
          </motion.div>
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="user-text text-right">
            <p className="bg-blue-500 text-white px-4 py-3 rounded-xl inline-block max-w-[75%] shadow-md">Tell me about yourself?</p>
          </motion.div>
        </div>

        {/* Input field */}
        <div className="chatend w-full px-4 py-3   bg-gray-850 flex items-center gap-2">
          <input 
            type="text" 
            placeholder="Type your message..." 
            className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm placeholder-gray-400"
          />
          <button className="bg-blue-600 p-3 rounded-full text-white shadow-lg hover:bg-blue-700 transition-all duration-300">
            <BsSend className="text-xl" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};

const ChatbotIcon = () => {
  return (
    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shadow-md">
      <TbMessageChatbot className="text-2xl text-white" />
    </div>
  );
};

export default Chatbot;
