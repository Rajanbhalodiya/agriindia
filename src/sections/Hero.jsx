import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

export default function Hero() {
  const { language } = useLanguage();
  const t = translations[language];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24"
    >
      {/* Grid overlay for digital tech field feel */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      {/* Cyberpunk radial background glow */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] top-1/4 left-1/3 pointer-events-none animate-pulse-slow" />
      
      {/* Floating Molecular Crop Node Decoration */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 right-[8%] w-48 h-48 hidden lg:block opacity-25 z-10 pointer-events-none"
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="20" r="4" fill="#22c55e" />
          <circle cx="20" cy="50" r="4" fill="#84cc16" />
          <circle cx="80" cy="50" r="4" fill="#22c55e" />
          <circle cx="50" cy="80" r="4" fill="#84cc16" />
          <line x1="50" y1="20" x2="20" y2="50" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="50" y1="20" x2="80" y2="50" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="20" y1="50" x2="50" y2="80" stroke="#84cc16" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="80" y1="50" x2="50" y2="80" stroke="#84cc16" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="50" y1="20" x2="50" y2="80" stroke="#84cc16" strokeWidth="0.5" />
          <line x1="20" y1="50" x2="80" y2="50" stroke="#22c55e" strokeWidth="0.5" />
          <path d="M50 35 L40 50 L50 65 L60 50 Z" stroke="#22c55e" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="2" fill="#fff" />
        </svg>
      </motion.div>

      {/* Floating Cyber Drone with scanning laser lines */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          x: [0, 5, 0],
          rotate: [-1, 2, -1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[28%] left-[10%] w-56 h-40 hidden md:block opacity-35 z-10 pointer-events-none"
      >
        <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Drone Body */}
          <rect x="40" y="35" width="40" height="10" rx="5" fill="#16a34a" />
          <rect x="50" y="25" width="20" height="10" rx="3" fill="#22c55e" />
          {/* Rotors */}
          <line x1="30" y1="40" x2="90" y2="40" stroke="#84cc16" strokeWidth="2" />
          <line x1="35" y1="30" x2="35" y2="40" stroke="#fff" strokeWidth="1" />
          <line x1="85" y1="30" x2="85" y2="40" stroke="#fff" strokeWidth="1" />
          <circle cx="35" cy="30" r="8" stroke="#22c55e" strokeWidth="1" strokeDasharray="2 2" className="animate-spin-slow" />
          <circle cx="85" cy="30" r="8" stroke="#22c55e" strokeWidth="1" strokeDasharray="2 2" className="animate-spin-slow" />
          {/* Scanning lines */}
          <path d="M60 45 L30 75" stroke="rgba(34, 197, 94, 0.4)" strokeWidth="1" strokeDasharray="2 2" />
          <path d="M60 45 L90 75" stroke="rgba(34, 197, 94, 0.4)" strokeWidth="1" strokeDasharray="2 2" />
          <polygon points="60,45 30,75 90,75" fill="rgba(34, 197, 94, 0.03)" />
        </svg>
      </motion.div>

      {/* Floating glowing tech nodes in background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-primary/40 shadow-neon-glow"
        />
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-2/3 right-1/4 w-3 h-3 rounded-full bg-accent/40 shadow-neon-accent"
        />
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/2 right-[15%] w-2 h-2 rounded-full bg-primary/30"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Content Column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          {/* Banner Tag */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold tracking-wider text-primary mb-6"
          >
            <FaLeaf className="animate-bounce" />
            <span>{t.heroSub}</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl xl:text-7xl font-extrabold tracking-tight text-white mb-6 leading-none"
          >
            {t.heroTitle} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-accent text-glow">
              {t.heroTitleHighlight}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-gray-400 max-w-xl mb-8 leading-relaxed"
          >
            {t.heroDesc}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#products-portal"
              className="group py-4 px-8 bg-primary text-black font-bold tracking-wider rounded-xl shadow-neon-glow hover:bg-accent transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 cursor-none"
            >
              <span>{t.exploreBtn}</span>
              <FiArrowRight className="text-lg group-hover:translate-x-1.5 transition-transform duration-300" />
            </a>
            
            <a
              href="#contact"
              className="py-4 px-8 border border-white/10 hover:border-primary/40 text-white font-bold tracking-wider rounded-xl bg-white/5 hover:bg-primary/5 transition-all duration-300 flex items-center justify-center active:scale-95 cursor-none"
            >
              {t.contactBtn}
            </a>
          </motion.div>
        </motion.div>

        {/* Right Graphic Column (SpaceX/Tesla level 3D-like digital crop pod mockup) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.4 }}
          className="lg:col-span-5 flex justify-center items-center relative"
        >
          {/* Glass Bio-dome Container */}
          <div className="relative w-80 h-[450px] sm:w-[360px] sm:h-[500px] glass-panel border border-white/10 flex flex-col justify-between p-6 overflow-hidden select-none hover:border-primary/20 transition-all duration-500">
            {/* Dynamic Diagnostics */}
            <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
              <span>AGRI_BIO_POD | 01</span>
              <span className="text-primary animate-pulse">● LIVE STATUS</span>
            </div>

            {/* Glowing Crop Animation */}
            <div className="flex-grow flex items-center justify-center relative py-12">
              <div className="absolute w-44 h-44 rounded-full bg-primary/5 border border-primary/20 blur-xl animate-pulse-slow" />
              {/* Futuristic Plant Graphic */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative z-10 w-48 h-48"
              >
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Stem */}
                  <path d="M50 85 Q50 45 60 25" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
                  {/* Pod base */}
                  <line x1="30" y1="85" x2="70" y2="85" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
                  
                  {/* Leaf 1 (Left) */}
                  <path d="M51 60 Q30 50 35 35 Q48 45 52 52Z" fill="url(#leafGrad)" stroke="#22c55e" strokeWidth="1" />
                  {/* Leaf 2 (Right) */}
                  <path d="M54 48 Q75 35 70 20 Q58 35 55 42Z" fill="url(#leafGrad)" stroke="#84cc16" strokeWidth="1" />
                  {/* Digital glow lines */}
                  <path d="M50 85 Q50 45 60 25" stroke="#84cc16" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="60" cy="25" r="3" fill="#fff" className="animate-ping" />
                  <circle cx="60" cy="25" r="2.5" fill="#84cc16" />
                  <circle cx="35" cy="35" r="1.5" fill="#22c55e" />
                  <circle cx="70" cy="20" r="1.5" fill="#84cc16" />

                  {/* Definitions */}
                  <defs>
                    <linearGradient id="leafGrad" x1="0" y1="1" x2="1" y2="0">
                      <stop offset="0%" stopColor="#16a34a" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#84cc16" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>

              {/* Data lines overlay */}
              <div className="absolute left-4 top-1/3 flex flex-col gap-1 border-l border-primary/20 pl-2 text-[9px] font-mono text-gray-500">
                <span className="text-white">NITROGEN: 94%</span>
                <span>MOISTURE: 78%</span>
                <span>CELLULAR_PH: 6.8</span>
              </div>
              <div className="absolute right-4 bottom-1/3 flex flex-col gap-1 border-r border-accent/20 pr-2 text-right text-[9px] font-mono text-gray-500">
                <span className="text-white">UV_INDEX: 4.2</span>
                <span>TEMP: 24.8°C</span>
                <span>LUX_LEVEL: 14K</span>
              </div>
            </div>

            {/* Bottom Diagnostic Metrics */}
            <div className="flex flex-col gap-2 pt-4 border-t border-white/5 font-mono text-[9px] text-gray-400">
              <div className="flex justify-between">
                <span>DNA SYNTHESIS MATCH</span>
                <span className="text-accent font-bold">99.8% READY</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="w-[99.8%] h-full bg-accent" />
              </div>
            </div>
          </div>
          
          {/* Subtle halo ring background */}
          <div className="absolute w-[450px] h-[450px] border border-primary/5 rounded-full pointer-events-none animate-spin-slow" />
        </motion.div>
      </div>

      {/* Down arrow scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-50 hover:opacity-100 transition-opacity duration-300 z-10"
      >
        <span className="text-[10px] font-mono tracking-widest text-gray-400">SCROLL DOWN</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}
