import React, { useState, useEffect } from "react";
import { useLanguage } from "../LanguageContext"; // Import the language context

const Chatbot = () => {
  const { language } = useLanguage(); // Access the current language

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false); // Chat is closed by default
  const [isFirstMessageSent, setIsFirstMessageSent] = useState(false); // To track if the bot's initial message is already sent
  const phoneNumber = "+966536258731"; // Replace with your WhatsApp number including country code

  // Handle the delay before showing the chatbot
  useEffect(() => {
    // Check screen width to determine if it's mobile or large screen
    const isMobile = window.innerWidth <= 768;

    // If it's a mobile view, the chat remains closed by default
    if (!isMobile) {
      // Add delay of 5 seconds for laptop/large screens before opening the chatbot
      const timer = setTimeout(() => {
        setIsChatOpen(true); // Open chatbot after 5 seconds
      }, 5000); // 5 seconds delay for larger screens

      // Clean up the timer on component unmount
      return () => clearTimeout(timer);
    } else {
      // For mobile view, ensure the chat remains closed initially
      setIsChatOpen(false);
    }
  }, []); // Empty dependency array ensures the effect runs only on mount

  // Handle sending a message
  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        sender: "user",
        text: inputMessage,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage("");

      // Open WhatsApp Web in a new tab (force browser version)
      const whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
        inputMessage
      )}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  // Handle input change for the message
  const handleInputChange = (e) => setInputMessage(e.target.value);

  // Handle key press to send message on Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission or other default behavior
      handleSendMessage(); // Trigger message sending
    }
  };

  // Handle opening and closing of the chat window
  const handleToggleChat = () => setIsChatOpen((prev) => !prev); // Toggle chat visibility
  const handleCloseChat = () => setIsChatOpen(false); // Close the chat window

  // Automatically send "Hey, how can I help you?" when the chat opens
  useEffect(() => {
    if (isChatOpen && !isFirstMessageSent) {
      // Wait for the chat to open, then send the initial message
      const initialMessage = {
        sender: "bot",
        text: "Hey, how can I help you?",
      };
      setMessages((prevMessages) => [...prevMessages, initialMessage]);
      setIsFirstMessageSent(true);
    }
  }, [isChatOpen, isFirstMessageSent]); // Trigger effect when chat window opens

  return (
    <>
      {/* WhatsApp Button (fixed at the bottom-right) */}
      {!isChatOpen && (
        <a
          href="#"
          onClick={handleToggleChat}
          className="fixed bottom-4 right-8 p-4  bg-green-600 text-white rounded-full hover:bg-[#FA9F36] transition-all z-50"
          style={{ width: "60px", height: "60px", borderRadius: "50%" }}
        >
          <i className="fab fa-whatsapp text-3xl"></i> {/* WhatsApp logo */}
        </a>
      )}

      {/* Chat Window (overlay on top of the page content) */}
      <div
        className={`fixed right-8 w-96 bg-gray-200 shadow-xl rounded-lg p-4 z-50 transition-all duration-1000 ${
          isChatOpen ? "bottom-24" : "-bottom-96"
        }`}
      >
        {/* Header with Close Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold bg-green-600 w-full py-4 text-center rounded-lg">
            Chat With Us
          </h2>
          <button
            onClick={handleCloseChat}
            className="ml-4 text-xl text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-times"></i> {/* Close (cross) icon */}
          </button>
        </div>

        {/* Chat Window */}
        <div className="flex flex-col space-y-4 h-56 overflow-y-auto p-2 mb-4 border-b">
          {/* Only display the first message */}
          {messages.length > 0 && (
            <div
              className={`flex ${
                messages[0].sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-2 rounded-lg max-w-xs ${
                  messages[0].sender === "user" ? "bg-blue-500" : "bg-white"
                }`}
              >
                {messages[0].text}
              </div>
            </div>
          )}
        </div>

        {/* Message Input Section */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="w-full p-2 border rounded-3xl"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-green-600 hover:bg-[#FA9F36] text-white rounded-3xl"
          >
            Send
          </button>
        </div>
      </div>

      {/* Cross Button (when the chat window is open) */}
      {isChatOpen && (
        <button
          onClick={handleCloseChat}
          className="fixed bottom-4 right-8 p-4  bg-green-600 text-white rounded-full shadow-lg hover:bg-[#FA9F36] transition-all z-50"
          style={{ width: "60px", height: "60px", borderRadius: "50%" }}
        >
          <i className="fas fa-times text-3xl"></i> {/* Close button */}
        </button>
      )}
    </>
  );
};

export default Chatbot;
