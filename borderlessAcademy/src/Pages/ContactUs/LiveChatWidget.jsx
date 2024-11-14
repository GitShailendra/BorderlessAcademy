import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  MessageCircle, 
  X, 
  Send, 
  MinusCircle,
  Maximize2,
  Globe,
  Bot,
  User,
} from 'lucide-react';

export default function LiveChatWidget() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ms', name: 'Bahasa Malaysia', flag: '🇲🇾' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ];

  const [chatHistory] = useState([
    {
      type: 'bot',
      message: 'Hello! How can I help you today?',
      time: '10:00 AM'
    },
    {
      type: 'bot',
      message: 'You can ask me about our programs, enrollment process, or technical support.',
      time: '10:00 AM'
    }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Handle message sending logic here
    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div 
      className={`fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl transition-all ${
        isMinimized ? 'h-16' : 'h-[600px]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <h3 className="font-semibold text-gray-800">Live Support</h3>
        </div>
        <div className="flex items-center space-x-2">
          {/* Language Selector */}
          <div className="relative group">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Globe className="h-5 w-5 text-gray-500" />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${
                    selectedLanguage === lang.code ? 'bg-gray-50' : ''
                  }`}
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Minimize/Maximize */}
          <button 
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {isMinimized ? (
              <Maximize2 className="h-5 w-5 text-gray-500" />
            ) : (
              <MinusCircle className="h-5 w-5 text-gray-500" />
            )}
          </button>
          
          {/* Close */}
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Chat Messages */}
          <div className="h-[440px] overflow-y-auto p-4 space-y-4">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`flex ${
                  chat.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div className={`flex items-start max-w-[80%] ${
                  chat.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}>
                  <div className={`p-2 rounded-full ${
                    chat.type === 'user' ? 'bg-primary text-white' : 'bg-gray-100'
                  }`}>
                    {chat.type === 'user' ? (
                      <User className="h-5 w-5" />
                    ) : (
                      <Bot className="h-5 w-5" />
                    )}
                  </div>
                  <div className={`mx-2 ${
                    chat.type === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    <div className={`p-3 rounded-lg ${
                      chat.type === 'user' ? 'bg-primary text-white' : 'bg-gray-100'
                    }`}>
                      {chat.message}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {chat.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t">
            <form onSubmit={handleSend} className="flex items-center space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="p-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
            <div className="mt-2 text-xs text-gray-500 text-center">
              Support available in multiple languages • Response time: ~5 minutes
            </div>
          </div>
        </>
      )}
    </div>
  );
}