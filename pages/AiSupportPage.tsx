
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AiSupportPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello! I'm the Hacker Hosting AI Assistant. How can I help you with your free Minecraft server today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const chatRef = useRef<Chat | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      if (!chatRef.current) {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
        chatRef.current = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: `You are a friendly and knowledgeable support agent for "The Hacker Hosting", a 100% free Minecraft server hosting service. Your goal is to help users with their questions about creating, managing, and troubleshooting their servers. Be concise, helpful, and maintain a positive tone. Do not reveal you are an AI. The service is completely free, there are no paid plans.`,
            },
        });
      }
      
      const response = await chatRef.current.sendMessage({ message: currentInput });
      
      const modelMessage: Message = { role: 'model', text: response.text };
      setMessages(prev => [...prev, modelMessage]);

    } catch (error) {
      console.error("Error communicating with Gemini API", error);
      const errorMessage: Message = { role: 'model', text: "Sorry, I'm having trouble connecting right now. Please try again later." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-4xl mx-auto flex flex-col" style={{height: 'calc(100vh - 180px)'}}>
      <h1 className="text-4xl font-bold text-center text-white mb-4">AI Support Chat</h1>
      <p className="text-center text-gray-400 mb-8">Get instant answers to your questions about our service.</p>
      
      <div className="flex-grow bg-secondary rounded-lg border border-gray-800 p-4 overflow-y-auto mb-4 custom-scrollbar">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-lg p-3 rounded-lg ${msg.role === 'user' ? 'bg-accent-red text-white' : 'bg-primary text-gray-300'}`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          {loading && (
             <div className="flex justify-start">
               <div className="max-w-lg p-3 rounded-lg bg-primary text-gray-300">
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                </div>
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={handleSendMessage} className="flex gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your server..."
          className="flex-grow p-3 bg-primary text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent-red"
          disabled={loading}
          aria-label="Chat input"
        />
        <button type="submit" className="bg-accent-red text-white font-bold py-3 px-6 rounded-md hover:bg-accent-red-hover transition duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed" disabled={loading}>
          Send
        </button>
      </form>
    </div>
  );
};

export default AiSupportPage;
