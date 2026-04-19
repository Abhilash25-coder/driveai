import { AppProvider } from "./context/AppContext";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import './index.css'
import Models from "./components/Models";
export default function App() {
  return (
    <AppProvider>
    <Navbar/>
    <Hero/>
    <Models/>
    </AppProvider>
  );
}