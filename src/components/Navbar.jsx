import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLeaf } from 'react-icons/fa';
import { HiMenuAlt3, HiMoon, HiSun } from 'react-icons/hi';
import { IoCloseSharp } from 'react-icons/io5';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext.jsx';
import { translations } from '../utils/translations';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.home, href: '#home' },
    { name: t.about, href: '#about' },
    { name: t.products, href: '#products-portal' },
    { name: t.smartTech, href: '#smart-farming' },
    { name: t.whyUs, href: '#why-us' },
    { name: t.process, href: '#process' },
    { name: t.innovation, href: '#innovation' },
    { name: t.contact, href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled 
            ? 'py-4 bg-white/80 dark:bg-[#050816]/75 backdrop-blur-md border-b border-primary/10 shadow-lg' 
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group cursor-none">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/40 group-hover:border-accent group-hover:shadow-neon-glow transition-all duration-300">
              <FaLeaf className="text-primary text-xl group-hover:text-accent transition-colors duration-300 animate-pulse-slow" />
              <div className="absolute -inset-0.5 rounded-lg bg-primary/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-bold tracking-wider text-white group-hover:text-primary transition-colors duration-300">
              AGRI <span className="text-primary">INDIA</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="relative text-sm font-medium tracking-wide text-gray-300 hover:text-white transition-colors duration-300 py-2 group cursor-none"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Language Switcher */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-primary text-[10px] font-bold tracking-wider text-gray-300 transition-colors focus:outline-none cursor-none uppercase"
            >
              <option value="en" className="bg-[#050816] text-white">EN</option>
              <option value="hi" className="bg-[#050816] text-white">हिन्दी</option>
              <option value="gu" className="bg-[#050816] text-white">ગુજરાતી</option>
            </select>

            {/* Theme Switch */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-primary hover:border-primary/20 transition-all duration-300 cursor-none"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <HiSun className="text-lg" /> : <HiMoon className="text-lg" />}
            </button>

            {/* Launch CTA */}
            <a
              href="#products-portal"
              className="px-4 py-2 text-xs font-bold tracking-widest text-primary border border-primary/30 rounded-full bg-primary/5 hover:bg-primary hover:text-black hover:shadow-neon-glow hover:border-primary transition-all duration-300 cursor-none"
            >
              {t.launchPortal}
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg border border-white/5 bg-white/5 text-gray-300 hover:text-primary hover:border-primary/20 transition-all duration-300 cursor-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <IoCloseSharp className="text-2xl" /> : <HiMenuAlt3 className="text-2xl" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed inset-0 z-30 lg:hidden bg-[#050816]/95 backdrop-blur-xl border-l border-white/5 flex flex-col justify-between p-8"
          >
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex flex-col gap-10 mt-16">
              <div className="flex flex-col gap-4">
                <p className="text-xs font-semibold tracking-widest text-primary uppercase">{t.navMenu}</p>
                <div className="h-[1px] w-full bg-white/10" />
              </div>
              
              {/* Language Selector for Mobile */}
              <div className="flex gap-2.5 items-center">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{t.selectLang}</span>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-gray-300 focus:outline-none"
                >
                  <option value="en" className="bg-[#050816] text-white">English</option>
                  <option value="hi" className="bg-[#050816] text-white">हिन्दी</option>
                  <option value="gu" className="bg-[#050816] text-white">ગુજરાતી</option>
                </select>
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-primary hover:border-primary/20 transition-all duration-300 cursor-none"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <HiSun className="text-lg" /> : <HiMoon className="text-lg" />}
                </button>
              </div>

              <ul className="flex flex-col gap-5">
                {navLinks.map((link, idx) => (
                  <motion.li
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={`${link.name}-${idx}`}
                  >
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-xl font-semibold tracking-wide text-gray-300 hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <a
                href="#products-portal"
                onClick={() => setIsOpen(false)}
                className="w-full py-4 text-center text-sm font-bold tracking-widest text-black bg-primary rounded-xl shadow-neon-glow hover:bg-accent transition-all duration-300"
              >
                {t.launchPortal}
              </a>
              <div className="text-center text-xs text-gray-500">
                &copy; {new Date().getFullYear()} Agri India. All rights reserved.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
