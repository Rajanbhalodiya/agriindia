import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiCompass, FiUsers } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

export default function WhyChooseUs() {
  const { language } = useLanguage();
  const t = translations[language];
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const benefits = [
    {
      icon: <FiAward className="text-3xl" />,
      title: t.whyCard1Title,
      desc: t.whyCard1Desc,
      refId: 'QUAL_SYS_01',
    },
    {
      icon: <FiCompass className="text-3xl" />,
      title: t.whyCard2Title,
      desc: t.whyCard2Desc,
      refId: 'RND_LAB_X4',
    },
    {
      icon: <FiUsers className="text-3xl" />,
      title: t.whyCard3Title,
      desc: t.whyCard3Desc,
      refId: 'UIX_FARM_V3',
    },
  ];

  return (
    <section id="why-us" className="relative py-24 md:py-32 w-full overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

      {/* Background glow highlights */}
      <div className="absolute w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] -left-20 top-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full" ref={ref}>
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold tracking-wider text-primary mb-4"
          >
            <span>[{t.whySub}]</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight"
          >
            {t.whyTitle} <span className="text-primary text-glow">{t.whyTitleHighlight}</span>
          </motion.h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="glass-panel p-6 sm:p-8 flex flex-col justify-between h-[280px] border border-white/5 glass-panel-hover"
            >
              <div className="flex flex-col gap-4">
                <div className="text-primary">{benefit.icon}</div>
                <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                  {benefit.title}
                </h3>
                <p className="text-xs text-gray-500 font-sans leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
              
              <div className="flex justify-between items-center text-[8px] font-mono text-gray-600 border-t border-white/5 pt-4">
                <span>SYSTEM_KEY: {benefit.refId}</span>
                <span>SECURE | VALIDATED</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
