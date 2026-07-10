import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCpu, FiCompass, FiRadio, FiCheck } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

export default function Innovation() {
  const { language } = useLanguage();
  const t = translations[language];
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedHub, setSelectedHub] = useState('neural');

  const innovations = {
    neural: {
      title: t.innTab1,
      tag: 'AI GENERATION HUB',
      desc: t.innTab1Desc,
      specs: t.innSpecs1 || [],
    },
    satellite: {
      title: t.innTab2,
      tag: 'GEO INFRASTRUCTURE',
      desc: t.innTab2Desc,
      specs: t.innSpecs2 || [],
    },
    nano: {
      title: t.innTab3,
      tag: 'CELLULAR FORMULATION',
      desc: t.innTab3Desc,
      specs: t.innSpecs3 || [],
    },
  };

  return (
    <section id="innovation" className="relative py-24 md:py-32 w-full overflow-hidden border-t border-white/5 bg-[#050816]/40">
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

      {/* Background glow highlights */}
      <div className="absolute w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -right-20 top-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full" ref={ref}>
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold tracking-wider text-primary mb-4"
          >
            <span>[{t.innSub}]</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight"
          >
            {t.innTitle} <span className="text-primary text-glow">{t.innTitleHighlight}</span>
          </motion.h2>
        </div>

        {/* Dynamic Holographic plant and selector split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Interactive Holographic Crop Pod Simulator */}
          <div className="lg:col-span-6 flex justify-center items-center relative order-2 lg:order-1">
            {/* Hologram base */}
            <div className="relative w-80 h-[380px] sm:w-[400px] sm:h-[400px] flex items-center justify-center">
              
              {/* Spinning rings */}
              <div className="absolute inset-0 border border-primary/10 rounded-full animate-spin-slow" />
              <div className="absolute inset-4 border border-dashed border-accent/20 rounded-full animate-spin-slow [animation-direction:reverse]" />
              <div className="absolute inset-16 border border-white/5 rounded-full" />

              {/* Holographic glowing SVG */}
              <motion.div
                animate={{
                  y: [-12, 12, -12],
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative z-10 w-64 h-64"
              >
                <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Digital plant stem */}
                  <path d="M60 100 L60 40 Q60 20 80 15" stroke="#22c55e" strokeWidth="2.5" strokeDasharray="3 2" />
                  <path d="M60 70 Q40 60 35 45" stroke="#84cc16" strokeWidth="2" strokeDasharray="2 2" />
                  <path d="M60 55 Q80 48 85 35" stroke="#22c55e" strokeWidth="2" strokeDasharray="2 2" />
                  
                  {/* Floating target leaf nodes */}
                  <circle cx="80" cy="15" r="4" fill="#22c55e" className="animate-pulse" />
                  <circle cx="35" cy="45" r="3" fill="#84cc16" className="animate-pulse" />
                  <circle cx="85" cy="35" r="3" fill="#22c55e" className="animate-pulse" />
                  
                  {/* Scanning ring grid */}
                  <ellipse cx="60" cy="40" rx="30" ry="10" stroke="rgba(34, 197, 94, 0.4)" strokeWidth="1" strokeDasharray="2 2" />
                  <ellipse cx="60" cy="65" rx="40" ry="12" stroke="rgba(132, 204, 22, 0.4)" strokeWidth="1" strokeDasharray="2 2" />

                  {/* Connected interactive link coordinates */}
                  <line x1="80" y1="15" x2="105" y2="15" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                  <line x1="35" y1="45" x2="10" y2="45" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                  <line x1="85" y1="35" x2="110" y2="35" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />

                  <circle cx="105" cy="15" r="1.5" fill="#fff" />
                  <circle cx="10" cy="45" r="1.5" fill="#fff" />
                  <circle cx="110" cy="35" r="1.5" fill="#fff" />
                </svg>
              </motion.div>

              {/* Floating diagnostic overlay boxes */}
              <div className="absolute top-4 right-4 bg-primary/10 border border-primary/20 backdrop-blur-md px-3 py-1.5 rounded-lg text-[9px] font-mono text-primary flex items-center gap-1.5">
                <FiCpu />
                <span>NEURAL LINK: ESTABLISHED</span>
              </div>

              <div className="absolute bottom-4 left-4 bg-accent/10 border border-accent/20 backdrop-blur-md px-3 py-1.5 rounded-lg text-[9px] font-mono text-accent flex items-center gap-1.5">
                <FiRadio className="animate-pulse" />
                <span>FREQ: ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Data Hub details */}
          <div className="lg:col-span-6 flex flex-col gap-6 order-1 lg:order-2">
            {/* Hub Selector tabs */}
            <div className="flex border-b border-white/10 pb-2 gap-6">
              {Object.keys(innovations).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedHub(key)}
                  className={`pb-3 text-sm font-bold tracking-wider uppercase transition-all duration-300 relative cursor-none ${
                    selectedHub === key ? 'text-primary' : 'text-gray-500 hover:text-white'
                  }`}
                >
                  {innovations[key].title}
                  {selectedHub === key && (
                    <motion.div
                      layoutId="activeInnovator"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Selected Hub details */}
            <div className="glass-panel p-6 sm:p-8 border border-white/5 flex flex-col gap-6 h-[280px] justify-between relative overflow-hidden">
              <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
              
              <div>
                <span className="text-[10px] font-mono text-accent uppercase tracking-widest block mb-2">
                  {innovations[selectedHub].tag}
                </span>
                <p className="text-gray-400 text-sm leading-relaxed font-sans">
                  {innovations[selectedHub].desc}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-4">
                {innovations[selectedHub].specs.map((spec, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-[8px] text-gray-500 font-mono tracking-wider">SPEC_PART_{i + 1}</span>
                    <span className="text-xs font-bold text-white font-mono mt-0.5">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
