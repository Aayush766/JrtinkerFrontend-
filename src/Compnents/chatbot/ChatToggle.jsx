import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { TbMessageChatbot } from 'react-icons/tb';
import Chatbot from './Chatbot2';
import { motion, AnimatePresence } from 'framer-motion';

const ChatToggle = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="fixed right-0 bottom-0 z-[9999] flex items-end m-4">
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="h-[600px] bg-transparent rounded-3xl shadow-2xl overflow-hidden mb-4"
          >
            <Chatbot onClose={toggleChat} />
          </motion.div>
        )}
      </AnimatePresence>

      {!isChatOpen && (
        <motion.button
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15,duration:1 }}
          onClick={toggleChat}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 shadow-xl flex items-center justify-center cursor-pointer transition-all duration-300"
        >
          <TbMessageChatbot className="text-3xl text-white" />
        </motion.button>
      )}
    </div>
  );
};

export default ChatToggle;