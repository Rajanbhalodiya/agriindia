import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { IoShieldCheckmarkOutline } from 'react-icons/io5';
import { GiDna1, GiMedicines, GiPoisonBottle } from 'react-icons/gi';
import { FiX, FiCheck, FiInfo } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

// 3D Tilt Card Component
function TiltProductCard({ product, onSelect }) {
  const cardRef = useRef(null);
  const { language } = useLanguage();
  const t = translations[language];

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Tilt calculations
    const rotateX = ((centerY - y) / centerY) * 10; 
    const rotateY = ((x - centerX) / centerX) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    
    // Set custom hover glow positions
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <motion.div
      layout
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative glass-panel p-5 flex flex-col justify-between h-[360px] cursor-none overflow-hidden transition-all duration-300 ease-out border border-white/5 hover:border-primary/30 group"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Light spotlight hover circle effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none radial-spotlight" />

      {/* Decorative formula backdrop */}
      <div className="absolute right-2 top-10 font-mono text-[8px] text-gray-700 opacity-25 select-none pointer-events-none">
        {product.code}
      </div>

      <div className="flex flex-col gap-3">
        {/* Category Header */}
        <div className="flex justify-between items-center">
          <span className="text-[9px] font-mono text-accent uppercase tracking-widest">{product.category}</span>
          <span className="text-[8px] font-mono text-gray-500 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
            {product.code}
          </span>
        </div>

        {/* Product Title */}
        <h3 className="text-xl font-bold text-white tracking-tight leading-tight group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h3>
        
        <code className="text-[10px] text-gray-500 font-mono line-clamp-1">{product.formula}</code>
        
        {/* Short Description */}
        <p className="text-xs text-gray-400 font-sans line-clamp-3 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Footer Info / Action */}
      <div className="flex flex-col gap-4 border-t border-white/5 pt-4">
        {/* Features Preview */}
        <div className="flex items-center justify-between">
          {product.keySpecs.slice(0, 2).map((spec, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[10px] text-gray-500 font-mono">
              <FiCheck className="text-primary text-xs" />
              <span>{spec}</span>
            </div>
          ))}
        </div>

        {/* <button
          onClick={() => onSelect(product)}
          className="w-full py-2.5 rounded-lg bg-primary/10 border border-primary/20 hover:border-primary text-primary hover:text-black hover:bg-primary font-bold text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-none"
        >
          <span>{t.analyzeSpecs}</span>
          <FiInfo className="text-sm group-hover/btn:scale-110 transition-transform" />
        </button> */}
      </div>
    </motion.div>
  );
}

export default function Products() {
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeProduct, setActiveProduct] = useState(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const categories = ['all', 'insecticides', 'fungicides', 'herbicides', 'growth regulators'];

  const categoryNames = {
    all: t.catAll,
    insecticides: t.catIns,
    fungicides: t.catFun,
    herbicides: t.catHer,
    'growth regulators': t.catPgr,
  };

  const productsData = t.productsList || [];

  const filteredProducts = selectedCategory === 'all'
    ? productsData
    : productsData.filter(p => p.category === selectedCategory);

  return (
    <section id="products" className="relative py-24 md:py-32 w-full overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

      {/* Decorative Glow spotlight */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] top-1/3 left-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full" ref={ref}>
        
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold tracking-wider text-primary mb-4"
          >
            <span>[{t.prodSub}]</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight"
          >
            {t.prodTitle} <span className="text-primary text-glow">{t.prodTitleHighlight}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 mt-4 max-w-xl text-sm"
          >
            {t.prodDesc}
          </motion.p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-none ${
                selectedCategory === cat
                  ? 'bg-primary text-black border border-primary shadow-neon-glow'
                  : 'bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              {categoryNames[cat]}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <TiltProductCard
                key={product.id}
                product={product}
                onSelect={setActiveProduct}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Product Details Diagnostic Drawer / Modal Overlay */}
        <AnimatePresence>
          {activeProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-6"
            >
              <motion.div
                initial={{ scale: 0.9, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 30, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="w-full max-w-2xl glass-panel border border-primary/20 bg-[#050816]/95 p-8 relative overflow-hidden flex flex-col gap-6"
              >
                {/* Tech background elements */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                {/* Modal Header */}
                <div className="flex justify-between items-start pb-4 border-b border-white/10">
                  <div>
                    <span className="text-xs font-mono text-accent uppercase tracking-widest block mb-1">
                      {activeProduct.category}
                    </span>
                    <h3 className="text-2xl font-extrabold text-white">{activeProduct.name}</h3>
                  </div>
                  <button
                    onClick={() => setActiveProduct(null)}
                    className="p-2 rounded-lg bg-white/5 border border-white/5 hover:border-primary/20 text-gray-400 hover:text-white transition-all duration-300 cursor-none"
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>

                {/* Details Body */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs text-gray-300">
                  <div className="flex flex-col gap-4">
                    <div>
                      <span className="text-gray-500 block mb-1 font-semibold uppercase">// {t.about.toUpperCase()}</span>
                      <p className="text-gray-400 font-sans leading-relaxed">{activeProduct.description}</p>
                    </div>

                    <div>
                      <span className="text-gray-500 block mb-1 font-semibold uppercase">// {t.prodFormula.toUpperCase()}</span>
                      <code className="text-accent text-sm font-bold bg-accent/5 px-2 py-1 rounded border border-accent/10">
                        {activeProduct.formula}
                      </code>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                    <div>
                      <span className="text-gray-500 block mb-1 font-semibold uppercase flex items-center gap-1">
                        <GiMedicines className="text-primary" /> {t.chemComp.toUpperCase()}
                      </span>
                      <p className="text-white font-semibold">{activeProduct.composition}</p>
                    </div>

                    <div>
                      <span className="text-gray-500 block mb-1 font-semibold uppercase flex items-center gap-1">
                        <IoShieldCheckmarkOutline className="text-primary" /> {t.prodDosage.toUpperCase()}
                      </span>
                      <p className="text-white font-semibold">{activeProduct.dosage}</p>
                    </div>

                    <div>
                      <span className="text-gray-500 block mb-1 font-semibold uppercase flex items-center gap-1">
                        <GiPoisonBottle className="text-primary" /> {t.prodToxicity.toUpperCase()}
                      </span>
                      <p className="text-white font-semibold">{activeProduct.toxicity}</p>
                    </div>
                  </div>
                </div>

                {/* Diagnostic Key Features */}
                <div>
                  <span className="text-[10px] font-mono text-gray-500 block mb-2 uppercase tracking-widest">
                    {t.prodKeySpecs.toUpperCase()}
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {activeProduct.keySpecs.map((spec, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-lg border border-white/5 bg-[#050816] flex items-center justify-center text-[10px] text-center font-bold text-gray-400 group"
                      >
                        <span className="text-primary mr-1.5 font-mono font-bold">✓</span>
                        {spec}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Confirm Action button */}
                <div className="flex justify-end gap-4 mt-2">
                  <button
                    onClick={() => setActiveProduct(null)}
                    className="px-6 py-2.5 rounded-lg border border-white/10 hover:border-white/30 text-white font-bold text-xs tracking-wider transition-all duration-300 cursor-none"
                  >
                    {t.closeSpecs.toUpperCase()}
                  </button>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
