export interface Room {
  id: string;
  name: string;
  price: number;
  tag: string;
  guests: number;
  beds: number;
  baths: number;
  size: string;
  img: string;
  facilities: string[];
}

export interface GuestCount {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

export interface Message {
  role: "user" | "model" | "system";
  text: string;
}

export interface BookingState {
  room: Room | null;
  checkIn: string;
  checkOut: string;
  guests: GuestCount;
}
