import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLeaf } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

export default function LoadingScreen({ onComplete }) {
  const { language } = useLanguage();
  const t = translations[language];

  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState(t.loadTexts[0]);

  useEffect(() => {
    const texts = t.loadTexts;

    let textIdx = 0;
    const textInterval = setInterval(() => {
      if (textIdx < texts.length - 1) {
        textIdx++;
        setLoadingText(texts[textIdx]);
      }
    }, 300);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(textInterval);
          setTimeout(() => {
            onComplete();
          }, 300);
          return 100;
        }
        const diff = Math.floor(Math.random() * 12) + 8;
        return Math.min(prev + diff, 100);
      });
    }, 60);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onComplete, t.loadTexts]);

  return (
    <motion.div
      exit={{ y: '-100vh', opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 w-full h-full bg-[#050816] z-50 flex flex-col items-center justify-center"
    >
      {/* Space grid background */}
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />

      {/* Decorative background glows */}
      <div className="absolute w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[120px] -top-10 -left-10 pointer-events-none" />
      <div className="absolute w-[40vw] h-[40vw] bg-accent/5 rounded-full blur-[120px] -bottom-10 -right-10 pointer-events-none" />

      <div className="relative flex flex-col items-center justify-center max-w-md w-full px-6">
        {/* Futuristic circular diagnostics around central logo */}
        <div className="relative w-36 h-36 flex items-center justify-center mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 border-2 border-dashed border-primary/25 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-2 border border-accent/40 border-t-transparent border-b-transparent rounded-full"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
            className="relative flex items-center justify-center w-20 h-20 bg-primary/10 border border-primary/40 rounded-full shadow-neon-glow"
          >
            <FaLeaf className="text-primary text-3xl animate-pulse-slow" />
          </motion.div>
        </div>

        {/* Brand Header */}
        <h1 className="text-2xl font-bold tracking-widest text-white text-center mb-1">
          AGRI <span className="text-primary">INDIA</span>
        </h1>
        <p className="text-xs font-semibold tracking-wider text-accent mb-6 uppercase">
          Futuristic Ecosystems
        </p>

        {/* Loading Progress Bar */}
        <div className="w-full h-[3px] bg-white/5 border border-white/5 rounded-full overflow-hidden mb-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-primary to-accent shadow-neon-glow"
          />
        </div>

        {/* Loading details and numbers */}
        <div className="flex justify-between w-full text-xs font-mono text-gray-500 mb-6">
          <span className="text-left select-none text-glow">{loadingText}</span>
          <span className="text-right text-primary font-bold">{progress}%</span>
        </div>

        {/* Futuristic Grid Coordinates overlay style */}
        <div className="text-[9px] font-mono text-gray-600 flex justify-between w-full border-t border-white/5 pt-4">
          <span>SYS_LOC: IN_DEL_N_28</span>
          <span>NET_LATENCY: 1.4ms</span>
          <span>CELL_ID: V4_AGRI</span>
        </div>
      </div>
    </motion.div>
  );
}
