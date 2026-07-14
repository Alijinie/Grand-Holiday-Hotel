import React from "react";
import { Phone, MapPin, Mail, MessageCircle, Clock, Award } from "lucide-react";

interface FooterProps {
  whatsappNumber: string;
  phonePrimary: string;
  phoneSecondary: string;
}

export default function Footer({ whatsappNumber, phonePrimary, phoneSecondary }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#07152B] text-white/75 mt-auto border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Brand Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center font-serif font-black text-white text-[15px] tracking-wider">
              GH
            </div>
            <div>
              <div className="font-serif font-bold text-white tracking-wide text-[13px] leading-tight">
                MBARARA GRAND HOLIDAY HOTEL
              </div>
              <div className="text-[10px] tracking-[0.2em] text-[#D4AF37] uppercase font-bold leading-none">
                The Perfect Getaway
              </div>
            </div>
          </div>
          <p className="text-[13px] leading-6 text-white/55 max-w-sm">
            Experience premium luxury, uncompromised comfort, and authentic Ugandan hospitality in the heart of Mbarara City. Book directly on WhatsApp to secure the best rates with zero booking fees.
          </p>
          <div className="flex items-center gap-2 text-[12px] text-white/40">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span>Top Rated Holiday Destination 2026</span>
          </div>
        </div>

        {/* Contact Coordinates */}
        <div>
          <div className="text-white font-semibold text-[13px] tracking-widest uppercase mb-4">
            Contact Details
          </div>
          <ul className="space-y-3 text-[13px] text-white/60">
            <li className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-[#C6A15A] shrink-0 mt-0.5" />
              <div>
                <p>{phonePrimary}</p>
                <p>{phoneSecondary}</p>
              </div>
            </li>
            <li className="flex items-center gap-2.5">
              <MessageCircle className="w-4 h-4 text-[#128C7E] shrink-0" />
              <span>WhatsApp: +{whatsappNumber}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#C6A15A] shrink-0 mt-0.5" />
              <span>Near Tatitwe, Mbarara City, Uganda</span>
            </li>
          </ul>
        </div>

        {/* Operating Hours */}
        <div>
          <div className="text-white font-semibold text-[13px] tracking-widest uppercase mb-4">
            Hours of Operation
          </div>
          <ul className="space-y-3 text-[13px] text-white/60">
            <li className="flex justify-between border-b border-white/5 pb-1.5">
              <span>Hotel Reception</span>
              <span className="font-medium text-[#D4AF37]">Open 24 Hours</span>
            </li>
            <li className="flex justify-between border-b border-white/5 pb-1.5">
              <span>Grand Restaurant</span>
              <span>6:30 AM - 11:00 PM</span>
            </li>
            <li className="flex justify-between border-b border-white/5 pb-1.5">
              <span>Spa & Massage Lounge</span>
              <span>9:00 AM - 10:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Event / Gardens Venue</span>
              <span>Flexible Hours</span>
            </li>
          </ul>
        </div>

        {/* Booking & Grounding Shortcuts */}
        <div className="space-y-4">
          <div className="text-white font-semibold text-[13px] tracking-widest uppercase">
            Direct Bookings
          </div>
          <p className="text-[13px] text-white/50">
            Need immediate booking or custom catering packages? Chat live with our reservation officers directly.
          </p>
          <a
            href={`https://wa.me/${whatsappNumber}?text=Hello%20Mbarara%20Grand%20Holiday%20Hotel%20%F0%9F%91%8B%20I%20would%20like%20to%20reserve%20a%20luxury%20room.`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 h-11 px-6 w-full rounded-full bg-[#128C7E] text-white font-semibold text-[13.5px] hover:bg-[#075E54] transition-all"
          >
            <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10 bg-[#040e1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white/40">
          <span>&copy; {currentYear} Mbarara Grand Holiday Hotel. All rights reserved.</span>
          <span>Designed with premium Ugandan luxury and hospitality standards</span>
        </div>
      </div>
    </footer>
  );
}
