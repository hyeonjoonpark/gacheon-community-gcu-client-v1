"use client"

import React, { useState, useEffect } from 'react';
import { useChatStore, initializeChatStore } from '@/store/chatStore';

const ChatWindow = ({ roomId, department }: { roomId: string, department: string }) => {
  const { minimizeChat, maximizeChat, getMessages, addMessage, chatRooms, toggleChat, isRoomOpen } = useChatStore();
  const [inputMessage, setInputMessage] = useState('');
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    initializeChatStore();
  }, []);

  const messages = getMessages(roomId);
  const chatRoom = chatRooms[roomId];
  const isMinimized = chatRoom?.isMinimized;

  const handleMinimize = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    minimizeChat(roomId);
  };

  const handleMaximize = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    maximizeChat(roomId);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      addMessage(roomId, {
        id: Date.now().toString(),
        text: inputMessage.trim(),
        timestamp: new Date(),
        sender: 'user'
      });
      setInputMessage('');
    }
  };

  if (!mounted || !isRoomOpen(roomId)) return null;

  return (
    <div className="fixed bottom-4 right-4">
      {isMinimized ? (
        <div 
          className="w-60 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 cursor-pointer"
          onClick={handleMaximize}
        >
          <div className="flex justify-between items-center p-2">
            <div className="font-medium text-gray-900 dark:text-white">{department}</div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleMaximize(e);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              ▲
            </button>
          </div>
        </div>
      ) : (
        <div 
          className="w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl"
        >
          <div className="flex justify-between items-center p-4 border-b">
            <div className="font-medium">{department}</div>
            <button 
              onClick={handleMinimize} 
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              ▼
            </button>
          </div>
          <div className="h-96 flex flex-col">
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((message) => (
                <div key={message.id} className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block px-4 py-2 rounded-lg ${
                    message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                  }`}>
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => {
                    console.log('Input value:', e.target.value);
                    setInputMessage(e.target.value);
                  }}
                  placeholder="메시지를 입력하세요..."
                  className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  전송
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow; 