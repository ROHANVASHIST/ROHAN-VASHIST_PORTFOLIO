import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Loader2, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'model';
  parts: [{ text: string }];
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          history: messages,
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      const modelMessage: Message = { role: 'model', parts: [{ text: data.text }] };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = { 
        role: 'model', 
        parts: [{ text: "I'm sorry, I encountered an error. Please try again later or contact Rohan directly." }] 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-gray-950/40 dark:bg-black/60 backdrop-blur-xs z-[140]"
          />
        )}
      </AnimatePresence>

      {/* Slide-out Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="fixed top-0 right-0 h-screen w-full sm:w-[440px] bg-white dark:bg-gray-900 border-l border-gray-100 dark:border-gray-850 z-[150] flex flex-col shadow-2xl overflow-hidden transition-colors font-sans"
            id="chat-sidebar"
          >
            {/* Sidebar Header */}
            <div className="p-6 bg-cyan-600 text-white flex items-center justify-between shadow-md relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/15">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base leading-tight">Rohan's Assistant</h3>
                  <p className="text-xs text-cyan-100 flex items-center gap-1 mt-0.5">
                    <Sparkles size={10} className="animate-pulse" /> Ask me about Rohan's research and work
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                aria-label="Close chat sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-grow overflow-y-auto p-6 space-y-5 scroll-smooth">
              {messages.length === 0 && (
                <div className="text-center py-16 px-6">
                  <div className="w-16 h-16 bg-cyan-50 dark:bg-cyan-900/20 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-cyan-100 dark:border-cyan-800/30">
                    <MessageSquare className="w-7 h-7 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2">Hello there!</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
                    Hi! I'm Rohan's AI research and professional assistant. Ask me anything about his projects, thermodynamics research, skills, or portfolio.
                  </p>
                </div>
              )}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                      msg.role === 'user'
                        ? 'bg-cyan-600 text-white rounded-tr-none shadow-md shadow-cyan-600/5'
                        : 'bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-100 dark:border-gray-700/50'
                    }`}
                  >
                    <div className="prose prose-sm dark:prose-invert max-w-none leading-relaxed">
                      <ReactMarkdown>{msg.parts[0].text}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl rounded-tl-none border border-gray-100 dark:border-gray-700/50 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-cyan-600 dark:text-cyan-400" />
                    <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">Assistant thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form Footer */}
            <form onSubmit={handleSubmit} className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/30">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="w-full pl-5 pr-14 py-3.5 bg-white dark:bg-gray-901 border border-gray-100 dark:border-gray-800 rounded-2xl text-sm focus:ring-2 focus:ring-cyan-600 outline-none text-gray-900 dark:text-white transition-all shadow-xs"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2.5 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 disabled:opacity-50 disabled:hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-600/20 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[130] w-14 h-14 bg-cyan-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-cyan-600/30 cursor-pointer"
        aria-label="Toggle chat sidebar"
        id="chat-toggle"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </>
  );
}
