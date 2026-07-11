import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiSearch, FiInfo, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { productsData } from '../data/products';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

// 3D Tilt Card Component for Products Page
function ProductCard({ product, onSelect }) {
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

    const rotateX = ((centerY - y) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
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
      {/* Glow Follow spotlight */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none radial-spotlight" />

      {/* Decorative text */}
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

        {/* Product Image Frame */}
        <div className="w-full h-36 bg-[#03050c]/80 rounded-xl border border-white/5 overflow-hidden flex items-center justify-center relative p-3">
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://agriindia.co/images/agri-india-site-logo.webp';
            }}
            className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Product Title */}
        <h3 className="text-lg font-bold text-white tracking-tight leading-tight group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h3>

        {/* Chemical Composition */}
        <p className="text-xs text-glow font-mono text-primary font-semibold line-clamp-2">
          {product.composition || 'Standard Eco Formula'}
        </p>
      </div>

      {/* Action Footer */}
      <div className="border-t border-white/5 pt-4">
        <button
          onClick={() => onSelect(product)}
          className="w-full py-2.5 rounded-lg bg-primary/10 border border-primary/20 hover:border-primary text-primary hover:text-black hover:bg-primary font-bold text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-none"
        >
          <span>{t.analyzeSpecs}</span>
          <FiInfo className="text-sm" />
        </button>
      </div>
    </motion.div>
  );
}

export default function ProductsPage({ onBack }) {
  const { language } = useLanguage();
  const t = translations[language];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeProduct, setActiveProduct] = useState(null);

  const categories = ['all', 'insecticides', 'fungicides', 'herbicides', 'growth regulators'];

  const categoryNames = {
    all: t.catAll,
    insecticides: t.catIns,
    fungicides: t.catFun,
    herbicides: t.catHer,
    'growth regulators': t.catPgr,
  };

  const filteredProducts = productsData.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.composition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOrderWhatsApp = (product) => {
    const phone = '9510459100';
    const message = encodeURIComponent(`Hello Agri India, I would like to inquire about:
Product: ${product.name}
Composition: ${product.composition}
Category: ${product.category}`);
    window.open(`https://wa.me/91${phone}?text=${message}`, '_blank');
  };

  return (
    <div className={`relative min-h-screen w-full pt-32 pb-24 px-6 overflow-x-hidden ${activeProduct ? 'z-50' : 'z-20'}`}>
      {/* Background cyber grid */}
      <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />

      {/* Decorative Blur Spheres */}
      <div className="absolute w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] top-10 left-10 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] bottom-10 right-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10 w-full">

        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
          <div className="flex flex-col items-start gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-xs font-bold tracking-widest text-primary border border-primary/20 bg-primary/5 rounded-full px-4 py-2 hover:bg-primary hover:text-black hover:border-primary hover:shadow-neon-glow transition-all duration-300 cursor-none"
            >
              <FiArrowLeft className="text-sm" />
              <span>{t.returnHome.toUpperCase()}</span>
            </button>
            <div>
              <span className="text-xs font-mono text-accent uppercase tracking-widest">{t.portalSub}</span>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-2 leading-none">
                {t.portalTitle} <span className="text-primary text-glow">{t.portalTitleHighlight}</span>
              </h1>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-sans text-xs outline-none transition-all duration-300 focus:border-primary focus:bg-white/10 focus:shadow-neon-glow cursor-none"
            />
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
          </div>
        </div>

        {/* Categories Selectors */}
        <div className="flex flex-wrap gap-2.5 items-center justify-center sm:justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-none ${selectedCategory === cat
                ? 'bg-primary text-black border border-primary shadow-neon-glow'
                : 'bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:border-white/10'
                }`}
            >
              {categoryNames[cat]}
            </button>
          ))}
        </div>

        {/* Counter Info */}
        <div className="text-xs font-mono text-gray-500 flex justify-between items-center border-b border-white/5 pb-4">
          <span>{t.showingCount} {filteredProducts.length} {t.activeCompounds} {productsData.length}</span>
          <span>DATABASE_VER: 1.04</span>
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={`${product.name}-${idx}`}
                product={product}
                onSelect={setActiveProduct}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="glass-panel p-12 text-center flex flex-col items-center justify-center border border-white/5">
            <span className="text-lg text-gray-500 font-mono mb-2">{t.noFormulasFound}</span>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
              className="text-xs text-primary font-mono underline hover:text-white cursor-none"
            >
              {t.resetFilters.toUpperCase()}
            </button>
          </div>
        )}

        {/* Details Diagnostic Popup Modal */}
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
                className="w-full max-w-2xl glass-panel border border-primary/25 bg-[#050816]/95 p-5 md:p-8 relative overflow-y-auto overflow-x-hidden max-h-[90vh] flex flex-col gap-5 md:gap-6"
              >
                {/* Background glows */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none" />

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
                    className="p-2 rounded-lg bg-white/5 border border-white/5 hover:border-primary/20 text-gray-400 hover:text-white transition-all duration-300 cursor-none relative z-10"
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>

                {/* Details Body */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 font-mono text-xs text-gray-300">
                  {/* Left Column: Image and Formula */}
                  <div className="flex flex-col gap-4">
                    <div className="w-full h-44 bg-[#03050c]/80 rounded-xl border border-white/5 flex items-center justify-center p-4">
                      <img
                        src={activeProduct.image}
                        alt={activeProduct.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://agriindia.co/images/agri-india-site-logo.webp';
                        }}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <div>
                      <span className="text-gray-500 block mb-1 font-semibold uppercase">{t.prodCode}</span>
                      <code className="text-accent text-sm font-bold bg-accent/5 px-2.5 py-1.5 rounded border border-accent/10 block w-max">
                        {activeProduct.code}
                      </code>
                    </div>
                  </div>

                  {/* Right Column: Spec sheet */}
                  <div className="flex flex-col gap-4 bg-white/5 p-5 rounded-xl border border-white/5">
                    <div>
                      <span className="text-gray-500 block mb-1 font-semibold uppercase">{t.chemComp}</span>
                      <p className="text-white text-sm font-semibold">{activeProduct.composition || 'Proprietary Blend'}</p>
                    </div>

                    <div>
                      <span className="text-gray-500 block mb-1 font-semibold uppercase">{t.appDosage}</span>
                      <p className="text-gray-400 font-sans leading-relaxed">
                        {t.dosageDesc}
                      </p>
                    </div>

                    <div>
                      <span className="text-gray-500 block mb-1 font-semibold uppercase">{t.safetyRating}</span>
                      <p className="text-primary font-bold uppercase">{t.safetyDesc}</p>
                    </div>
                  </div>
                </div>

                {/* Confirm Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2 border-t border-white/5 pt-4">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest text-center sm:text-left">
                    {t.comPortSecure}
                  </span>

                  <div className="flex gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => setActiveProduct(null)}
                      className="px-5 py-2.5 rounded-lg border border-white/10 hover:border-white/30 text-white font-bold text-xs tracking-wider transition-all duration-300 cursor-none flex-grow sm:flex-grow-0"
                    >
                      {t.closeSpecs}
                    </button>

                    <button
                      onClick={() => handleOrderWhatsApp(activeProduct)}
                      className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-neon-glow cursor-none flex-grow sm:flex-grow-0"
                    >
                      <FaWhatsapp className="text-sm" />
                      <span>{t.orderWhatsApp}</span>
                    </button>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
