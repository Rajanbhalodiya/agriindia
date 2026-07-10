import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from './context/ThemeContext.jsx';

// Core Components
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';

// Page Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Products from './sections/Products';
import SmartFarming from './sections/SmartFarming';
import WhyChooseUs from './sections/WhyChooseUs';
import Process from './sections/Process';
import Innovation from './sections/Innovation';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

// Separate Page Component
import ProductsPage from './pages/ProductsPage';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#products-portal') {
        setCurrentView('products');
        window.scrollTo(0, 0);
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Run initially

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const { theme } = useTheme();

  // Mouse spotlight tracker on container
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--x', `${x}px`);
    e.currentTarget.style.setProperty('--y', `${y}px`);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full overflow-x-hidden bg-[var(--bg-color)] text-[var(--text-color)]"
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <div key="content" className="relative w-full min-h-screen">
            {/* Interactive Spotlight background */}
            <div className="radial-spotlight absolute inset-0 z-0 pointer-events-none" />

            {/* Custom interactive mouse cursor */}
            <CustomCursor />

            {/* Canvas Particle Engine */}
            <ParticleBackground />

            {/* Global Navigation */}
            <Navbar />

            {/* Main Content Areas depending on View */}
            <AnimatePresence mode="wait">
              {currentView === 'products' ? (
                <ProductsPage 
                  key="products-view" 
                  onBack={() => {
                    window.location.hash = '#home';
                  }} 
                />
              ) : (
                <main key="home-view" className="relative z-10 w-full flex flex-col">
                  <Hero />
                  <About />
                  <Products />
                  <SmartFarming />
                  <WhyChooseUs />
                  <Process />
                  <Innovation />
                  <Contact />
                </main>
              )}
            </AnimatePresence>

            {/* Footer */}
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
