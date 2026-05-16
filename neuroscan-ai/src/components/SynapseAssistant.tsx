'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';

const SynapseAssistant = ({ scanResult, phase }: { scanResult: any, phase: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const INITIAL_MESSAGE = { text: "Synapse AI online. I am your neural diagnostics assistant. How can I assist you with your brain mapping today?", sender: 'ai' as const };
  
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');

  // Handle Session Reset when entering Landing Phase
  useEffect(() => {
    if (phase === 'landing') {
      setMessages([INITIAL_MESSAGE]);
      setIsOpen(false);
    }
  }, [phase]);

  // Handle Scan Updates
  useEffect(() => {
    if (scanResult && phase === 'analysis') {
      // Append diagnostic message only when analysis begins
      setMessages(prev => [
        ...prev,
        { text: `Protocol Update: Scan Authenticated. I've analyzed your neuro-metrics. Would you like me to explain the '${scanResult.confidence}% Confidence' score in plain English?`, sender: 'ai' }
      ]);
      setIsOpen(true);
    }

    if (phase === 'landing') {
      const timer = setTimeout(() => {
        if (!scanResult) setIsOpen(true);
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [scanResult, phase]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    const userMessage = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage],
          scanResult: scanResult 
        })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { text: data.text, sender: 'ai' }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: "Connection to neural core lost. Attempting resync...", sender: 'ai' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[120]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass w-80 md:w-96 rounded-[32px] overflow-hidden flex flex-col shadow-2xl border-white/20 mb-4"
          >
            {/* Chat Header */}
            <div className="bg-white/5 p-4 flex justify-between items-center border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                  <Sparkles size={16} className="text-cyan-400" />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-widest uppercase">Synapse AI</div>
                  <div className="text-[10px] text-cyan-400 flex items-center gap-1">
                    <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" /> GEMINI POWERED
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 flex flex-col scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`max-w-[85%] p-3 rounded-2xl text-[13px] leading-relaxed transition-all ${
                  msg.sender === 'ai' ? 'bg-white/5 border border-white/10 self-start text-white/80' : 'bg-cyan-500/20 border border-cyan-500/30 self-end text-cyan-50'
                }`}>
                  {msg.text}
                </div>
              ))}
              {isLoading && (
                <div className="bg-white/5 border border-white/10 self-start p-3 rounded-2xl flex items-center gap-2">
                  <Loader2 className="animate-spin text-cyan-400" size={14} />
                  <span className="text-[10px] font-bold tracking-widest uppercase text-white/40">Thinking...</span>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/5 flex gap-2">
              <input 
                type="text" 
                placeholder="Ask anything about neuro-diagnostics..."
                className="flex-1 bg-transparent border-none text-[13px] focus:ring-0 placeholder:text-white/20 disabled:opacity-50"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                disabled={isLoading}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="text-cyan-400 hover:text-cyan-300 transition-colors disabled:opacity-30"
              >
                <Send size={18} />
              </button>
            </div>
            
            <div className="p-2 bg-white/5 text-[8px] text-center text-white/20 tracking-widest uppercase border-t border-white/5">
              ASSISTIVE BRAIN AI ENGINE
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-2xl glass flex items-center justify-center border-white/20 shadow-xl group relative overflow-hidden"
      >
        <MessageSquare className="text-white group-hover:text-cyan-400 transition-colors relative z-10" size={24} />
        <div className="absolute inset-0 bg-cyan-400/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
      </motion.button>
    </div>
  );
};

export default SynapseAssistant;
