// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import { FiChevronLeft, FiChevronRight, FiMessageSquare } from 'react-icons/fi';
// import { useLanguage } from '../context/LanguageContext';
// import { translations } from '../utils/translations';

// export default function Testimonials() {
//   const { language } = useLanguage();
//   const t = translations[language];
//   const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
//   const [index, setIndex] = useState(0);

//   const testimonials = [
//     {
//       name: 'Rajesh Patel',
//       role: t.test1Role,
//       text: t.test1Quote,
//       metric: t.test1Metric,
//       refCode: 'USER_REF_GJ29',
//     },
//     {
//       name: 'Vikram Rao',
//       role: t.test2Role,
//       text: t.test2Quote,
//       metric: t.test2Metric,
//       refCode: 'USER_REF_AP04',
//     },
//     {
//       name: 'Ananya Sen',
//       role: t.test3Role,
//       text: t.test3Quote,
//       metric: t.test3Metric,
//       refCode: 'USER_REF_WB88',
//     },
//   ];

//   // Auto-slide every 5 seconds
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setIndex((prev) => (prev + 1) % testimonials.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [testimonials.length]);

//   const handlePrev = () => {
//     setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//   };

//   const handleNext = () => {
//     setIndex((prev) => (prev + 1) % testimonials.length);
//   };

//   return (
//     <section id="testimonials" className="relative py-24 md:py-32 w-full overflow-hidden border-t border-white/5 bg-[#050816]/30">
//       <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

//       {/* Background glow highlights */}
//       <div className="absolute w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] left-10 top-10 pointer-events-none" />

//       <div className="max-w-4xl mx-auto px-6 relative z-10 w-full" ref={ref}>
//         {/* Header */}
//         <div className="flex flex-col items-center text-center mb-16">
//           <motion.div
//             initial={{ opacity: 0, y: 15 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6 }}
//             className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold tracking-wider text-primary mb-4"
//           >
//             <span>[{t.testSub}]</span>
//           </motion.div>
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight"
//           >
//             {t.testTitle} <span className="text-primary text-glow font-bold">{t.testTitleHighlight}</span>
//           </motion.h2>
//         </div>

//         {/* Carousel Container */}
//         <div className="relative">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, scale: 0.96 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.96 }}
//               transition={{ duration: 0.4 }}
//               className="glass-panel p-8 sm:p-12 border border-white/5 relative overflow-hidden flex flex-col gap-6"
//             >
//               <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />
//               <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

//               {/* Quotation Icon */}
//               <div className="flex justify-between items-center pb-4 border-b border-white/5">
//                 <FiMessageSquare className="text-primary text-2xl" />
//                 <span className="text-[10px] font-mono text-gray-500 font-semibold">{testimonials[index].refCode}</span>
//               </div>

//               {/* Quote Text */}
//               <p className="text-base sm:text-lg text-gray-300 italic leading-relaxed font-sans">
//                 "{testimonials[index].text}"
//               </p>

//               {/* Author & Stats Grid */}
//               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mt-4 border-t border-white/5 pt-6">
//                 <div>
//                   <h4 className="text-base font-bold text-white tracking-tight">{testimonials[index].name}</h4>
//                   <p className="text-xs text-gray-500 font-mono mt-0.5">{testimonials[index].role}</p>
//                 </div>

//                 <div className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary font-mono text-xs font-bold shadow-neon-glow">
//                   {testimonials[index].metric}
//                 </div>
//               </div>
//             </motion.div>
//           </AnimatePresence>

//           {/* Slider Controllers */}
//           <div className="flex justify-center gap-4 mt-8">
//             <button
//               onClick={handlePrev}
//               className="p-3 rounded-full border border-white/5 hover:border-primary/20 bg-white/5 hover:bg-primary/5 text-gray-400 hover:text-white transition-all duration-300 active:scale-90 cursor-none"
//               aria-label="Previous testimonial"
//             >
//               <FiChevronLeft className="text-lg" />
//             </button>
//             <button
//               onClick={handleNext}
//               className="p-3 rounded-full border border-white/5 hover:border-primary/20 bg-white/5 hover:bg-primary/5 text-gray-400 hover:text-white transition-all duration-300 active:scale-90 cursor-none"
//               aria-label="Next testimonial"
//             >
//               <FiChevronRight className="text-lg" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
