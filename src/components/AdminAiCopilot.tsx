import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Loader2, Copy, Check, Mail, Server, FileText, Briefcase, PlusCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'model';
  parts: [{ text: string }];
}

export default function AdminAiCopilot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const presets = [
    {
      id: 'newsletter',
      label: 'Draft Newsletter',
      prompt: 'Draft an engaging quarterly newsletter update for my subscribers. Focus on my recent thermodynamics and direct air capture systems research, keeping the tone inspiring and clean.',
      icon: Mail,
      color: 'text-indigo-500'
    },
    {
      id: 'projects',
      label: 'Generate Rust/WASM Project',
      prompt: 'Draft a brand new high-caliber engineering project listing in standard JSON portfolio format. The theme should be a Rust and WebAssembly web application for molecular simulator solvers.',
      icon: Briefcase,
      color: 'text-amber-500'
    },
    {
      id: 'optimize-bio',
      label: 'Optimize Headline & Bio',
      prompt: 'Review my biography and headline. Rewrite them to emphasize computational fluid dynamics (CFD), multi-physics design, and Direct Air Capture thermodynamics research to represent an industry expert.',
      icon: FileText,
      color: 'text-emerald-500'
    },
    {
      id: 'suggest-services',
      label: 'Suggest High-Value Services',
      prompt: 'Based on my skills, what are 3 consulting services I can offer to green-tech companies? Provide titles, icons name suggestions from lucide-react, and compelling value props.',
      icon: PlusCircle,
      color: 'text-cyan-500 font-bold'
    },
  ];

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', parts: [{ text }] };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages,
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch response');
      const data = await response.json();
      
      const assistantMsg: Message = { role: 'model', parts: [{ text: data.text }] };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (e) {
      console.error(e);
      const errMsg: Message = {
        role: 'model',
        parts: [{ text: 'Error interacting with Admin Gemini endpoint. Make sure GEMINI_API_KEY is configured in Settings > Secrets.' }]
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-gradient-to-r from-cyan-600/10 via-sky-600/5 to-cyan-600/0 rounded-2xl p-6 border border-cyan-500/10 dark:border-cyan-500/5">
        <h2 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2 mb-2">
          <Sparkles className="text-cyan-600 dark:text-cyan-400 animate-pulse" size={22} />
          Admin Creative Copilot
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
          A secure, admin-only research and creative writing studio. This copilot is dynamically connected to your entire portfolio dataset (profile, projects, skills, resume, services, and subscribers). Use it to write newsletter updates, draft new project write-ups, optimize bio sections, or generate direct database updates.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Playbook Presets */}
        <div className="lg:col-span-4 space-y-4">
          <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-1">
            Task Presets / Hot Triggers
          </span>
          <div className="grid grid-cols-1 gap-3">
            {presets.map(p => {
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setInput(p.prompt);
                  }}
                  className="flex items-start gap-4 p-4 text-left bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl transition-all cursor-pointer group hover:scale-[1.01]"
                >
                  <div className={`p-2 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 group-hover:scale-110 transition-transform ${p.color}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                      {p.label}
                    </h4>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 line-clamp-2">
                      {p.prompt}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 flex gap-3 items-center text-xs text-gray-500 dark:text-gray-400">
            <Server size={14} className="text-cyan-500" />
            <span>Connected directly to all live data. Suggestion JSON conforms to system schema automatically.</span>
          </div>
        </div>

        {/* AI Studio Interface */}
        <div className="lg:col-span-8 flex flex-col h-[550px] bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-3xl overflow-hidden shadow-xs">
          {/* Studio Header */}
          <div className="px-6 py-4 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-gray-950/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Studio Workspace Active
              </span>
            </div>
            {messages.length > 0 && (
              <button
                onClick={() => setMessages([])}
                className="text-xs text-gray-500 hover:text-red-500 transition-colors font-bold cursor-pointer"
              >
                Clear Conversation
              </button>
            )}
          </div>

          {/* Message Loop */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6 scroll-smooth">
            {messages.length === 0 && (
              <div className="text-center py-20">
                <div className="w-14 h-14 rounded-2xl bg-cyan-50 dark:bg-cyan-900/10 flex items-center justify-center mx-auto mb-4 border border-cyan-100 dark:border-cyan-900/30">
                  <Sparkles className="text-cyan-600 dark:text-cyan-400" size={24} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  Ready to assist, Rohan.
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                  Click on any hot trigger on the left, or compose a custom instruction below. I can draft posts, optimize items, or produce clean JSON configurations.
                </p>
              </div>
            )}

            {messages.map((msg, index) => {
              const isUser = msg.role === 'user';
              return (
                <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] p-5 rounded-3xl ${isUser ? 'bg-cyan-600 text-white rounded-tr-none' : 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-tl-none border border-gray-100 dark:border-gray-700/50 relative group'}`}>
                    
                    {/* Copy suggestion button for assistant's message */}
                    {!isUser && (
                      <button
                        onClick={() => handleCopy(msg.parts[0].text, index)}
                        className="absolute right-3 top-3 p-1.5 rounded-lg bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 border border-gray-200 dark:border-gray-600 transition-colors opacity-0 group-hover:opacity-100"
                        title="Copy Response to Clipboard"
                      >
                        {copiedIndex === index ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                      </button>
                    )}

                    <div className={`markdown-body prose ${isUser ? 'prose-invert text-white' : 'dark:prose-invert'} text-sm leading-relaxed max-w-none [&_pre]:bg-gray-950 [&_pre]:text-gray-100 [&_code]:font-mono [&_pre]:p-4 [&_pre]:rounded-2xl [&_pre]:mt-4 [&_code]:text-xs [&_pre]:border [&_pre]:border-white/10`}>
                      <ReactMarkdown>{msg.parts[0].text}</ReactMarkdown>
                    </div>

                    {!isUser && copiedIndex === index && (
                      <div className="text-[10px] text-emerald-500 font-bold mt-2 flex items-center gap-1">
                        <Check size={10} /> Copied suggestion to clipboard!
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-3xl rounded-tl-none border border-gray-100 dark:border-gray-700/50 flex items-center gap-2.5">
                  <Loader2 className="w-5 h-5 animate-spin text-cyan-600 dark:text-cyan-400" />
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-semibold animate-pulse">
                    Synthesizing recommendations...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message form composing */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-5 border-t border-gray-100 dark:border-white/5 bg-gray-50/30 dark:bg-gray-950/25"
          >
            <div className="relative flex items-center">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your copilot to write copy, draft templates, generate items..."
                rows={2}
                className="w-full pl-5 pr-14 py-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-2xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none text-gray-900 dark:text-white transition-all shadow-xs resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(input);
                  }
                }}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-3.5 p-3 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 disabled:opacity-50 disabled:hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-600/20 cursor-pointer"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </div>
            <div className="text-[10px] text-gray-400 dark:text-gray-500 mt-2 text-center font-medium">
              Press Enter to send. Shift+Enter for new line. AI drafts format with correct JSON schemas automatically.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
