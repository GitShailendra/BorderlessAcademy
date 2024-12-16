import React, { useState } from 'react';
import {
  Search,
  Plus,
  Send,
  MoreVertical,
  Video,
  Image,
  Paperclip,
  ChevronLeft,
  CheckCheck,
  MessageSquare
} from 'lucide-react';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false);

  // Dummy data for chats - Student perspective
  const chats = [
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      role: "Mathematics Teacher",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Great work on your calculus assignment!",
      time: "10:30 AM",
      unread: 2,
      online: true,
      subject: "Mathematics"
    },
    {
      id: 2,
      name: "Dr. James Miller",
      role: "Physics Teacher",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Don't forget about tomorrow's lab session",
      time: "Yesterday",
      unread: 0,
      online: false,
      subject: "Physics"
    },
    {
      id: 3,
      name: "Ms. Emily Parker",
      role: "Biology Teacher",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Your project proposal looks good",
      time: "Yesterday",
      unread: 1,
      online: true,
      subject: "Biology"
    }
  ];

  // Dummy messages for selected chat
  const messages = [
    {
      id: 1,
      senderId: "teacher",
      text: "Hi Alex! I wanted to discuss your recent calculus assignment",
      time: "10:00 AM",
      status: "read"
    },
    {
      id: 2,
      senderId: "student",
      text: "Yes, I had some questions about the differential equations",
      time: "10:15 AM",
      status: "read"
    },
    {
      id: 3,
      senderId: "teacher",
      text: "Your approach was correct, but try using the chain rule next time",
      time: "10:20 AM",
      status: "read"
    },
    {
      id: 4,
      senderId: "student",
      text: "Thank you for the clarification! I'll revise my solution",
      time: "10:25 AM",
      status: "read"
    }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage('');
    }
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    setShowMobileChat(true);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Chat List */}
      <div className={`w-full md:w-80 border-r border-gray-200 bg-white flex flex-col ${showMobileChat ? 'hidden md:flex' : 'flex'}`}>
        {/* Search Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search teachers..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleChatSelect(chat)}
              className={`p-4 hover:bg-gray-50 cursor-pointer ${
                selectedChat?.id === chat.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-10 h-10 rounded-full"
                  />
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-500">{chat.role}</p>
                  <p className="text-xs text-blue-600 mb-1">{chat.subject}</p>
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="min-w-[1.25rem] h-5 flex items-center justify-center bg-blue-500 text-white text-xs rounded-full">
                    {chat.unread}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col bg-gray-50 ${showMobileChat ? 'flex' : 'hidden md:flex'}`}>
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="h-16 px-4 md:px-6 flex items-center justify-between bg-white border-b border-gray-200">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowMobileChat(false)}
                  className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronLeft size={20} />
                </button>
                <img
                  src={selectedChat.avatar}
                  alt={selectedChat.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <h2 className="font-medium text-gray-900">{selectedChat.name}</h2>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500">{selectedChat.role}</p>
                    <span className="text-xs text-blue-600">{selectedChat.subject}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg hidden md:block">
                  <Video size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreVertical size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex mb-4 ${
                    message.senderId === "student" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] md:max-w-[70%] px-4 py-2 rounded-lg ${
                      message.senderId === "student"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-900"
                    }`}
                  >
                    <p className="break-words">{message.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-xs opacity-75">{message.time}</span>
                      {message.senderId === "student" && (
                        <CheckCheck size={14} className="opacity-75" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2 md:gap-4">
                <button type="button" className="p-2 hover:bg-gray-100 rounded-full">
                  <Paperclip size={20} className="text-gray-600" />
                </button>
                <button type="button" className="p-2 hover:bg-gray-100 rounded-full hidden md:block">
                  <Image size={20} className="text-gray-600" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 py-2 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </>
        ) : (
          // No Chat Selected State
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No message selected</h3>
              <p className="mt-1 text-gray-500">Choose a teacher to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;