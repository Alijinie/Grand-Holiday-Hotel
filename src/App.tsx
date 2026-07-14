import React, { useState } from "react";
import { Room, GuestCount } from "./types";
import { HOTEL_INFO } from "./data";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeTab from "./components/HomeTab";
import PlannerTab from "./components/PlannerTab";
import ConciergeTab from "./components/ConciergeTab";
import BookingModal from "./components/BookingModal";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("home");
  
  // Date states managed centrally to synchronize search fields
  const getTodayDateString = () => {
    return new Date().toISOString().split("T")[0];
  };

  const getTomorrowDateString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const [checkInDate, setCheckInDate] = useState<string>(getTodayDateString());
  const [checkOutDate, setCheckOutDate] = useState<string>(getTomorrowDateString());
  
  const [guestCount, setGuestCount] = useState<GuestCount>({
    adults: 2,
    children: 1,
    infants: 0,
    pets: 0,
  });

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const handleBookRoom = (room: Room) => {
    setSelectedRoom(room);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF2] selection:bg-[#C6A15A]/30">
      
      {/* Universal Header Component */}
      <Header 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        whatsappNumber={HOTEL_INFO.whatsappNumber}
      />

      {/* Main Content Sections (Tab-Driven) */}
      <main className="flex-grow">
        {currentTab === "home" && (
          <HomeTab 
            onBookRoom={handleBookRoom}
            checkInDate={checkInDate}
            setCheckInDate={setCheckInDate}
            checkOutDate={checkOutDate}
            setCheckOutDate={setCheckOutDate}
            guestCount={guestCount}
            setGuestCount={setGuestCount}
            whatsappNumber={HOTEL_INFO.whatsappNumber}
          />
        )}

        {currentTab === "planner" && (
          <PlannerTab 
            whatsappNumber={HOTEL_INFO.whatsappNumber}
          />
        )}

        {currentTab === "concierge" && (
          <ConciergeTab />
        )}
      </main>

      {/* Booking Checkout Modal (Popup overlay) */}
      {selectedRoom && (
        <BookingModal 
          room={selectedRoom}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          guestCount={guestCount}
          whatsappNumber={HOTEL_INFO.whatsappNumber}
          onClose={() => setSelectedRoom(null)}
        />
      )}

      {/* Universal Footer Component */}
      <Footer 
        whatsappNumber={HOTEL_INFO.whatsappNumber}
        phonePrimary={HOTEL_INFO.phonePrimary}
        phoneSecondary={HOTEL_INFO.phoneSecondary}
      />

    </div>
  );
}
