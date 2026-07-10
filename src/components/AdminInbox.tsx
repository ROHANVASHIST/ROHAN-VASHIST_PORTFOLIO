import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, User, Calendar, MessageSquare, ChevronDown, ChevronUp, ExternalLink, RefreshCw } from 'lucide-react';

interface Message {
  id: number;
  date: string;
  name: string;
  email: string;
  message: string;
  subject?: string;
}

export default function AdminInbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    fetch('/api/data/messages')
      .then(res => res.json())
      .then(data => {
        setMessages(data.messages || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load messages');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'new_message') {
          setMessages(prev => [data.message, ...prev]);
        }
      } catch {}
    };

    ws.onerror = () => {};

    return () => ws.close();
  }, []);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500">
        <RefreshCw className="w-5 h-5 animate-spin mr-2" />
        Loading messages...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl text-sm">
        {error}
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-20">
        <Mail className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
        <p className="text-gray-500 dark:text-gray-400 font-medium">No messages yet</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Contact form submissions will appear here in real-time.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {messages.length} message{messages.length !== 1 ? 's' : ''}
        </p>
      </div>

      <AnimatePresence>
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm"
          >
            <button
              onClick={() => setExpandedId(expandedId === msg.id ? null : msg.id)}
              className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-gray-900 dark:text-white truncate">{msg.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{msg.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">
                  {formatDate(msg.date)}
                </span>
                {expandedId === msg.id ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </button>

            <AnimatePresence>
              {expandedId === msg.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-2 border-t border-gray-100 dark:border-white/5">
                    <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 mb-3">
                      <Calendar className="w-3 h-3" />
                      {formatDate(msg.date)}
                    </div>
                    {msg.subject && (
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Subject: {msg.subject}
                      </p>
                    )}
                    <div className="bg-gray-50 dark:bg-gray-950 rounded-xl p-4">
                      <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                        {msg.message}
                      </p>
                    </div>
                    <a
                      href={`mailto:${msg.email}`}
                      className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Reply via email
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
