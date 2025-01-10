'use client';

import React, { useState } from 'react';
import { useSocket } from "@/hooks/useSocket"

interface ChatProps {
  role: 'admin' | 'proveedor';
}

const Chat: React.FC<ChatProps> = ({ role }) => {
  const { messages, sendMessage } = useSocket(role);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    sendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col w-full max-w-md p-4 mx-auto bg-white shadow-md rounded-lg">
      <div className="h-64 overflow-y-auto border border-gray-300 p-2 rounded-md mb-4">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 rounded-md mb-2 ${msg.sender === role ? 'bg-blue-100' : 'bg-gray-100'}`}>
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border border-gray-300 p-2 rounded-md"
          placeholder="Escribe un mensaje..."
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;
