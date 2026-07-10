import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiSearch, FiSliders, FiCheckSquare, FiNavigation } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

export default function Process() {
  const { language } = useLanguage();
  const t = translations[language];
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const steps = [
    {
      icon: <FiSearch className="text-2xl" />,
      title: t.procStep1Title,
      desc: t.procStep1Desc,
      details: t.procStep1Detail || [],
    },
    {
      icon: <FiSliders className="text-2xl" />,
      title: t.procStep2Title,
      desc: t.procStep2Desc,
      details: t.procStep2Detail || [],
    },
    {
      icon: <FiCheckSquare className="text-2xl" />,
      title: t.procStep3Title,
      desc: t.procStep3Desc,
      details: t.procStep3Detail || [],
    },
    {
      icon: <FiNavigation className="text-2xl" />,
      title: t.procStep4Title,
      desc: t.procStep4Desc,
      details: t.procStep4Detail || [],
    },
  ];

  return (
    <section id="process" className="relative py-24 md:py-32 w-full overflow-hidden border-t border-white/5 bg-[#050816]/20">
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

      {/* Decorative Blur */}
      <div className="absolute w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] right-0 bottom-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full" ref={ref}>
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold tracking-wider text-primary mb-4"
          >
            <span>[{t.procSub}]</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight"
          >
            {t.procTitle} <span className="text-primary text-glow">{t.procTitleHighlight}</span>
          </motion.h2>
        </div>

        {/* Timeline Grid layout */}
        <div className="relative">
          {/* Vertical linking line */}
          <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none" />
          
          <div className="flex flex-col gap-12 md:gap-16">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''} relative`}>
                  {/* Left / Right content wrapper */}
                  <div className="w-full md:w-1/2 md:px-8 mb-4 md:mb-0">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.8, delay: idx * 0.15 }}
                      className="glass-panel p-6 border border-white/5 hover:border-primary/25 transition-all duration-300 flex flex-col gap-3"
                    >
                      <h3 className="text-lg font-bold text-white tracking-tight">{step.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed font-sans">{step.desc}</p>
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        {step.details.map((detail, i) => (
                          <span key={i} className="text-[8px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-gray-400">
                            {detail}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Diagnostic step circle indicator */}
                  <div className="absolute left-0 md:left-1/2 -translate-x-[15px] md:-translate-x-1/2 w-8 h-8 rounded-full bg-[#050816] border border-primary flex items-center justify-center text-primary z-10 hover:shadow-neon-glow hover:bg-primary hover:text-black transition-all duration-300">
                    {step.icon}
                  </div>

                  {/* Blank space spacing on opposite side */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
