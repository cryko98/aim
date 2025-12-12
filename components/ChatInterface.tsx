import React, { useState, useRef, useEffect } from 'react';
import { Send, Cpu, AlertTriangle, ExternalLink, RefreshCw } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: 'Greetings, Patriot. I am the American Intelligence Model ($AIM). I am connected to the grid and ready to brief you on US laws, crypto regulations, and national affairs. What is your query?',
      timestamp: Date.now()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessageToGemini(userMsg.text, messages);
      
      const modelMsg: ChatMessage = {
        role: 'model',
        text: response.text,
        sources: response.sources,
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'model',
        text: 'Connection disrupted. Secure line unstable. Please retry.',
        timestamp: Date.now(),
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div id="chat" className="w-full max-w-5xl mx-auto px-4 py-12 relative z-10">
      <div className="bg-slate-900/80 backdrop-blur-xl border border-blue-900/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[700px]">
        
        {/* Header */}
        <div className="bg-slate-950 p-4 border-b border-blue-900/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur opacity-40 animate-pulse rounded-full"></div>
              <Cpu className="w-6 h-6 text-blue-400 relative z-10" />
            </div>
            <div>
              <h3 className="font-tech font-bold text-white tracking-wider">SECURE TERMINAL <span className="text-xs bg-blue-900 text-blue-200 px-2 py-0.5 rounded ml-2">ONLINE</span></h3>
              <p className="text-xs text-slate-400">American Intelligence Model v2.5 // Connected to Global News Feed</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
            <div className="h-2 w-2 rounded-full bg-white animate-pulse delay-75"></div>
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse delay-150"></div>
          </div>
        </div>

        {/* Messages Area */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"
        >
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-lg p-4 ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none shadow-[0_0_15px_rgba(37,99,235,0.3)]' 
                  : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none shadow-[0_0_15px_rgba(30,41,59,0.3)]'
              }`}>
                {msg.isError && <AlertTriangle className="inline-block w-4 h-4 text-yellow-500 mr-2" />}
                <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                  {msg.text}
                </div>
                
                {/* Sources Display */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-600/50">
                    <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide flex items-center gap-1">
                      <ExternalLink size={10} /> Declassified Sources:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {msg.sources.map((source, sIdx) => (
                        <a 
                          key={sIdx}
                          href={source.uri}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs bg-slate-900 hover:bg-slate-700 text-blue-300 px-2 py-1 rounded border border-blue-900/30 transition-colors truncate max-w-[200px]"
                        >
                          {source.title || 'Source Link'}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-2 text-[10px] opacity-50 font-mono text-right uppercase">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex justify-start">
               <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 rounded-bl-none">
                 <div className="flex items-center gap-2 text-blue-400 text-sm font-mono animate-pulse">
                   <RefreshCw className="h-4 w-4 animate-spin" />
                   ANALYZING FEDERAL DATABASES...
                 </div>
               </div>
             </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-slate-950 p-4 border-t border-slate-800">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about US Crypto Regulation, Market News, or Political Events..."
              className="flex-1 bg-slate-900 text-white placeholder-slate-500 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent font-sans"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(220,38,38,0.4)]"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-2 text-center">
             <span className="text-[10px] text-slate-500 uppercase tracking-widest">
               Encrypted by Solana Blockchain Technology
             </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;