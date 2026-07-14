import React, { useState, useRef, useEffect } from "react";
import { Message } from "../types";
import { Send, Trash2, Sparkles, MessageSquare, Compass, Award, Calendar, HelpCircle } from "lucide-react";

export default function ConciergeTab() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Mwiriwe (Good evening) and welcome to Mbarara Grand Holiday Hotel! ♔ I am Grand Host, your dedicated virtual concierge.\n\nI am here to guide you in choosing the perfect luxury suite, estimating wedding or conference budgets, or planning an exciting tour around Mbarara City (including Lake Mburo National Park!). How may I assist you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const promptSuggestions = [
    { label: "💰 Compare Room Rates", prompt: "Could you list all available room types, their rates, and what facilities are included in each?" },
    { label: "🦓 Plan a 2-Day Mbarara Tour", prompt: "I am visiting Mbarara for 2 days. Can you suggest a custom itinerary including Lake Mburo National Park and local cultural centers?" },
    { label: "🌿 Wedding & Event Spaces", prompt: "I am planning an event. Tell me about your scenic gardens, catering services, and how you assist with party setups." },
    { label: "💆‍♀️ Spa & Massage Services", prompt: "What wellness facilities do you have? Tell me about the spa, massage packages, and swimming pool." },
  ];

  // Auto-scroll chat to bottom when message arrives
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    // Append user message
    const userMessage: Message = { role: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Call backend secure Express route
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            parts: [{ text: m.text }],
          }))
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to receive response from Grand Host");
      }

      const data = await response.json();
      const modelText = data.text || "I apologize, I experienced a minor network interruption. Please try asking again, or contact our WhatsApp front desk directly.";
      
      setMessages((prev) => [...prev, { role: "model", text: modelText }]);
    } catch (error) {
      console.error("Concierge API Error:", error);
      setMessages((prev) => [
        ...prev,
        { 
          role: "model", 
          text: "I am having difficulty connecting to my Ankole travel database right now. Please verify your connection, or feel free to chat with our helpful human receptionists directly via our WhatsApp links!" 
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm("Do you want to reset your conversation with Grand Host?")) {
      setMessages([
        {
          role: "model",
          text: "Welcome back! ♔ Grand Host here. I have refreshed my logs. Let me know how I can assist with your accommodation or event inquiries today!",
        },
      ]);
    }
  };

  return (
    <div className="bg-[#FFFBF2] text-[#0A1E3C] pb-16 pt-8">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Tab Intro Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C6A15A]/10 border border-[#C6A15A]/35 text-[11px] font-bold text-[#C6A15A] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Powered Resort Butler</span>
          </div>
          <h2 className="font-serif text-[32px] sm:text-[38px] font-extrabold text-[#0A1E3C]">
            Meet Grand Host
          </h2>
          <p className="text-[13px] text-black/55 max-w-lg mx-auto">
            Ask our smart virtual host anything about room availability, event spaces, spa amenities, or tourist destinations in Mbarara.
          </p>
        </div>

        {/* Main Chat Interface Container */}
        <div className="bg-white rounded-3xl border border-black/5 shadow-xl overflow-hidden flex flex-col h-[560px] relative">
          
          {/* Active Status Header Bar */}
          <div className="bg-[#0A1E3C] text-white p-4 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center font-serif font-extrabold text-[#D4AF37]">
                GH
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#128C7E] rounded-full border-2 border-[#0A1E3C]"></span>
              </div>
              <div>
                <div className="text-[13px] font-bold tracking-wide flex items-center gap-1.5">
                  <span>Grand Host Concierge</span>
                  <span className="text-[10px] bg-[#D4AF37] text-[#0A1E3C] font-extrabold px-1.5 py-0.5 rounded uppercase">AI</span>
                </div>
                <div className="text-[10.5px] text-white/50">Online • Warm Ankole Hospitality</div>
              </div>
            </div>

            <button
              onClick={handleClearHistory}
              title="Clear Chat History"
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Stream Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#FFFBF2]/30">
            {messages.map((msg, idx) => {
              const isUser = msg.role === "user";
              return (
                <div 
                  key={idx}
                  className={`flex items-start gap-2.5 max-w-[85%] ${
                    isUser ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  {/* Avatar Icon */}
                  {!isUser && (
                    <div className="w-8 h-8 rounded-lg bg-[#0A1E3C] text-white font-serif font-bold text-xs flex items-center justify-center shrink-0 border border-[#D4AF37]/35 shadow-sm">
                      GH
                    </div>
                  )}

                  {/* Message Bubble text content */}
                  <div className={`p-4 rounded-2xl text-[13px] sm:text-[13.5px] leading-relaxed whitespace-pre-wrap shadow-sm ${
                    isUser
                      ? "bg-[#0A1E3C] text-white rounded-tr-none"
                      : "bg-white border border-black/5 text-black/85 rounded-tl-none font-medium"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {/*typing indicator */}
            {isTyping && (
              <div className="flex items-start gap-2.5 max-w-[85%] mr-auto animate-pulse">
                <div className="w-8 h-8 rounded-lg bg-[#0A1E3C] text-white font-serif font-bold text-xs flex items-center justify-center shrink-0 border">
                  GH
                </div>
                <div className="p-4 rounded-2xl bg-white border border-black/5 text-black/50 text-xs font-semibold rounded-tl-none flex items-center gap-1.5 shadow-sm">
                  <span>Grand Host is tailoring your plan</span>
                  <span className="flex gap-0.5 mt-1">
                    <span className="w-1.5 h-1.5 bg-[#C6A15A] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-[#C6A15A] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-[#C6A15A] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestions Bar */}
          <div className="px-4 py-2 bg-[#FFFBF2]/50 border-t border-black/5 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-black/35 shrink-0">Suggestions:</span>
            {promptSuggestions.map((sug, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(sug.prompt)}
                className="h-7 px-3 rounded-full bg-white border border-black/10 text-[11px] font-bold hover:border-black/30 hover:bg-[#FFFBF2] text-[#0A1E3C]/80 shrink-0 transition-all shadow-xs"
              >
                {sug.label}
              </button>
            ))}
          </div>

          {/* Form Input Container */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="p-3 bg-white border-t border-black/5 flex items-center gap-2"
          >
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about rooms, wedding planning, Mbarara tourist spots..."
              className="flex-1 h-11 px-4 text-[13px] bg-[#FFFBF2]/50 border border-black/10 rounded-xl outline-none focus:border-[#C6A15A] text-black/85" 
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="w-11 h-11 rounded-xl bg-[#0A1E3C] text-white flex items-center justify-center hover:bg-[#C6A15A] disabled:opacity-40 disabled:hover:bg-[#0A1E3C] transition-all"
            >
              <Send className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </form>

        </div>

        {/* Tourist Guide Quick info card */}
        <div className="mt-8 bg-[#C6A15A]/10 border border-[#C6A15A]/25 rounded-3xl p-5 flex flex-col sm:flex-row items-center gap-4">
          <span className="text-3xl shrink-0">🦓</span>
          <div className="space-y-1">
            <h5 className="text-[13px] font-extrabold text-[#0A1E3C] uppercase tracking-wide">Lake Mburo Excursions Advice</h5>
            <p className="text-[12px] text-black/65 leading-normal">
              Visiting Mbarara Grand Holiday Hotel makes an ideal safari base camp! Lake Mburo National Park is just 45 minutes away, featuring rich herds of zebras, impalas, leopards, and premium boat safari cruises. Ask Grand Host to plan your itinerary above!
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
