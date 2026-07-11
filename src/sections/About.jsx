import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiTarget, FiEye, FiCpu, FiTrendingUp } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

// Simple Count-up component
function StatCounter({ value, duration = 2 }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (!inView) return;
    
    // Parse the number part (e.g. 1.2 from 1.2M or 500 from 500K)
    const numPart = parseFloat(value.replace(/[^\d.]/g, ''));
    
    let start = 0;
    const end = numPart;
    const increment = end / (duration * 60); // 60 fps
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        // Format decimal places if needed
        setCount(start);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [inView, value, duration]);

  // Render format
  const formatCount = () => {
    const rounded = count.toFixed(count < 10 ? 1 : 0);
    const isMillion = value.includes('M');
    const isThousand = value.includes('K');
    const isPercent = value.includes('%');
    
    return `${rounded}${isMillion ? 'M' : isThousand ? 'K' : isPercent ? '%' : ''}`;
  };

  return (
    <span ref={ref} className="text-4xl font-extrabold text-white tracking-tight text-glow">
      {formatCount()}
    </span>
  );
}

export default function About() {
  const { language } = useLanguage();
  const t = translations[language];
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const timelineData = [
    { year: '2018', title: 'Deep Roots & Satellites', desc: 'Agri India is founded. Integrated GPS and satellite mapping networks for real-time vegetative indexing.' },
    { year: '2021', title: 'Molecular Labs', desc: 'Established nanotechnology labs formulating bio-fungicides and eco-friendly growth regulators.' },
    { year: '2024', title: 'Autonomous Mesh Drone Grids', desc: 'Launched localized, autonomous drone hubs spraying crops dynamically based on crop health signatures.' },
    { year: '2026+', title: 'Quantum Agri AI', desc: 'Deploying deep generative neural modules to predict crop yields and eliminate soil nutrient depletion.' }
  ];

  return (
    <section id="about" className="relative py-24 md:py-32 w-full overflow-hidden border-t border-white/5">
      {/* Cyber Grid background */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

      {/* Decorative Blur Spheres */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] -right-20 top-1/4 pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] -left-20 bottom-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full" ref={ref}>
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={controls}
            variants={{ visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold tracking-wider text-primary mb-4"
          >
            <span>[{t.aboutSub}]</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{ visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight"
          >
            {t.aboutTitle} <br />
            <span className="text-primary text-glow-accent">{t.aboutTitleHighlight}</span>
          </motion.h2>
        </div>

        {/* Top Section: Story and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24 md:mb-32">
          {/* Left: Bio-Cyber Story */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={controls}
            variants={{ visible: { opacity: 1, x: 0 } }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <FiTrendingUp className="text-primary" />
              {t.farmersEmpowered}
            </h3>
            <p className="text-gray-400 leading-relaxed text-base">
              {t.aboutDesc1}
            </p>
            <p className="text-gray-400 leading-relaxed text-base">
              {t.aboutDesc2}
            </p>

            {/* Mission / Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <div className="glass-panel p-6 glass-panel-hover flex flex-col gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <FiTarget className="text-primary text-lg" />
                </div>
                <h4 className="text-lg font-bold text-white">{t.mission}</h4>
                <p className="text-sm text-gray-500">
                  {t.missionDesc}
                </p>
              </div>

              <div className="glass-panel p-6 glass-panel-hover flex flex-col gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <FiEye className="text-accent text-lg" />
                </div>
                <h4 className="text-lg font-bold text-white">{t.vision}</h4>
                <p className="text-sm text-gray-500">
                  {t.visionDesc}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Live Data Feed & Counter Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={controls}
            variants={{ visible: { opacity: 1, x: 0 } }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 grid grid-cols-2 gap-6"
          >
            {[
              { label: t.farmersEmpowered, val: '1.2M+' },
              { label: t.hectaresScanned, val: '500K+' },
              { label: t.yieldIncrease, val: '40%+' },
              { label: t.successGuarantee, val: '99.2%' },
            ].map((stat, idx) => (
              <div key={idx} className="glass-panel p-6 relative overflow-hidden group hover:border-primary/20 transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl pointer-events-none" />
                <p className="text-[10px] font-mono text-gray-500 tracking-wider mb-2 uppercase">DATA_METRIC | 0{idx + 1}</p>
                <div className="mb-2">
                  <StatCounter value={stat.val} />
                </div>
                <p className="text-sm text-gray-400 font-semibold tracking-tight">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Section: Futuristic Timeline */}
        <div>
          <div className="flex flex-col items-center text-center mb-16">
            <h3 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <FiCpu className="text-primary" />
              Innovation Timeline
            </h3>
            <p className="text-sm text-gray-500 mt-2">Tracking the timeline of the secondary green revolution</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Horizontal timeline connector lines for desktop */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent hidden md:block" />

            {timelineData.map((node, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                animate={controls}
                variants={{ visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6, delay: 0.1 * idx }}
                className="glass-panel p-6 flex flex-col items-start text-left relative z-10 hover:border-primary/20 transition-all duration-300"
              >
                {/* Year tag */}
                <span className="text-2xl font-black text-primary font-mono mb-3 block text-glow">{node.year}</span>
                <h4 className="text-base font-bold text-white mb-2">{node.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{node.desc}</p>
                
                {/* Visual node anchor point */}
                <div className="absolute -top-3 left-6 md:left-1/2 md:-translate-x-1/2 md:top-[calc(50%+45px)] w-6 h-6 rounded-full bg-[#050816] border border-primary/40 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
