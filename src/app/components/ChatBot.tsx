import React, { useRef, useState, useEffect } from 'react';

// Define proper interfaces for your component props and data
interface ChatBotProps {
  userInput?: string;
  userData?: UserData;
}

interface UserData {
  id: string;
  name: string;
  // Add other user data properties as needed
}

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot: React.FC<ChatBotProps> = ({ userInput, userData }) => {
  // Properly typed state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  // Properly typed refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Toggle chat window visibility
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);
  
  // Properly typed event handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage: ChatMessage = {
        text: input,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setInput('');
      // Process the message and generate a response
      processMessage(input);
    }
  };
  
  const processMessage = (text: string) => {
    // Your chatbot logic here
    setTimeout(() => {
      const botResponse: ChatMessage = {
        text: `I'm your financial assistant. How can I help you manage your money better?`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 1000);
  };
  
  // Scroll to bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Process data properly
  const processData = (data: any) => {
    if (!data) return null;
    
    try {
      // Type check or convert your data as needed
      return JSON.parse(JSON.stringify(data));
    } catch (error) {
      console.error('Error processing data:', error);
      return null;
    }
  };
  
  // Initialize with welcome message when first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        text: "Hi there! I'm your financial assistant. How can I help you today?",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Icon Button */}
      <button 
        onClick={toggleChat}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOpen ? 'bg-red-500 rotate-90' : 'bg-blue-600 hover:bg-blue-700'
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
      
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 h-96 bg-white rounded-lg shadow-xl overflow-hidden flex flex-col">
          {/* Chat Header */}
          <div className="bg-blue-600 text-white p-3 flex items-center justify-between">
            <h3 className="font-medium">Financial Assistant</h3>
            <span className="text-xs bg-green-400 px-2 py-1 rounded-full">Online</span>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-3 ${
                  msg.sender === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div 
                  className={`inline-block rounded-lg px-3 py-2 max-w-3/4 break-words ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat Input */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t flex">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;