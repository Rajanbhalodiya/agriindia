import React from 'react';
import { FaLeaf } from 'react-icons/fa';
import { FiArrowUp } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#03050c] border-t border-white/5 pt-16 pb-12 w-full overflow-hidden">
      {/* Decorative background grids */}
      <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none" />

      {/* Decorative bottom glow */}
      <div className="absolute w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] bottom-0 left-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col gap-12">
        
        {/* Top footer: Newsletter and logo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-white/5 pb-12">
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <a href="#home" className="flex items-center gap-2 group w-max cursor-none">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/40 group-hover:border-accent transition-all duration-300">
                <FaLeaf className="text-primary text-xl" />
              </div>
              <span className="text-xl font-bold tracking-wider text-white">
                AGRI <span className="text-primary">INDIA</span>
              </span>
            </a>
            <p className="text-xs text-gray-500 max-w-sm leading-relaxed font-sans">
              {t.footerDesc}
            </p>
          </div>

          {/* Newsletter subscription form */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide uppercase">{t.newsletterTitle}</h4>
              <p className="text-xs text-gray-500 mt-1">Receive bio-tech research journals and telemetry module updates directly.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder={t.newsletterPlaceholder}
                className="flex-grow px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-sans text-xs outline-none transition-all duration-300 focus:border-primary focus:bg-white/10 cursor-none"
              />
              <button className="px-6 py-3 rounded-lg bg-primary hover:bg-accent text-black font-bold text-xs tracking-wider transition-all duration-300 shadow-neon-glow active:scale-95 cursor-none">
                {t.subscribeBtn}
              </button>
            </div>
          </div>
        </div>

        {/* Middle footer: Grid links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-white/5 text-xs font-mono">
          {/* Navigation links */}
          <div className="flex flex-col gap-4">
            <h5 className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">// PLATFORM INDEX</h5>
            <ul className="flex flex-col gap-2">
              <li><a href="#home" className="text-gray-400 hover:text-primary transition-colors cursor-none">HOME MODULE</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-primary transition-colors cursor-none">ABOUT ARCHIVE</a></li>
              <li><a href="#products-portal" className="text-gray-400 hover:text-primary transition-colors cursor-none">PROTECTION DECK</a></li>
              <li><a href="#smart-farming" className="text-gray-400 hover:text-primary transition-colors cursor-none">TELEMETRY GRID</a></li>
            </ul>
          </div>

          {/* Formulations links */}
          <div className="flex flex-col gap-4">
            <h5 className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">// FORMULATIONS</h5>
            <ul className="flex flex-col gap-2">
              <li><a href="#products-portal" className="text-gray-400 hover:text-primary transition-colors cursor-none">{t.catIns.toUpperCase()}</a></li>
              <li><a href="#products-portal" className="text-gray-400 hover:text-primary transition-colors cursor-none">{t.catFun.toUpperCase()}</a></li>
              <li><a href="#products-portal" className="text-gray-400 hover:text-primary transition-colors cursor-none">{t.catHer.toUpperCase()}</a></li>
              <li><a href="#products-portal" className="text-gray-400 hover:text-primary transition-colors cursor-none">{t.catPgr.toUpperCase()}</a></li>
            </ul>
          </div>

          {/* Core Tech links */}
          <div className="flex flex-col gap-4">
            <h5 className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">// CORE LABS</h5>
            <ul className="flex flex-col gap-2">
              <li><span className="text-gray-600 select-none">AI NEURAL MODULE [v4.1]</span></li>
              <li><span className="text-gray-600 select-none">RTK-GPS DRONE fleets</span></li>
              <li><span className="text-gray-600 select-none">NDVI SATELLITE LINKS</span></li>
              <li><span className="text-gray-600 select-none">CHROMATOGRAPHY LABS</span></li>
            </ul>
          </div>

          {/* Legal / Metadata */}
          <div className="flex flex-col gap-4">
            <h5 className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">// CORE DIAGNOSTICS</h5>
            <div className="flex flex-col gap-2 text-gray-500 text-[10px]">
              <div className="flex justify-between">
                <span>SYSTEM LINK:</span>
                <span className="text-primary font-bold">ONLINE</span>
              </div>
              <div className="flex justify-between">
                <span>SSL TRANSMISSION:</span>
                <span className="text-white">ENCRYPTED</span>
              </div>
              <div className="flex justify-between">
                <span>HOST STATE:</span>
                <span className="text-white">SECURE // IN</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom footer: Copyright and scroll to top */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-xs text-gray-600 font-mono">
            &copy; {new Date().getFullYear()} Agri India Corp. Securing food supply networks dynamically.
          </div>
          
          <a
            href="#top"
            onClick={scrollToTop}
            className="p-3 rounded-full border border-white/5 bg-white/5 hover:border-primary/30 text-gray-400 hover:text-white transition-all duration-300 active:scale-90 cursor-none"
            aria-label="Scroll to top"
          >
            <FiArrowUp className="text-base" />
          </a>
        </div>

      </div>
    </footer>
  );
}
