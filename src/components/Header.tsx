import React, { useState } from "react";
import { Phone, MapPin, Clock, Menu, X, Hotel, CalendarDays, Sparkles } from "lucide-react";

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  whatsappNumber: string;
}

export default function Header({ currentTab, setCurrentTab, whatsappNumber }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Rooms & Booking", icon: Hotel },
    { id: "planner", label: "Event Planner", icon: CalendarDays },
    { id: "concierge", label: "AI Concierge", icon: Sparkles },
  ];

  const handleTabClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full">
      {/* Top Banner Bar */}
      <div className="bg-[#07152B] text-white/80 text-[12px] py-2 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 font-medium">
              <Phone className="w-3.5 h-3.5 text-[#C6A15A]" />
              <span>0761 422 899 / 0776 506 052</span>
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C6A15A]" />
              <span>Near Tatitwe, Mbarara City</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-white/40">|</span>
            <span className="hidden md:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C6A15A]" />
              <span>Open 24 Hours</span>
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-4 text-[#C6A15A] font-semibold tracking-wider text-[10px] uppercase">
            <span>Free High Speed Wi-Fi</span>
            <span>•</span>
            <span>Secure Parking</span>
            <span>•</span>
            <span>24/7 Security</span>
            <span>•</span>
            <span>Spa & Massage</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-black/5 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
          
          {/* Logo Brand Block */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleTabClick("home")}>
            <div className="relative w-12 h-12 rounded-xl bg-[#0A1E3C] flex flex-col items-center justify-center shadow-md border border-[#C6A15A]/20">
              <span className="text-[#D4AF37] text-[9px] font-bold tracking-widest leading-none -mt-1">♔</span>
              <span className="font-serif font-extrabold text-white tracking-widest text-[16px]">GH</span>
              <div className="absolute -bottom-1.5 flex gap-[1.5px]">
                <span className="w-1 h-1 bg-[#D4AF37] rounded-full"></span>
                <span className="w-1 h-1 bg-[#D4AF37] rounded-full"></span>
                <span className="w-1 h-1 bg-[#D4AF37] rounded-full"></span>
              </div>
            </div>
            <div className="leading-tight">
              <div className="font-serif font-black text-[13px] tracking-[0.14em] text-[#0A1E3C]">MBARARA GRAND</div>
              <div className="font-serif font-black text-[13px] tracking-[0.14em] text-[#0A1E3C] -mt-1">HOLIDAY HOTEL</div>
              <div className="text-[9px] tracking-[0.24em] text-[#C6A15A] font-bold uppercase">The Perfect Getaway</div>
            </div>
          </div>

          {/* Desktop Tab Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#FFFBF2] p-1.5 rounded-full border border-black/5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-2 h-9 px-4 rounded-full text-[13px] font-semibold tracking-wide transition-all ${
                    isActive
                      ? "bg-[#0A1E3C] text-white shadow-sm"
                      : "text-[#0A1E3C]/70 hover:text-[#0A1E3C] hover:bg-black/5"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#D4AF37]" : "text-[#C6A15A]"}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hello%20Mbarara%20Grand%20Holiday%20Hotel%20%F0%9F%91%8B%20I%20would%20like%20to%20inquire%20about%20room%20availability%20and%20rates.`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 h-10 px-5 rounded-full bg-[#128C7E] text-white text-[13px] font-semibold hover:bg-[#075E54] shadow-sm transition-all"
            >
              <span className="font-serif text-[15px] text-[#D4AF37]">💬</span>
              <span>Book on WhatsApp</span>
            </a>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-[#0A1E3C]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-black/5 bg-white px-4 py-4 space-y-2 animate-fadeIn">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center gap-3 h-12 px-4 rounded-xl text-[14px] font-semibold transition-all ${
                    isActive
                      ? "bg-[#0A1E3C] text-white"
                      : "text-[#0A1E3C]/80 hover:bg-black/5"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#D4AF37]" : "text-[#C6A15A]"}`} />
                  <span className="flex-1 text-left">{item.label}</span>
                </button>
              );
            })}
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hello%20Mbarara%20Grand%20Holiday%20Hotel%20%F0%9F%91%8B%20I%20would%20like%20to%20inquire%20about%20room%20availability%20and%20rates.`}
              target="_blank"
              rel="noreferrer"
              className="w-full flex h-12 items-center justify-center gap-2 rounded-full bg-[#128C7E] text-white text-[14px] font-semibold shadow-md mt-4"
            >
              <span className="font-serif text-[16px] text-[#D4AF37]">💬</span>
              <span>Book instantly via WhatsApp</span>
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
