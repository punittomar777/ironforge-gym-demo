import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Programs from "./components/Programs";
import WhyIronForge from "./components/WhyIronForge";
import Trainers from "./components/Trainers";
import Membership from "./components/Membership";
import Testimonials from "./components/Testimonials";
import FinalCTA from "./components/FinalCTA";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import StructuredData from "./components/StructuredData";
import WhatsAppFab from "./components/WhatsAppFab";

export default function Home() {
  return (
    <>
      <StructuredData />
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:font-display focus:uppercase focus:tracking-wider focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Programs />
        <WhyIronForge />
        <Trainers />
        <Membership />
        <Testimonials />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
