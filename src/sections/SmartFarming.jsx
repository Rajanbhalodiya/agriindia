import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCpu, FiCompass, FiActivity, FiGlobe } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

export default function SmartFarming() {
  const { language } = useLanguage();
  const t = translations[language];

  const [activeTab, setActiveTab] = useState('ai');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [telemetry, setTelemetry] = useState({ ph: 6.5, moisture: 45, nitrogen: 80 });

  // Update telemetry values to simulate live diagnostic data
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry({
        ph: Number((6.2 + Math.random() * 0.6).toFixed(2)),
        moisture: Math.floor(40 + Math.random() * 15),
        nitrogen: Math.floor(75 + Math.random() * 10),
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const technologies = {
    ai: {
      title: t.smartTab1Title,
      icon: <FiCpu className="text-xl" />,
      desc: t.smartTab1Desc,
      metrics: t.smartMetric1 || [],
      color: '#22c55e',
    },
    precision: {
      title: t.smartTab2Title,
      icon: <FiCompass className="text-xl" />,
      desc: t.smartTab2Desc,
      metrics: t.smartMetric2 || [],
      color: '#84cc16',
    },
    monitoring: {
      title: t.smartTab3Title,
      icon: <FiActivity className="text-xl text-glow" />,
      desc: t.smartTab3Desc,
      metrics: t.smartMetric3 || [],
      color: '#10b981',
    },
    sustainable: {
      title: t.smartTab4Title,
      icon: <FiGlobe className="text-xl" />,
      desc: t.smartTab4Desc,
      metrics: t.smartMetric4 || [],
      color: '#22c55e',
    },
  };

  return (
    <section id="smart-farming" className="relative py-24 md:py-32 w-full overflow-hidden border-t border-white/5 bg-[#050816]/30">
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

      {/* Decorative Neon Ring */}
      <div className="absolute top-1/2 left-2/3 -translate-y-1/2 w-[600px] h-[600px] border border-primary/5 rounded-full pointer-events-none animate-spin-slow" />
      <div className="absolute w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] right-10 top-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full" ref={ref}>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold tracking-wider text-primary mb-4"
          >
            <span>[{t.smartSub}]</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight"
          >
            {t.smartTitle} <span className="text-primary text-glow">{t.smartTitleHighlight}</span>
          </motion.h2>
        </div>

        {/* Tab & Dashboard split grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Tech Tab Selectors */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {Object.keys(technologies).map((key) => {
              const tech = technologies[key];
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`w-full p-5 rounded-2xl flex items-center gap-4 text-left border transition-all duration-300 cursor-none relative overflow-hidden group ${
                    isActive
                      ? 'bg-primary/10 border-primary shadow-neon-glow'
                      : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                      isActive ? 'bg-primary text-black border-primary' : 'bg-[#050816] text-primary border-primary/20'
                    }`}
                  >
                    {tech.icon}
                  </div>
                  <div>
                    <h3 className={`text-base font-bold transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                      {tech.title}
                    </h3>
                    <span className="text-[10px] font-mono text-gray-500 tracking-wider">
                      MODULE STATE | ONLINE
                    </span>
                  </div>
                  
                  {/* Neon border lines */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute left-0 top-0 h-full w-[3px] bg-accent"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Simulated Diagnostics Dashboard */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full glass-panel border border-white/10 p-6 sm:p-8 flex flex-col justify-between h-[450px] relative overflow-hidden"
              >
                {/* Background Tech Mesh */}
                <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

                {/* Dashboard Header */}
                <div className="flex justify-between items-center pb-4 border-b border-white/10 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-mono text-white tracking-widest uppercase">
                      SYS_COCKPIT | {technologies[activeTab].title}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-gray-500">REF_NODE_SYS4.2</span>
                </div>

                {/* Main info */}
                <div className="flex-grow py-6 flex flex-col justify-between relative z-10">
                  <div className="mb-6">
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 font-sans">
                      {technologies[activeTab].desc}
                    </p>
                    
                    {/* Key indicators */}
                    <div className="flex flex-col gap-2.5">
                      {technologies[activeTab].metrics.map((m, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-mono text-gray-400">
                          <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                          <span>{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Telemetry charts mockup */}
                  <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-6 font-mono">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                      <span className="text-[9px] text-gray-500 block mb-1 uppercase">{t.soilPh}</span>
                      <span className="text-lg font-black text-primary font-mono">{telemetry.ph}</span>
                    </div>

                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                      <span className="text-[9px] text-gray-500 block mb-1 uppercase">{t.soilMoisture}</span>
                      <span className="text-lg font-black text-accent font-mono">{telemetry.moisture}%</span>
                    </div>

                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                      <span className="text-[9px] text-gray-500 block mb-1 uppercase">{t.soilNitrogen}</span>
                      <span className="text-lg font-black text-white font-mono">{telemetry.nitrogen}</span>
                    </div>
                  </div>
                </div>

                {/* Dashboard Footer diagnostics */}
                <div className="flex justify-between items-center text-[9px] font-mono text-gray-600 border-t border-white/5 pt-4 relative z-10">
                  <span>TELEMETRY_LINK: SECURE</span>
                  <span>BUFFER: 0ms</span>
                  <span>D-LINK FREQ: 5.8 GHz</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
