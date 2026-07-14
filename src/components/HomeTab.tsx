import React, { useState } from "react";
import { Room, GuestCount } from "../types";
import { ROOMS } from "../data";
import { 
  Calendar, Users, Check, Search, ArrowRight, MapPin, 
  Sparkles, Star, Coffee, Tv, Shield, Plus, Minus, Info, 
  ChevronRight, Smile, Map
} from "lucide-react";

interface HomeTabProps {
  onBookRoom: (room: Room) => void;
  checkInDate: string;
  setCheckInDate: (date: string) => void;
  checkOutDate: string;
  setCheckOutDate: (date: string) => void;
  guestCount: GuestCount;
  setGuestCount: (count: GuestCount) => void;
  whatsappNumber: string;
}

export default function HomeTab({
  onBookRoom,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  guestCount,
  setGuestCount,
  whatsappNumber,
}: HomeTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Popular");
  const [showGuestPicker, setShowGuestPicker] = useState<boolean>(false);
  const [quickRoomType, setQuickRoomType] = useState<string>("Any Type");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categories = ["Popular", "Standard", "Deluxe", "Executive", "Family"];

  // Display toast notification
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const incrementGuest = (type: keyof GuestCount) => {
    const updated = { ...guestCount };
    if (updated[type] < 10) {
      updated[type] += 1;
      setGuestCount(updated);
    }
  };

  const decrementGuest = (type: keyof GuestCount) => {
    const updated = { ...guestCount };
    const minVal = type === "adults" ? 1 : 0;
    if (updated[type] > minVal) {
      updated[type] -= 1;
      setGuestCount(updated);
    }
  };

  const totalGuests = guestCount.adults + guestCount.children;

  const getGuestSummaryString = () => {
    let summary = `${totalGuests} Guest${totalGuests > 1 ? "s" : ""}`;
    if (guestCount.infants > 0) {
      summary += `, ${guestCount.infants} Infant${guestCount.infants > 1 ? "s" : ""}`;
    }
    if (guestCount.pets > 0) {
      summary += `, ${guestCount.pets} Pet${guestCount.pets > 1 ? "s" : ""}`;
    }
    return summary;
  };

  // Filter rooms based on selection
  const filteredRooms = ROOMS.filter((room) => {
    if (selectedCategory === "Popular") return true; // Show all under Popular
    return room.tag === selectedCategory;
  });

  const handleCheckAvailability = () => {
    if (!checkInDate || !checkOutDate) {
      triggerToast("Please choose your dates");
      return;
    }

    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);

    if (end <= start) {
      triggerToast("Check-out must be after check-in date.");
      return;
    }

    const message = `Hello Mbarara Grand Holiday Hotel 👋\n\nI would like to check availability and rates for a stay:\n\n📅 Check-In: ${checkInDate}\n📅 Check-Out: ${checkOutDate}\n👥 Guests: ${guestCount.adults} Adults, ${guestCount.children} Children, ${guestCount.infants} Infants, ${guestCount.pets} Pets\n\nCould you please recommend available rooms?`;
    triggerToast("Opening WhatsApp booking...");
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickRoomType !== "Any Type") {
      setSelectedCategory(quickRoomType);
    } else {
      setSelectedCategory("Popular");
    }
    triggerToast(`Searching available ${quickRoomType} rooms...`);
    const element = document.getElementById("available-rooms-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#FFFBF2] text-[#0A1E3C] pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0A1E3C] text-white px-5 py-3 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2 border border-[#C6A15A]/40 animate-bounce">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#07152B] text-white">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600" 
            alt="Mbarara Grand Holiday Hotel Exterior" 
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07152B] via-[#07152B]/85 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFFBF2] via-transparent to-transparent opacity-10"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content Left (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[11px] font-bold tracking-widest uppercase">
              <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-ping"></span>
              <span>Near Tatitwe • Mbarara City</span>
              <span className="ml-1 text-[#D4AF37]">4.9 ★</span>
            </div>
            
            <h1 className="font-serif text-[40px] sm:text-[52px] lg:text-[60px] font-black leading-[1.05] tracking-tight">
              The Perfect<br />Getaway in<br />
              <span className="text-[#D4AF37] relative inline-block">
                Mbarara City
                <span className="absolute left-0 bottom-1 w-full h-[3px] bg-gradient-to-r from-[#D4AF37] to-transparent"></span>
              </span>
            </h1>

            <p className="text-[14.5px] sm:text-[16px] text-white/80 leading-relaxed max-w-lg">
              Indulge in unmatched luxury, premium modern suites, therapeutic massage lounges, exquisite menus, and elegant event gardens in the heart of Mbarara, Western Uganda.
            </p>

            {/* Quick Stats Banner */}
            <div className="pt-4 flex flex-wrap gap-4 text-[13px]">
              <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="text-xl">🏆</span>
                <div>
                  <div className="font-bold">4.9 / 5 Rating</div>
                  <div className="text-[10px] text-white/50">Based on 320+ reviews</div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="text-xl">🏨</span>
                <div>
                  <div className="font-bold">120+ Rooms</div>
                  <div className="text-[10px] text-white/50">Premium suites</div>
                </div>
              </div>
            </div>
          </div>

          {/* Availability Booking Form Right (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white rounded-[28px] shadow-[0_24px_64px_rgba(7,21,43,0.3)] border border-white/60 text-[#0a1e3c] overflow-hidden">
              <div className="p-6 sm:p-7 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-black/5">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#C6A15A]">Instant direct booking</span>
                    <h3 className="font-serif text-[20px] font-bold mt-0.5">Check Stay Availability</h3>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-[#FFFBF2] border border-[#E9DFC7] flex items-center justify-center text-[#C6A15A] text-sm">✦</span>
                </div>

                {/* Location Display */}
                <div>
                  <label className="block text-[11px] font-bold tracking-widest uppercase text-black/55 mb-1.5">Destination Location</label>
                  <div className="h-11 rounded-xl border border-black/10 bg-[#FFFBF2]/50 flex items-center px-3.5 gap-2.5">
                    <MapPin className="w-4 h-4 text-[#C6A15A]" />
                    <span className="text-[13px] font-semibold text-black/85">Mbarara Grand Holiday Hotel, Uganda</span>
                  </div>
                </div>

                {/* Check In / Out Fields */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold tracking-widest uppercase text-black/55 mb-1.5">Check In</label>
                    <div className="relative h-11 rounded-xl border border-black/10 bg-white flex items-center px-3">
                      <Calendar className="w-3.5 h-3.5 text-[#C6A15A] mr-2 shrink-0" />
                      <input 
                        type="date" 
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="bg-transparent text-[12.5px] font-medium outline-none w-full text-black/85" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold tracking-widest uppercase text-black/55 mb-1.5">Check Out</label>
                    <div className="relative h-11 rounded-xl border border-black/10 bg-white flex items-center px-3">
                      <Calendar className="w-3.5 h-3.5 text-[#C6A15A] mr-2 shrink-0" />
                      <input 
                        type="date" 
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className="bg-transparent text-[12.5px] font-medium outline-none w-full text-black/85" 
                      />
                    </div>
                  </div>
                </div>

                {/* Guest Selector Dropdown Form */}
                <div className="relative">
                  <label className="block text-[11px] font-bold tracking-widest uppercase text-black/55 mb-1.5">Total Guests & Occupancy</label>
                  <button 
                    type="button"
                    onClick={() => setShowGuestPicker(!showGuestPicker)}
                    className="w-full h-11 rounded-xl border border-black/10 bg-white px-3.5 flex items-center justify-between text-[13px] font-semibold text-black/85 shadow-sm hover:border-black/25"
                  >
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#C6A15A]" />
                      <span>{getGuestSummaryString()}</span>
                    </span>
                    <span className="text-black/30 text-xs">▼</span>
                  </button>

                  {/* Guest Dropdown Modal Block */}
                  {showGuestPicker && (
                    <div className="absolute z-20 left-0 right-0 mt-2 bg-white rounded-2xl border border-black/5 shadow-2xl p-4 space-y-3.5 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[13px] font-bold">Adults</div>
                          <div className="text-[10px] text-black/45">Age 13 years or older</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button 
                            type="button"
                            onClick={() => decrementGuest("adults")}
                            className="w-7 h-7 rounded-full border border-black/10 flex items-center justify-center text-sm font-bold hover:bg-black/5"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-bold w-4 text-center">{guestCount.adults}</span>
                          <button 
                            type="button"
                            onClick={() => incrementGuest("adults")}
                            className="w-7 h-7 rounded-full bg-[#0A1E3C] text-white flex items-center justify-center text-sm font-bold"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[13px] font-bold">Children</div>
                          <div className="text-[10px] text-black/45">Ages 2 to 12 years</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button 
                            type="button"
                            onClick={() => decrementGuest("children")}
                            className="w-7 h-7 rounded-full border border-black/10 flex items-center justify-center text-sm font-bold hover:bg-black/5"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-bold w-4 text-center">{guestCount.children}</span>
                          <button 
                            type="button"
                            onClick={() => incrementGuest("children")}
                            className="w-7 h-7 rounded-full bg-[#0A1E3C] text-white flex items-center justify-center text-sm font-bold"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[13px] font-bold">Infants</div>
                          <div className="text-[10px] text-black/45">Under 2 years old</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button 
                            type="button"
                            onClick={() => decrementGuest("infants")}
                            className="w-7 h-7 rounded-full border border-black/10 flex items-center justify-center text-sm font-bold hover:bg-black/5"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-bold w-4 text-center">{guestCount.infants}</span>
                          <button 
                            type="button"
                            onClick={() => incrementGuest("infants")}
                            className="w-7 h-7 rounded-full bg-[#0A1E3C] text-white flex items-center justify-center text-sm font-bold"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-black/5 pt-3">
                        <div>
                          <div className="text-[13px] font-bold">Pets</div>
                          <div className="text-[10px] text-black/45">Service dogs / cats</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button 
                            type="button"
                            onClick={() => decrementGuest("pets")}
                            className="w-7 h-7 rounded-full border border-black/10 flex items-center justify-center text-sm font-bold hover:bg-black/5"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-bold w-4 text-center">{guestCount.pets}</span>
                          <button 
                            type="button"
                            onClick={() => incrementGuest("pets")}
                            className="w-7 h-7 rounded-full bg-[#0A1E3C] text-white flex items-center justify-center text-sm font-bold"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <button 
                        type="button"
                        onClick={() => setShowGuestPicker(false)}
                        className="w-full h-10 mt-2 rounded-xl bg-[#FFFBF2] border border-[#E9DFC7] text-[#C6A15A] text-[12px] font-bold hover:bg-[#C6A15A]/10 transition-all"
                      >
                        Apply Occupancy
                      </button>
                    </div>
                  )}
                </div>

                {/* Availability Call To Action */}
                <button 
                  onClick={handleCheckAvailability}
                  className="w-full h-12 rounded-xl bg-[#0A1E3C] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#07152B] shadow-md transition-all group"
                >
                  <span>Check Availability on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-all" />
                </button>
                
                <div className="text-center text-[11px] text-black/45">
                  ✦ Pre-filled chat inquiry • Instant response 24/7
                </div>
              </div>
              <div className="h-1.5 bg-gradient-to-r from-[#D4AF37] via-[#C6A15A] to-[#E9D39A]"></div>
            </div>
          </div>

        </div>
      </section>

      {/* Horizontal Search Filter Bar (Quick Finder) */}
      <section className="relative z-10 -mt-8 max-w-5xl mx-auto px-4">
        <form onSubmit={handleQuickSearch} className="bg-white rounded-3xl sm:rounded-full border border-black/5 shadow-lg p-3 sm:p-2.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Check In search display */}
            <div className="flex items-center gap-2.5 px-4 h-12 rounded-2xl bg-[#FFFBF2]/80 border border-[#E9DFC7]/60">
              <span className="text-sm">📅</span>
              <div>
                <span className="block text-[9px] tracking-widest uppercase font-bold text-black/40">Check-in Stay</span>
                <span className="text-[12.5px] font-semibold text-black/85">{checkInDate || "Choose date"}</span>
              </div>
            </div>

            {/* Check Out search display */}
            <div className="flex items-center gap-2.5 px-4 h-12 rounded-2xl bg-[#FFFBF2]/80 border border-[#E9DFC7]/60">
              <span className="text-sm">📅</span>
              <div>
                <span className="block text-[9px] tracking-widest uppercase font-bold text-black/40">Check-out Stay</span>
                <span className="text-[12.5px] font-semibold text-black/85">{checkOutDate || "Choose date"}</span>
              </div>
            </div>

            {/* Room Type Selector */}
            <div className="flex items-center gap-2.5 px-4 h-12 rounded-2xl bg-[#FFFBF2]/80 border border-[#E9DFC7]/60">
              <span className="text-sm">🏨</span>
              <div className="flex-1">
                <span className="block text-[9px] tracking-widest uppercase font-bold text-black/40">Room Type</span>
                <select 
                  value={quickRoomType} 
                  onChange={(e) => setQuickRoomType(e.target.value)}
                  className="bg-transparent outline-none text-[12.5px] font-bold w-full text-black/85"
                >
                  <option value="Any Type">Any Luxury Type</option>
                  <option value="Standard">Standard Comfort</option>
                  <option value="Deluxe">Deluxe Executive</option>
                  <option value="Executive">Grand Executive</option>
                  <option value="Family">Grand Family</option>
                </select>
              </div>
            </div>

          </div>

          <button 
            type="submit" 
            className="h-12 px-6 rounded-2xl sm:rounded-full bg-[#0A1E3C] text-white font-bold hover:bg-[#07152B] flex items-center justify-center gap-2 text-[13.5px]"
          >
            <Search className="w-4 h-4 text-[#D4AF37]" />
            <span>Search</span>
          </button>
        </form>
      </section>

      {/* Available Rooms Section */}
      <section id="available-rooms-section" className="pt-16 sm:pt-24 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-5 pb-8 border-b border-black/5">
          <div className="space-y-2">
            <div className="text-[11px] tracking-[0.2em] uppercase font-bold text-[#C6A15A]">Luxury Accommodation Collection</div>
            <h2 className="font-serif text-[32px] sm:text-[38px] font-extrabold text-[#0A1E3C] leading-none">
              Find Your Premium Stay
            </h2>
            <p className="text-[13px] text-black/55 max-w-md">
              Handcrafted designer suites representing classic Ugandan hospitality. Every booking includes complimentary organic buffet breakfasts, fast Wi-Fi, swimming pool entrance, and private parking.
            </p>
          </div>

          {/* Room Categories Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  triggerToast(`${cat} suite listings`);
                }}
                className={`h-9 px-4 rounded-full text-xs font-bold tracking-wide transition-all shrink-0 border ${
                  selectedCategory === cat
                    ? "bg-[#0A1E3C] text-white border-[#0A1E3C] shadow-sm"
                    : "bg-white text-[#0A1E3C]/70 border-black/10 hover:border-black/30 hover:text-[#0A1E3C]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Rooms Cards Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredRooms.map((room) => (
            <div 
              key={room.id}
              className="group bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Card Image Cover */}
              <div className="relative h-[210px] overflow-hidden bg-black/10">
                <img 
                  src={room.img} 
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
                />
                
                {/* Rating Badge */}
                <div className="absolute top-3.5 left-3.5 px-2.5 h-6 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-[#0A1E3C] flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                  <span>4.9</span>
                </div>

                {/* Suite Tag Badge */}
                <div className="absolute top-3.5 right-3.5 px-2.5 h-6 rounded-full bg-[#0A1E3C]/90 text-white text-[10px] font-bold tracking-wider uppercase flex items-center border border-white/20">
                  {room.tag}
                </div>

                {/* Facilities Quick View Bar Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/60 to-transparent pt-10 flex flex-wrap gap-1">
                  {room.facilities.slice(0, 3).map((fac, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-0.5 rounded bg-white/15 backdrop-blur-sm text-[9px] font-medium text-white border border-white/10"
                    >
                      {fac}
                    </span>
                  ))}
                  {room.facilities.length > 3 && (
                    <span className="px-2 py-0.5 rounded bg-white/10 backdrop-blur-sm text-[9px] font-medium text-white/80">
                      +{room.facilities.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Specifications Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <h3 className="font-serif text-[17px] font-bold text-[#0A1E3C] leading-snug group-hover:text-[#C6A15A] transition-colors">
                    {room.name}
                  </h3>
                  
                  {/* Metadata Specs line */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11.5px] text-black/50">
                    <span>👥 {room.guests} Guests</span>
                    <span className="w-1 h-1 bg-black/15 rounded-full"></span>
                    <span>🛏️ {room.beds} Bed{room.beds > 1 ? "s" : ""}</span>
                    <span className="w-1 h-1 bg-black/15 rounded-full"></span>
                    <span>📐 {room.size}</span>
                  </div>
                </div>

                {/* Price and Action Button footer */}
                <div className="flex items-end justify-between pt-2 border-t border-black/5">
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest font-bold text-black/35">Per Night Stay</span>
                    <span className="font-serif text-[17px] font-extrabold text-[#0A1E3C]">
                      UGX {room.price.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => onBookRoom(room)}
                    className="h-9 px-4 rounded-full bg-[#0A1E3C] text-white text-[12.5px] font-bold hover:bg-[#C6A15A] transition-all"
                  >
                    Book Now
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* Spa & Amenities Spotlight Callout Banner */}
      <section className="pt-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-[32px] bg-[#0A1E3C] text-white p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          
          {/* Subtle gold visual backdrop blur */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#D4AF37]/15 blur-[60px] pointer-events-none"></div>
          <div className="absolute -left-10 -bottom-10 w-60 h-60 rounded-full bg-[#C6A15A]/10 blur-[50px] pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Description Text block (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="text-[11px] tracking-[0.2em] uppercase font-bold text-[#D4AF37]">The Grand Resort Experience</div>
              <h2 className="font-serif text-[28px] sm:text-[36px] font-bold leading-tight">
                Premium services tailored for your ultimate relaxation
              </h2>
              <p className="text-[13.5px] text-white/70 leading-relaxed">
                Enjoy world-class amenities within the hotel compound. Pamper your senses at our modern therapeutic spa, or savor organic Ugandan specialties cooked by award-winning chefs.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15">✔ Organic Buffet Breakfast Included</span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15">✔ 24/7 Security Patrols</span>
              </div>
            </div>

            {/* Service Blocks Grid (7 cols) */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2 backdrop-blur-sm">
                <span className="text-2xl">💆‍♀️</span>
                <div className="font-bold text-[14px]">Spa & Massages</div>
                <div className="text-[11.5px] text-white/50 leading-normal">Unwind with Swedish, deep-tissue and local aromatherapies.</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2 backdrop-blur-sm">
                <span className="text-2xl">🍽️</span>
                <div className="font-bold text-[14px]">Fine Dining</div>
                <div className="text-[11.5px] text-white/50 leading-normal">Gourmet restaurant serving local and continental delicacies.</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2 backdrop-blur-sm">
                <span className="text-2xl">🏊‍♂️</span>
                <div className="font-bold text-[14px]">Swimming Pool</div>
                <div className="text-[11.5px] text-white/50 leading-normal">Sparkling Olympic-sized clean pool with sun loungers.</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2 backdrop-blur-sm">
                <span className="text-2xl">📶</span>
                <div className="font-bold text-[14px]">Free Ultra Wi-Fi</div>
                <div className="text-[11.5px] text-white/50 leading-normal">High-speed fiber connectivity in every suite and garden.</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2 backdrop-blur-sm">
                <span className="text-2xl">🅿️</span>
                <div className="font-bold text-[14px]">Secure Parking</div>
                <div className="text-[11.5px] text-white/50 leading-normal">Spacious parking space protected by CCTV and round-the-clock guards.</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2 backdrop-blur-sm">
                <span className="text-2xl">🌿</span>
                <div className="font-bold text-[14px]">Scenic Gardens</div>
                <div className="text-[11.5px] text-white/50 leading-normal">Lush manicured fields perfect for wedding parties and quiet walks.</div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Testimonials and Map Section */}
      <section className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Testimonial Card (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-black/5 p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="text-[#D4AF37] text-xl font-bold">★★★★★</div>
            <p className="font-serif text-[18px] sm:text-[20px] text-[#0A1E3C] font-medium leading-relaxed italic">
              "We had a marvelous weekend at Mbarara Grand Holiday Hotel. The suites are spacious and sparkling clean, and the wedding reception setup in the garden was absolutely magical. The customer service was exceptionally helpful and proactive. Five stars!"
            </p>
          </div>
          <div className="flex items-center gap-3 mt-6 border-t border-black/5 pt-4">
            <div className="w-10 h-10 rounded-full bg-[#C6A15A]/20 flex items-center justify-center font-bold text-[#0A1E3C]">
              AM
            </div>
            <div>
              <div className="text-[13px] font-bold text-[#0A1E3C]">Aisha Mutoni</div>
              <div className="text-[11px] text-black/45">Kampala, Uganda (Retreat Guest)</div>
            </div>
          </div>
        </div>

        {/* Local Map Landing Info (5 cols) */}
        <div className="lg:col-span-5 bg-[#0A1E3C] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-48 h-48 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
          
          <div className="space-y-3">
            <div className="text-[11px] tracking-widest uppercase font-bold text-[#D4AF37]">Location Finder</div>
            <h3 className="font-serif text-[22px] font-bold">Easy Access Mbarara</h3>
            <p className="text-[13px] text-white/70 leading-relaxed">
              Located beautifully Near Tatitwe, Mbarara City. Extremely convenient for travellers headed to Queen Elizabeth or Lake Mburo parks, with secure automated perimeter lighting.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <a 
              href="https://maps.google.com/?q=Mbarara+Grand+Hotel+Near+Tatitwe" 
              target="_blank" 
              rel="noreferrer"
              className="h-10 px-5 rounded-full bg-white text-[#0A1E3C] font-bold text-[12.5px] flex items-center gap-1.5 shadow-sm hover:bg-[#FFFBF2]"
            >
              <Map className="w-3.5 h-3.5 text-[#C6A15A]" />
              <span>Open in Google Maps</span>
            </a>
            <a 
              href={`https://wa.me/${whatsappNumber}?text=Please%20send%20me%20your%20exact%20hotel%20GPS%20location.`}
              target="_blank" 
              rel="noreferrer"
              className="h-10 px-5 rounded-full bg-[#128C7E] text-white font-bold text-[12.5px] flex items-center gap-1.5 shadow-sm hover:bg-[#075E54]"
            >
              <span>📍 Share Location</span>
            </a>
          </div>
        </div>

      </section>

    </div>
  );
}
