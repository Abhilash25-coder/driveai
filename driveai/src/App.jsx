import { AppProvider } from "./context/AppContext";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import './index.css'
import Models from "./components/Models";
import Features from "./components/Features";
import Comparison from "./components/Comparison";
import Pricing from "./components/Pricing";
import Booking from "./components/Booking";
import Contact from "./components/Contact";
import AIAssistant from "./components/AIAssistant";
export default function App() {
  return (
    <AppProvider>
    <Navbar/>
    <Hero/>
    <Models/>
    <Features/>
    <Comparison/>
    <Pricing/>
    <Booking />
    <Contact />
    <AIAssistant />
    </AppProvider>
  );
}