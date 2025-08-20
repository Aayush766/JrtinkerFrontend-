import React, { useState, useRef, useEffect } from "react";
import { BsSend } from "react-icons/bs";
import { TbMessageChatbot } from "react-icons/tb";
import { motion } from "framer-motion";
import { GoDash } from "react-icons/go";

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [inputText, setInputText] = useState("");
  const chatRef = useRef(null);

  const handleSend = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      const userMessage = inputText.trim();
      setMessages((prev) => [...prev, { text: userMessage, sender: "user" }]);
      setInputText("");

      setTimeout(() => {
        const lowerCaseMessage = userMessage.toLowerCase();

        if (
          lowerCaseMessage.includes("stem lab") ||
          lowerCaseMessage.includes("stem") ||
          lowerCaseMessage.includes("lab") ||
          lowerCaseMessage.includes("about stem") ||
          lowerCaseMessage.includes("what is stem lab") ||
          lowerCaseMessage.includes("tell me about stem lab")
        ) {
          setMessages((prev) => [
            ...prev,
            {
              text:
                "Our STEM Lab is a creative space designed for young innovators! Here, students explore Science, Technology, Engineering, and Math through fun experiments, robotics, coding, and hands-on activities. 🚀",
              sender: "bot",
            },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              text:
                "Thank you for your question! Let me assist you further or connect you with a team member for detailed support. 😊",
              sender: "bot",
            },
          ]);
        }
      }, 500);
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.2 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="chat-box w-[420px] h-[600px] bg-white border origin-bottom-right border-gray-200 rounded-3xl shadow-md flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="chat-top px-6 py-4 bg-blue-100 border-b border-gray-200 flex items-center justify-between gap-3 text-gray-800">
        <div className="flex items-center gap-3">
          <ChatbotIcon />
          <p className="text-xl font-semibold ">AI Assistant</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 bg-blue-200 rounded-full cursor-pointer"
        >
          <GoDash className="text-2xl font-semibold text-blue-700 " />
        </button>
      </div>

      {/* Chat messages */}
      <div
        ref={chatRef}
        className="chat-middle flex-1 overflow-x-hidden overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ x: message.sender === "bot" ? -20 : 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`flex ${
              message.sender === "bot" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-[75%] p-3 rounded-xl shadow-sm ${
                message.sender === "bot"
                  ? "bg-gray-100 text-gray-800 flex gap-3 items-start"
                  : "bg-blue-200 text-blue-800"
              }`}
            >
              {message.sender === "bot" && <ChatbotIcon />}
              <p>{message.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input field */}
      <div className="chatend w-full px-4 py-3 bg-gray-50 flex items-center gap-2 border-t border-gray-200">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          className="w-full px-4 py-2 bg-white text-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm placeholder-gray-400 border border-gray-200"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 p-3 rounded-full text-white shadow-md hover:bg-blue-600 transition-all duration-300"
        >
          <BsSend className="text-xl" />
        </button>
      </div>
    </motion.div>
  );
};

const ChatbotIcon = () => {
  return (
    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shadow-sm">
      <TbMessageChatbot className="text-2xl text-blue-500" />
    </div>
  );
};

export default Chatbot;
