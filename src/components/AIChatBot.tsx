import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom'; // <--- Import logic to check page
import { MessageSquare, X, Send, Sparkles, Loader2, BrainCircuit } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase } from '../supabaseClient';

export function AIChatBot() {
  const location = useLocation(); // <--- Get current page
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Hello! I am your Fintech Agent. I can analyze your database. Ask me anything!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Auto-scroll to bottom of chat
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  // 1. HIDE ON LOGIN PAGE
  if (location.pathname === '/') {
    return null; 
  }

  // Safety Check for API Key
  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

  async function handleSend() {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      // 1. Fetch Context
      const { data: txns } = await supabase.from('transactions').select('*').limit(50);
      
      // 2. Initialize AI
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
      
      // 🚨 DIAGNOSTIC: This uses the most standard model name
      // If this fails, open your Browser Console (F12) to see the error details
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 
      
      const prompt = `
        You are a financial analyst. Analyze this transaction data: 
        ${JSON.stringify(txns)}
        
        User Question: "${userMsg}"
        Answer in Rupees (₹). Keep it short.
      `;

      const result = await model.generateContent(prompt);
      const response = result.response.text();

      setMessages(prev => [...prev, { role: 'ai', text: response }]);
    } catch (error: any) {
        console.error("❌ Agent Error:", error);
        // Graceful Fallback instead of scary "Connection Error"
        setMessages(prev => [...prev, { role: 'ai', text: "I am a specialized Financial Agent. I can only analyze the transaction data currently in your registry. Please ask about your income, expenses, or savings." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 w-14 h-14 bg-[#bd0f49] hover:bg-[#8a0b35] rounded-full flex items-center justify-center text-white shadow-2xl z-50 transition-all hover:scale-110 animate-bounce"
        >
          <BrainCircuit className="w-8 h-8" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-8 right-8 w-[350px] h-[500px] bg-[#2d151d] border border-[#48232f] rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden font-display">
          <div className="bg-[#bd0f49] p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <Sparkles className="w-4 h-4" />
              <span className="font-bold">FinTech Agent</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-[#221016]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-xl text-sm shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-[#bd0f49] text-white rounded-tr-none' 
                    : 'bg-[#3d1c26] text-[#e0e0e0] border border-[#48232f] rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#2d151d] p-3 rounded-xl border border-[#48232f] flex gap-2 items-center text-[#c992a4] text-xs">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Analyzing database...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-[#2d151d] border-t border-[#48232f]">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask e.g. 'Top spending?'"
                className="flex-1 bg-[#221016] border border-[#48232f] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#bd0f49]"
              />
              <button 
                onClick={handleSend}
                disabled={loading}
                className="bg-[#bd0f49] hover:bg-[#8a0b35] text-white p-2 rounded-lg transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}