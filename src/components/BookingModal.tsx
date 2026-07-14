import React, { useState } from "react";
import { Room, GuestCount } from "../types";
import { X, Calendar, User, Phone, Edit, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";

interface BookingModalProps {
  room: Room | null;
  checkInDate: string;
  checkOutDate: string;
  guestCount: GuestCount;
  whatsappNumber: string;
  onClose: () => void;
}

export default function BookingModal({
  room,
  checkInDate,
  checkOutDate,
  guestCount,
  whatsappNumber,
  onClose,
}: BookingModalProps) {
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  if (!room) return null;

  // Calculate stay nights dynamically
  const getNightsCount = () => {
    if (!checkInDate || !checkOutDate) return 1;
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const nightsCount = getNightsCount();
  const totalPrice = room.price * nightsCount;

  const handleSendBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!guestName.trim()) {
      setValidationError("Please enter your full name to proceed.");
      return;
    }

    const startStr = checkInDate || "Not chosen";
    const endStr = checkOutDate || "Not chosen";
    
    const message = `Hello Mbarara Grand Holiday Hotel 👋\n\nI would like to book a luxury room reservation:\n\n🏨 Room Chosen: ${room.name} (${room.tag})\n📅 Check-In Date: ${startStr}\n📅 Check-Out Date: ${endStr}\n🛌 Nights: ${nightsCount} Night${nightsCount > 1 ? "s" : ""}\n👥 Guests: ${guestCount.adults} Adults, ${guestCount.children} Children\n💰 Grand Total: UGX ${totalPrice.toLocaleString()}\n\n👤 Guest Name: ${guestName.trim()}\n📞 Guest Contact: ${guestPhone || "Not specified"}\n\n📝 Special Requests:\n${specialRequests.trim() || "None requested."}\n\nPlease confirm availability and let me know about payment/check-in instructions. Thank you!`;

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dimmed backdrop filter click-outside */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-[#07152B]/75 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Modal Core Window Card */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-black/5 overflow-hidden animate-scaleIn z-10">
        
        {/* Header Block with gold accent line */}
        <div className="p-6 pb-4 border-b border-black/5 flex justify-between items-start">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#C6A15A]">Reservation Checkout</span>
            <h3 className="font-serif text-[22px] font-bold text-[#0A1E3C]">Confirm Suite Booking</h3>
            <div className="text-[11.5px] text-black/50 leading-relaxed">Securing direct Booking rates with zero fees</div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-black/50 hover:text-black hover:bg-black/5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <form onSubmit={handleSendBooking} className="p-6 space-y-4">
          
          {/* Selected Room Metadata Info Badge */}
          <div className="p-4 rounded-2xl bg-[#FFFBF2] border border-[#E9DFC7]/80 flex gap-4 items-center">
            <img 
              src={room.img} 
              alt={room.name} 
              className="w-20 h-20 rounded-xl object-cover border border-[#E9DFC7]/60"
            />
            <div className="flex-1 min-w-0 space-y-1">
              <span className="text-[9px] bg-[#0A1E3C] text-white font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                {room.tag} Suite
              </span>
              <h4 className="font-serif text-[15px] font-bold text-[#0A1E3C] truncate">{room.name}</h4>
              <p className="text-[11px] text-black/50 truncate">
                {room.guests} Guests limit • {room.beds} Bed{room.beds > 1 ? "s" : ""} • {room.size}
              </p>
              <div className="text-[12px] font-bold text-[#C6A15A]">
                UGX {room.price.toLocaleString()} / night
              </div>
            </div>
          </div>

          {/* Quick Stay Summary Metrics */}
          <div className="grid grid-cols-2 gap-3.5 p-3 rounded-2xl border border-black/5 bg-[#FFFBF2]/30 text-[12px]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C6A15A] shrink-0" />
              <div>
                <span className="block text-[9px] text-black/40 uppercase tracking-widest">Stay Period</span>
                <span className="font-bold text-[#0A1E3C]">
                  {nightsCount} Night{nightsCount > 1 ? "s" : ""}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C6A15A] shrink-0" />
              <div>
                <span className="block text-[9px] text-black/40 uppercase tracking-widest">Grand Estimated Cost</span>
                <span className="font-bold text-[#128C7E]">
                  UGX {totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Inputs Section */}
          <div className="space-y-3.5">
            
            {/* Guest Name input */}
            <div>
              <label className="block text-[11px] font-bold tracking-widest uppercase text-black/55 mb-1.5">Guest Full Name (Required)</label>
              <div className="relative h-11 rounded-xl border border-black/10 bg-white flex items-center px-3.5">
                <User className="w-4 h-4 text-black/30 mr-2 shrink-0" />
                <input 
                  type="text" 
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. John Kampala"
                  className="bg-transparent text-[13px] font-semibold outline-none w-full text-black/85" 
                />
              </div>
            </div>

            {/* Guest Contact Phone */}
            <div>
              <label className="block text-[11px] font-bold tracking-widest uppercase text-black/55 mb-1.5">Mobile Phone (Optional)</label>
              <div className="relative h-11 rounded-xl border border-black/10 bg-white flex items-center px-3.5">
                <Phone className="w-4 h-4 text-black/30 mr-2 shrink-0" />
                <input 
                  type="tel" 
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  placeholder="e.g. +256 700 000 000"
                  className="bg-transparent text-[13px] font-semibold outline-none w-full text-black/85" 
                />
              </div>
            </div>

            {/* Special Instructions text area */}
            <div>
              <label className="block text-[11px] font-bold tracking-widest uppercase text-black/55 mb-1.5">Special Requests & Notes (Optional)</label>
              <div className="relative rounded-xl border border-black/10 bg-white p-3">
                <Edit className="w-4 h-4 text-black/30 absolute left-3 top-3" />
                <textarea 
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Vegan breakfast, early check-in at 10 AM, extra baby cot, feather-free pillows..."
                  className="bg-transparent text-[13px] font-medium outline-none w-full h-16 pl-6 resize-none text-black/85" 
                />
              </div>
            </div>

          </div>

          {/* Validation Error Banner */}
          {validationError && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 text-xs font-semibold text-center">
              ⚠ {validationError}
            </div>
          )}

          {/* Checkout CTA */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-[#128C7E] text-white font-bold text-[13.5px] hover:bg-[#075E54] flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
              <span>Confirm Stay on WhatsApp</span>
            </button>
            <div className="text-center text-[10.5px] text-black/40 mt-2 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#128C7E]" />
              <span>No pre-payment required. Pay on arrival.</span>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
