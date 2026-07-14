import React, { useState, useEffect } from "react";
import { Calendar, Users, Sparkles, AlertCircle, CheckCircle, HelpCircle } from "lucide-react";

interface ServiceItem {
  id: string;
  name: string;
  price: number;
  icon: string;
}

interface PlannerTabProps {
  whatsappNumber: string;
}

export default function PlannerTab({ whatsappNumber }: PlannerTabProps) {
  const [activePlanner, setActivePlanner] = useState<"wedding" | "birthday" | "retreat">("wedding");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // States for Wedding Planner
  const [weddingDate, setWeddingDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [weddingGuests, setWeddingGuests] = useState<number>(150);
  const [weddingBudget, setWeddingBudget] = useState<number>(12000000);
  const [weddingServices, setWeddingServices] = useState<string[]>(["decor", "catering", "venue"]);

  // States for Birthday Planner
  const [birthdayDate, setBirthdayDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [birthdayGuests, setBirthdayGuests] = useState<number>(60);
  const [birthdayBudget, setBirthdayBudget] = useState<number>(3500000);
  const [birthdayServices, setBirthdayServices] = useState<string[]>(["catering", "cake", "venue"]);

  // States for Retreat Planner
  const [retreatDate, setRetreatDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [retreatGuests, setRetreatGuests] = useState<number>(40);
  const [retreatBudget, setRetreatBudget] = useState<number>(7500000);
  const [retreatServices, setRetreatServices] = useState<string[]>(["hall", "meals", "sound"]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Static pricing rules
  const WEDDING_SERVICES: ServiceItem[] = [
    { id: "venue", name: "Grand Garden Venue Hire", price: 1500000, icon: "🌳" },
    { id: "decor", name: "Premium Floral Decor & Lighting", price: 1200000, icon: "✨" },
    { id: "catering", name: "Organic Buffet (Per Guest)", price: 40000, icon: "🍛" },
    { id: "sound", name: "PA System & Dedicated Event DJ", price: 600000, icon: "🔊" },
    { id: "photography", name: "Professional Photography & Video", price: 1000000, icon: "📸" },
    { id: "champagne", name: "Royal Champagne Toast Package", price: 500000, icon: "🍾" },
  ];

  const BIRTHDAY_SERVICES: ServiceItem[] = [
    { id: "venue", name: "Grand Lounge or Poolside Venue", price: 400000, icon: "🏊‍♂️" },
    { id: "decor", name: "Balloon Arch & Colorful Decor", price: 300000, icon: "🎈" },
    { id: "catering", name: "Appetizers & Drinks (Per Guest)", price: 25000, icon: "🍹" },
    { id: "cake", name: "Grand 3-Tier Custom Celebratory Cake", price: 450000, icon: "🎂" },
    { id: "dj", name: "High-Bass Sound System & DJ Set", price: 350000, icon: "🎵" },
  ];

  const RETREAT_SERVICES: ServiceItem[] = [
    { id: "hall", name: "Executive Conference Hall Hire", price: 800000, icon: "🏢" },
    { id: "meals", name: "Full-day Professional Buffet & Teas (Per Guest)", price: 35000, icon: "☕" },
    { id: "sound", name: "Corporate Sound & Smart Projector", price: 400000, icon: "📹" },
    { id: "rooms", name: "Overnight Twin-sharing Rooms (Per Guest)", price: 70000, icon: "🛌" },
    { id: "wifi", name: "Ultra-Fast Dedicated Wi-Fi Connection", price: 200000, icon: "📡" },
  ];

  // Price Calculation helpers
  const calculateTotal = (type: "wedding" | "birthday" | "retreat") => {
    let total = 0;
    if (type === "wedding") {
      WEDDING_SERVICES.forEach((svc) => {
        if (weddingServices.includes(svc.id)) {
          if (svc.id === "catering") {
            total += svc.price * weddingGuests;
          } else {
            total += svc.price;
          }
        }
      });
    } else if (type === "birthday") {
      BIRTHDAY_SERVICES.forEach((svc) => {
        if (birthdayServices.includes(svc.id)) {
          if (svc.id === "catering") {
            total += svc.price * birthdayGuests;
          } else {
            total += svc.price;
          }
        }
      });
    } else {
      RETREAT_SERVICES.forEach((svc) => {
        if (retreatServices.includes(svc.id)) {
          if (svc.id === "catering" || svc.id === "meals" || svc.id === "rooms") {
            total += svc.price * retreatGuests;
          } else {
            total += svc.price;
          }
        }
      });
    }
    return total;
  };

  const handleServiceToggle = (id: string, group: "wedding" | "birthday" | "retreat") => {
    if (group === "wedding") {
      setWeddingServices((prev) => 
        prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
      );
    } else if (group === "birthday") {
      setBirthdayServices((prev) => 
        prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
      );
    } else {
      setRetreatServices((prev) => 
        prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
      );
    }
  };

  const currentTotal = calculateTotal(activePlanner);
  const currentBudget = activePlanner === "wedding" ? weddingBudget : activePlanner === "birthday" ? birthdayBudget : retreatBudget;
  const isBudgetSufficient = currentBudget >= currentTotal;

  const handleRequestQuote = () => {
    let message = "";
    const totalEst = calculateTotal(activePlanner);

    if (activePlanner === "wedding") {
      const activeSvcNames = WEDDING_SERVICES.filter((s) => weddingServices.includes(s.id)).map((s) => s.name);
      message = `Hello Mbarara Grand Holiday Hotel 👋\n\nI would like to request an event quotation:\n\n💍 Event Type: Wedding Party\n📅 Target Date: ${weddingDate}\n👥 Estimated Guests: ${weddingGuests} Guests\n💰 Target Budget: UGX ${weddingBudget.toLocaleString()}\n💸 Estimated Cost: UGX ${totalEst.toLocaleString()}\n\n🛠️ Selected Services Needed:\n${activeSvcNames.map((s) => ` - ${s}`).join("\n")}\n\nCould you please send me available packages and availability?`;
    } else if (activePlanner === "birthday") {
      const activeSvcNames = BIRTHDAY_SERVICES.filter((s) => birthdayServices.includes(s.id)).map((s) => s.name);
      message = `Hello Mbarara Grand Holiday Hotel 👋\n\nI would like to request an event quotation:\n\n🎈 Event Type: Birthday Celebration\n📅 Target Date: ${birthdayDate}\n👥 Estimated Guests: ${birthdayGuests} Guests\n💰 Target Budget: UGX ${birthdayBudget.toLocaleString()}\n💸 Estimated Cost: UGX ${totalEst.toLocaleString()}\n\n🛠️ Selected Services Needed:\n${activeSvcNames.map((s) => ` - ${s}`).join("\n")}\n\nCould you please send me packages?`;
    } else {
      const activeSvcNames = RETREAT_SERVICES.filter((s) => retreatServices.includes(s.id)).map((s) => s.name);
      message = `Hello Mbarara Grand Holiday Hotel 👋\n\nI would like to request an event quotation:\n\n🏢 Event Type: Corporate Retreat / Conference\n📅 Target Date: ${retreatDate}\n👥 Estimated Guests: ${retreatGuests} Guests\n💰 Target Budget: UGX ${retreatBudget.toLocaleString()}\n💸 Estimated Cost: UGX ${totalEst.toLocaleString()}\n\n🛠️ Selected Services Needed:\n${activeSvcNames.map((s) => ` - ${s}`).join("\n")}\n\nCould you please share package details?`;
    }

    triggerToast("Opening WhatsApp Quote Planner...");
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="bg-[#FFFBF2] text-[#0A1E3C] pb-16 pt-10">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0A1E3C] text-white px-5 py-3 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2 border border-[#C6A15A]/40">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Page Head */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <div className="text-[11px] tracking-[0.2em] uppercase font-bold text-[#C6A15A]">Uganda's Premier Celebrations Venue</div>
          <h2 className="font-serif text-[34px] sm:text-[44px] font-extrabold leading-tight">
            Grand Event & Venue Planner
          </h2>
          <p className="text-[13.5px] text-black/55">
            Plan your weddings, birthdays, or company retreats with ease. Toggle your guest count and required services below to get an instant budget estimate.
          </p>
        </div>

        {/* Tab switcher buttons for planner categories */}
        <div className="flex items-center justify-center gap-2 max-w-md mx-auto bg-white p-1 rounded-full border border-black/5 shadow-sm mb-12">
          <button
            onClick={() => setActivePlanner("wedding")}
            className={`flex-1 h-10 rounded-full text-xs font-bold tracking-wide transition-all ${
              activePlanner === "wedding"
                ? "bg-[#0A1E3C] text-white shadow-sm"
                : "text-[#0A1E3C]/70 hover:bg-black/5"
            }`}
          >
            💍 Wedding Party
          </button>
          <button
            onClick={() => setActivePlanner("birthday")}
            className={`flex-1 h-10 rounded-full text-xs font-bold tracking-wide transition-all ${
              activePlanner === "birthday"
                ? "bg-[#0A1E3C] text-white shadow-sm"
                : "text-[#0A1E3C]/70 hover:bg-black/5"
            }`}
          >
            🎈 Birthday Bash
          </button>
          <button
            onClick={() => setActivePlanner("retreat")}
            className={`flex-1 h-10 rounded-full text-xs font-bold tracking-wide transition-all ${
              activePlanner === "retreat"
                ? "bg-[#0A1E3C] text-white shadow-sm"
                : "text-[#0A1E3C]/70 hover:bg-black/5"
            }`}
          >
            🏢 Corporate retreat
          </button>
        </div>

        {/* Main interactive calculator layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-black/5 shadow-sm p-6 sm:p-8 space-y-6">
            
            {/* Header description of active planner */}
            <div>
              <h3 className="font-serif text-[22px] font-bold text-[#0A1E3C]">
                {activePlanner === "wedding" && "Plan Your Dream Garden Wedding"}
                {activePlanner === "birthday" && "Plan Your Custom Poolside Birthday Celebration"}
                {activePlanner === "retreat" && "Plan Your Corporate Retreat / Seminar"}
              </h3>
              <p className="text-[12.5px] text-black/50 mt-1">
                Customize key event configurations. All packages include secure compound parking and dedicated reception coordination assistance.
              </p>
            </div>

            {/* Date Picker Input Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold tracking-widest uppercase text-black/55 mb-1.5">Target Event Date</label>
                <div className="relative h-11 rounded-xl border border-black/10 bg-white flex items-center px-3">
                  <Calendar className="w-3.5 h-3.5 text-[#C6A15A] mr-2 shrink-0" />
                  <input 
                    type="date" 
                    value={activePlanner === "wedding" ? weddingDate : activePlanner === "birthday" ? birthdayDate : retreatDate}
                    onChange={(e) => {
                      if (activePlanner === "wedding") setWeddingDate(e.target.value);
                      else if (activePlanner === "birthday") setBirthdayDate(e.target.value);
                      else setRetreatDate(e.target.value);
                    }}
                    className="bg-transparent text-[13px] font-semibold outline-none w-full text-black/85" 
                  />
                </div>
              </div>

              {/* Custom Guest Size Selector with slide range */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-[11px] font-bold tracking-widest uppercase text-black/55">Target Guest Size</label>
                  <span className="text-[12.5px] font-extrabold text-[#C6A15A]">
                    {activePlanner === "wedding" && `${weddingGuests} Guests`}
                    {activePlanner === "birthday" && `${birthdayGuests} Guests`}
                    {activePlanner === "retreat" && `${retreatGuests} Guests`}
                  </span>
                </div>
                <div className="relative h-11 rounded-xl border border-black/10 bg-[#FFFBF2]/40 flex items-center px-3.5">
                  <Users className="w-3.5 h-3.5 text-[#C6A15A] mr-3 shrink-0" />
                  <input 
                    type="range" 
                    min="10" 
                    max={activePlanner === "wedding" ? "300" : activePlanner === "birthday" ? "150" : "200"}
                    value={activePlanner === "wedding" ? weddingGuests : activePlanner === "birthday" ? birthdayGuests : retreatGuests}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (activePlanner === "wedding") setWeddingGuests(val);
                      else if (activePlanner === "birthday") setBirthdayGuests(val);
                      else setRetreatGuests(val);
                    }}
                    className="w-full h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer accent-[#0A1E3C]"
                  />
                </div>
              </div>
            </div>

            {/* Target Budget setup */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-[11px] font-bold tracking-widest uppercase text-black/55">Target Budget Limit (UGX)</label>
                <span className="text-[12px] font-bold text-black/40">Enter your goal</span>
              </div>
              <div className="relative h-11 rounded-xl border border-black/10 bg-white flex items-center px-3.5">
                <span className="text-black/40 text-xs font-bold mr-2 shrink-0">UGX</span>
                <input 
                  type="number"
                  step="500000"
                  value={activePlanner === "wedding" ? weddingBudget : activePlanner === "birthday" ? birthdayBudget : retreatBudget}
                  onChange={(e) => {
                    const val = Math.max(0, parseInt(e.target.value) || 0);
                    if (activePlanner === "wedding") setWeddingBudget(val);
                    else if (activePlanner === "birthday") setBirthdayBudget(val);
                    else setRetreatBudget(val);
                  }}
                  className="bg-transparent text-[13px] font-bold outline-none w-full text-black/85" 
                />
              </div>
            </div>

            {/* Custom Interactive services toggler check list */}
            <div className="space-y-3.5">
              <label className="block text-[11px] font-bold tracking-widest uppercase text-black/55 mb-2">Required Services Packages</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activePlanner === "wedding" && WEDDING_SERVICES.map((svc) => {
                  const isChecked = weddingServices.includes(svc.id);
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => handleServiceToggle(svc.id, "wedding")}
                      className={`flex items-center text-left gap-3 p-3.5 rounded-2xl border transition-all ${
                        isChecked
                          ? "bg-[#0A1E3C]/5 border-[#0A1E3C] shadow-sm"
                          : "bg-white border-black/10 hover:border-black/25"
                      }`}
                    >
                      <span className="text-xl shrink-0">{svc.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12.5px] font-bold truncate text-[#0A1E3C]">{svc.name}</div>
                        <div className="text-[11px] text-black/45">
                          {svc.id === "catering" ? `UGX ${svc.price.toLocaleString()} / guest` : `UGX ${svc.price.toLocaleString()}`}
                        </div>
                      </div>
                      <span className={`w-4 h-4 rounded-full border shrink-0 flex items-center justify-center text-[10px] ${
                        isChecked ? "bg-[#0A1E3C] border-[#0A1E3C] text-white" : "border-black/25 bg-white"
                      }`}>
                        {isChecked ? "✓" : ""}
                      </span>
                    </button>
                  );
                })}

                {activePlanner === "birthday" && BIRTHDAY_SERVICES.map((svc) => {
                  const isChecked = birthdayServices.includes(svc.id);
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => handleServiceToggle(svc.id, "birthday")}
                      className={`flex items-center text-left gap-3 p-3.5 rounded-2xl border transition-all ${
                        isChecked
                          ? "bg-[#0A1E3C]/5 border-[#0A1E3C] shadow-sm"
                          : "bg-white border-black/10 hover:border-black/25"
                      }`}
                    >
                      <span className="text-xl shrink-0">{svc.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12.5px] font-bold truncate text-[#0A1E3C]">{svc.name}</div>
                        <div className="text-[11px] text-black/45">
                          {svc.id === "catering" ? `UGX ${svc.price.toLocaleString()} / guest` : `UGX ${svc.price.toLocaleString()}`}
                        </div>
                      </div>
                      <span className={`w-4 h-4 rounded-full border shrink-0 flex items-center justify-center text-[10px] ${
                        isChecked ? "bg-[#0A1E3C] border-[#0A1E3C] text-white" : "border-black/25 bg-white"
                      }`}>
                        {isChecked ? "✓" : ""}
                      </span>
                    </button>
                  );
                })}

                {activePlanner === "retreat" && RETREAT_SERVICES.map((svc) => {
                  const isChecked = retreatServices.includes(svc.id);
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => handleServiceToggle(svc.id, "retreat")}
                      className={`flex items-center text-left gap-3 p-3.5 rounded-2xl border transition-all ${
                        isChecked
                          ? "bg-[#0A1E3C]/5 border-[#0A1E3C] shadow-sm"
                          : "bg-white border-black/10 hover:border-black/25"
                      }`}
                    >
                      <span className="text-xl shrink-0">{svc.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12.5px] font-bold truncate text-[#0A1E3C]">{svc.name}</div>
                        <div className="text-[11px] text-black/45">
                          {["catering", "meals", "rooms"].includes(svc.id) ? `UGX ${svc.price.toLocaleString()} / guest` : `UGX ${svc.price.toLocaleString()}`}
                        </div>
                      </div>
                      <span className={`w-4 h-4 rounded-full border shrink-0 flex items-center justify-center text-[10px] ${
                        isChecked ? "bg-[#0A1E3C] border-[#0A1E3C] text-white" : "border-black/25 bg-white"
                      }`}>
                        {isChecked ? "✓" : ""}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Quotation Estimate Summary Panel (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#0A1E3C] text-white rounded-[28px] shadow-[0_24px_50px_rgba(7,21,43,0.18)] border border-white/10 overflow-hidden">
              <div className="p-6 sm:p-7 space-y-5">
                
                {/* Visual Header */}
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#D4AF37]">Budget Analysis</span>
                  <h4 className="font-serif text-[18px] font-bold">Quotation Estimate</h4>
                  <div className="text-[11px] text-white/50 mt-1">Estimations calculated using base resort tariffs</div>
                </div>

                {/* Main Estimated Cost readout */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center items-center text-center space-y-1">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">Estimated Total Cost</span>
                  <span className="font-serif text-[28px] sm:text-[32px] font-black text-[#D4AF37]">
                    UGX {currentTotal.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-white/60">
                    {activePlanner === "wedding" && `Based on ${weddingGuests} guests`}
                    {activePlanner === "birthday" && `Based on ${birthdayGuests} guests`}
                    {activePlanner === "retreat" && `Based on ${retreatGuests} guests`}
                  </span>
                </div>

                {/* Budget Comparison indicator */}
                <div className={`p-4 rounded-2xl border flex items-start gap-3 text-[12.5px] ${
                  isBudgetSufficient 
                    ? "bg-[#128C7E]/10 border-[#128C7E]/30 text-white" 
                    : "bg-red-500/10 border-red-500/30 text-red-100"
                }`}>
                  {isBudgetSufficient ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-[#128C7E] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold">Budget is Sufficient!</div>
                        <div className="text-[11.5px] opacity-75">Your target budget of UGX {currentBudget.toLocaleString()} easily covers this estimation. You are ready to book!</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold">Over Target Budget Plan</div>
                        <div className="text-[11.5px] opacity-75">Your target budget of UGX {currentBudget.toLocaleString()} is short of the estimation by UGX {(currentTotal - currentBudget).toLocaleString()}. Consider adjusting guests or services.</div>
                      </div>
                    </>
                  )}
                </div>

                {/* Selected Services Cost Breakdown */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold tracking-wider uppercase text-white/40">Detailed Breakdown</div>
                  <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                    {activePlanner === "wedding" && WEDDING_SERVICES.filter(s => weddingServices.includes(s.id)).map(svc => (
                      <div key={svc.id} className="flex justify-between items-center text-[12px] text-white/70">
                        <span>{svc.icon} {svc.name}</span>
                        <span className="font-bold text-white">
                          {svc.id === "catering" ? `UGX ${(svc.price * weddingGuests).toLocaleString()}` : `UGX ${svc.price.toLocaleString()}`}
                        </span>
                      </div>
                    ))}
                    {activePlanner === "birthday" && BIRTHDAY_SERVICES.filter(s => birthdayServices.includes(s.id)).map(svc => (
                      <div key={svc.id} className="flex justify-between items-center text-[12px] text-white/70">
                        <span>{svc.icon} {svc.name}</span>
                        <span className="font-bold text-white">
                          {svc.id === "catering" ? `UGX ${(svc.price * birthdayGuests).toLocaleString()}` : `UGX ${svc.price.toLocaleString()}`}
                        </span>
                      </div>
                    ))}
                    {activePlanner === "retreat" && RETREAT_SERVICES.filter(s => retreatServices.includes(s.id)).map(svc => (
                      <div key={svc.id} className="flex justify-between items-center text-[12px] text-white/70">
                        <span>{svc.icon} {svc.name}</span>
                        <span className="font-bold text-white">
                          {["catering", "meals", "rooms"].includes(svc.id) ? `UGX ${(svc.price * retreatGuests).toLocaleString()}` : `UGX ${svc.price.toLocaleString()}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* WhatsApp Call To Action */}
                <button
                  type="button"
                  onClick={handleRequestQuote}
                  className="w-full h-12 rounded-xl bg-[#128C7E] text-white font-bold text-[13.5px] hover:bg-[#075E54] flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <span>💬 Request WhatsApp Quote</span>
                </button>

                <div className="text-center text-[10.5px] text-white/40 leading-relaxed">
                  Our event coordinator will contact you back with a detailed official invoice on letterhead.
                </div>

              </div>
              <div className="h-1.5 bg-gradient-to-r from-[#D4AF37] via-[#C6A15A] to-[#E9D39A]"></div>
            </div>

            {/* Event Coordination Guarantee Card */}
            <div className="bg-[#FFF] rounded-[24px] border border-black/5 p-5 space-y-3.5">
              <h5 className="text-[13px] font-extrabold uppercase tracking-wide text-[#0A1E3C] flex items-center gap-2">
                <span>🌟</span>
                <span>The Grand Venue Advantage</span>
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11.5px] text-black/60 leading-normal">
                <div className="space-y-1">
                  <div className="font-bold text-[#0A1E3C]">Professional Catering</div>
                  <div>Certified chefs specializing in multi-tier custom baking and local buffet catering.</div>
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-[#0A1E3C]">Decor & Lighting</div>
                  <div>Lush fairy-lighting arrangements and majestic garden flower arches.</div>
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-[#0A1E3C]">High-Bass Sound PA</div>
                  <div>Dedicated audio technicians and DJs to keep your guests thoroughly entertained.</div>
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-[#0A1E3C]">Secure Accommodation</div>
                  <div>Comfortable overnight suites available at special bulk group discount rates.</div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
