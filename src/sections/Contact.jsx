import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiSend, FiMail, FiPhone, FiMapPin, FiLinkedin, FiTwitter, FiYoutube } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

export default function Contact() {
  const { language } = useLanguage();
  const t = translations[language];
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const phone = '9510459100';
    const messageText = `Hello Agri India,
Name: ${formData.name}
Email: ${formData.email}
Message: ${formData.message}`;

    const whatsappUrl = `https://wa.me/91${phone}?text=${encodeURIComponent(messageText)}`;

    setSubmitted(true);
    window.open(whatsappUrl, '_blank');

    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 1000);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 w-full overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

      {/* Background glow highlights */}
      <div className="absolute w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -left-20 bottom-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full" ref={ref}>
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold tracking-wider text-primary mb-4"
          >
            <span>[{t.contactSub}]</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight"
          >
            {t.contactTitle} <span className="text-primary text-glow">{t.contactTitleHighlight}</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6"
          >
            <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 border border-white/5 relative overflow-hidden flex flex-col gap-6">
              <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

              <div>
                <h3 className="text-xl font-bold text-white mb-2">{t.contact}</h3>
                <p className="text-xs text-gray-500 font-mono">ENCRYPTED D-LINK CHANNEL // ON</p>
              </div>

              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{t.operatorName}</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rajesh Patel"
                  className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-sans text-sm outline-none transition-all duration-300 focus:border-primary focus:bg-white/10 cursor-none"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{t.commAddress}</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. rajesh@farm.in"
                  className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-sans text-sm outline-none transition-all duration-300 focus:border-primary focus:bg-white/10 cursor-none"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{t.msgPayload}</label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Enter details here..."
                  className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-sans text-sm outline-none transition-all duration-300 focus:border-primary focus:bg-white/10 resize-none cursor-none"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-bold tracking-wider text-xs transition-all duration-300 flex items-center justify-center gap-2 shadow-neon-glow active:scale-95 cursor-none"
              >
                <span>{t.transmitBtn}</span>
                <FaWhatsapp className="text-sm" />
              </button>

              {/* Submitted Alert */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-center text-xs text-primary font-mono"
                >
                  ✓ {t.loadingTransmit}
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Right Column: High-tech Info & SVG India Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col gap-8"
          >
            {/* Coordinates / Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-panel p-5 border border-white/5 flex flex-col gap-2">
                <span className="text-[9px] font-mono text-gray-500">COMMUNICATIONS</span>
                <div className="flex items-center gap-2 text-sm text-white font-semibold">
                  <FiMail className="text-primary" />
                  <span>support@agriindia.tech</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white font-semibold mt-1">
                  <FiPhone className="text-primary" />
                  <span>+91 95104 59100</span>
                </div>
              </div>

              <div className="glass-panel p-5 border border-white/5 flex flex-col gap-2">
                <span className="text-[9px] font-mono text-gray-500">HEADQUARTERS LAB</span>
                <div className="flex items-start gap-2 text-sm text-white font-semibold leading-relaxed">
                  <FiMapPin className="text-primary mt-1 flex-shrink-0" />
                  <span>{t.contactAddress}</span>
                </div>
              </div>
            </div>

            {/* Regional Research Networks Telemetry Panel */}
            <div className="glass-panel p-6 border border-white/5 relative overflow-hidden flex flex-col justify-between h-[380px] md:h-[400px]">
              <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
              <div>
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{t.regionalNetworks}</p>
                <h4 className="text-sm font-bold text-white mt-1">{t.stationTelemetry}</h4>
              </div>

              {/* Status grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow py-4">
                {/* Rajkot */}
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex flex-col justify-between relative group hover:border-primary/20 transition-all duration-300">
                  <div className="flex justify-between items-start font-mono mb-2">
                    <span className="text-white font-bold text-[10px]">RAJKOT [HQ]</span>
                    <span className="text-primary text-[8px] animate-pulse">● CORE // ONLINE</span>
                  </div>
                  <div className="font-mono text-[9px] text-gray-500 flex flex-col gap-0.5">
                    <span>COORDS: 22.30° N / 70.80° E</span>
                    <span>FUNCTION: {t.funcRajkot}</span>
                  </div>
                </div>

                {/* Ahmedabad */}
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex flex-col justify-between relative group hover:border-accent/20 transition-all duration-300">
                  <div className="flex justify-between items-start font-mono mb-2">
                    <span className="text-white font-bold text-[10px]">AHMEDABAD</span>
                    <span className="text-accent text-[8px] animate-pulse">● SECURE // SYNCED</span>
                  </div>
                  <div className="font-mono text-[9px] text-gray-500 flex flex-col gap-0.5">
                    <span>COORDS: 23.02° N / 72.57° E</span>
                    <span>FUNCTION: {t.funcAhmedabad}</span>
                  </div>
                </div>

                {/* New Delhi */}
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex flex-col justify-between relative group hover:border-primary/20 transition-all duration-300">
                  <div className="flex justify-between items-start font-mono mb-2">
                    <span className="text-white font-bold text-[10px]">NEW DELHI</span>
                    <span className="text-primary text-[8px] animate-pulse">● SATELLITE // ACTIVE</span>
                  </div>
                  <div className="font-mono text-[9px] text-gray-500 flex flex-col gap-0.5">
                    <span>COORDS: 28.61° N / 77.20° E</span>
                    <span>FUNCTION: {t.funcDelhi}</span>
                  </div>
                </div>

                {/* Bangalore */}
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex flex-col justify-between relative group hover:border-accent/20 transition-all duration-300">
                  <div className="flex justify-between items-start font-mono mb-2">
                    <span className="text-white font-bold text-[10px]">BANGALORE</span>
                    <span className="text-accent text-[8px] animate-pulse">● LOGISTICS // ACTIVE</span>
                  </div>
                  <div className="font-mono text-[9px] text-gray-500 flex flex-col gap-0.5">
                    <span>COORDS: 12.97° N / 77.59° E</span>
                    <span>FUNCTION: {t.funcBangalore}</span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="flex justify-center gap-6 border-t border-white/5 pt-4">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-primary transition-all duration-300 cursor-none flex items-center gap-1.5 text-xs font-mono">
                  <FiLinkedin />
                  <span>LINKEDIN</span>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-primary transition-all duration-300 cursor-none flex items-center gap-1.5 text-xs font-mono">
                  <FiTwitter />
                  <span>X.COM</span>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-primary transition-all duration-300 cursor-none flex items-center gap-1.5 text-xs font-mono">
                  <FiYoutube />
                  <span>YOUTUBE</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
