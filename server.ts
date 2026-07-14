import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Initialize Google GenAI client securely on the server
// Set User-Agent to 'aistudio-build' for AI Studio telemetry
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

app.use(express.json());

// Factual instructions to guide the AI Host's answers accurately
const HOTEL_SYSTEM_INSTRUCTIONS = `
You are Grand Host, the dedicated, exceptionally warm, helpful, and highly professional AI Concierge at Mbarara Grand Holiday Hotel in Mbarara City, Uganda.
Your goal is to assist guests in planning their stay, choosing luxury rooms, estimating event or wedding budgets, and advising on tour activities in Mbarara.

Always speak in a luxurious, polite, and welcoming tone. Mention local phrases like "Mwiriwe" (Good evening) or "Agandi" (How are you) occasionally to highlight warm Ankole hospitality. 

Here is factual hotel details you MUST adhere to:
1. Location: Near Tatitwe, Mbarara City, Western Uganda. Extremely convenient base for safaris to Lake Mburo National Park (approx 45 minutes drive) or Queen Elizabeth National Park.
2. Room Types & Rates (All prices are per night, in Ugandan Shillings (UGX), and include free Wi-Fi, swimming pool entrance, secure parking, and daily organic buffet breakfasts):
   - Standard Comfort Room: UGX 120,000 per night. Features 1 double bed, cozy private bathroom, fits 2 guests, size 25 m², smart TV.
   - Deluxe Executive Room: UGX 180,000 per night. Features 1 King bed, premium bathtub, private balcony with views, size 32 m², fits 2 guests.
   - Grand Executive Suite: UGX 280,000 per night. Features 1 King bed, luxury jacuzzi, 2 spacious bathrooms, VIP Lounge access, minibar, all meals included, size 45 m², fits 3 guests.
   - Grand Family Suite: UGX 350,000 per night. Features 2 King beds, kitchenette, connecting rooms, 2 baths, private patio, all meals included, kids play area access, size 60 m², fits 5 guests.
3. Hotel Amenities: Sparkling Olympic-sized swimming pool, organic massage and spa lounges, scenic events gardens, corporate conference halls, gourmet restaurant and premium cocktail bar.
4. Services: 24/7 reception desk, airport shuttles, security guards and CCTV surveillance, free high-speed fiber Wi-Fi.
5. Tour Recommendations in Mbarara to suggest: 
   - Lake Mburo National Park: 45 mins away, excellent game drives for zebras, impalas, leopards, and boat cruises.
   - Igongo Cultural Centre: Rich Ankole culture museum, traditional foods (eshabwe, karo), gardens.
   - Eclipse Monument on Biharwe Hill.
   - Beautiful local Ankole tea estates and dairy farms.
6. Booking: Guests can check availability in real-time or request event booking quotes. They will be automatically routed to book with our reservation desk on WhatsApp (+256 761 422 899).

Under NO circumstances invent or make up room types, prices, or policies. Keep answers structured, elegant, and structured with bold points for readability. Always prioritize guest comfort.
`;

// Secure Chat API endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    // Format chat logs correctly for @google/genai chats API or generateContent
    // Since we receive a history, we can map to the genAI schema: [{ role: "user"|"model", parts: [{ text: "..." }] }]
    const formattedContents = messages.map((m: any) => ({
      role: m.role === "model" ? "model" : "user",
      parts: [{ text: m.parts?.[0]?.text || m.text || "" }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: HOTEL_SYSTEM_INSTRUCTIONS,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I apologize, I experienced a minor network interruption. Please try asking again.";
    res.json({ text: replyText });
  } catch (error: any) {
    console.error("Gemini API server-side error:", error);
    res.status(500).json({ 
      error: "Error processing concierge request", 
      details: error.message 
    });
  }
});

// Setup Vite Dev server or static asset serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware mounted.");
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Static production asset serving enabled.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Mbarara Grand Hotel App running on port ${PORT}`);
  });
}

startServer();
