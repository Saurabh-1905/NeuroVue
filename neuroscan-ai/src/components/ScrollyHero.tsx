'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollyHero = ({ setPhase }: { setPhase: (phase: any) => void }) => {
  const { scrollYProgress } = useScroll();

  const opacityA = useTransform(scrollYProgress, [0, 0.05, 0.15, 0.2], [0, 1, 1, 0]);
  const scaleA = useTransform(scrollYProgress, [0, 0.2], [1.2, 1]);
  const xA = useTransform(scrollYProgress, [0, 0.2], [-50, 0]);
  
  const opacityB = useTransform(scrollYProgress, [0.25, 0.3, 0.4, 0.45], [0, 1, 1, 0]);
  const scaleB = useTransform(scrollYProgress, [0.25, 0.45], [0.9, 1]);
  const xB = useTransform(scrollYProgress, [0.25, 0.45], [-50, 0]);

  const opacityC = useTransform(scrollYProgress, [0.5, 0.55, 0.65, 0.7], [0, 1, 1, 0]);
  const scaleC = useTransform(scrollYProgress, [0.5, 0.7], [0.9, 1]);
  const xC = useTransform(scrollYProgress, [0.5, 0.7], [-50, 0]);

  const opacityD = useTransform(scrollYProgress, [0.75, 0.8, 0.95, 0.99, 1], [0, 1, 1, 1, 0]);
  const scaleD = useTransform(scrollYProgress, [0.75, 1], [0.95, 1]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 flex items-center">
      <div className="pro-container h-full relative w-full flex items-center">
        
        {/* Beat A: Neural Precision */}
        <motion.section 
          className="absolute flex flex-col items-start text-left"
          style={{ opacity: opacityA, scale: scaleA, x: xA }}
        >
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white leading-none mb-6">
            NEURAL<br />PRECISION
          </h1>
          <p className="text-xs md:text-sm font-bold tracking-[0.5em] text-cyan-400 uppercase">
            Mapping the architecture of thought
          </p>
        </motion.section>

        {/* Beat B: Diagnostic Depth */}
        <motion.section 
          className="absolute flex flex-col items-start text-left"
          style={{ opacity: opacityB, scale: scaleB, x: xB }}
        >
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white leading-none mb-6">
            DIAGNOSTIC<br />DEPTH
          </h1>
          <p className="text-xs md:text-sm font-bold tracking-[0.5em] text-cyan-400 uppercase">
            Clinical-grade neural visualization
          </p>
        </motion.section>

        {/* Beat C: Quantum Analysis */}
        <motion.section 
          className="absolute flex flex-col items-start text-left"
          style={{ opacity: opacityC, scale: scaleC, x: xC }}
        >
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white leading-none mb-6">
            QUANTUM<br />ANALYSIS
          </h1>
          <p className="text-xs md:text-sm font-bold tracking-[0.5em] text-cyan-400 uppercase">
            Benchmarked against 4.2M cases
          </p>
        </motion.section>

        {/* Beat D: Clarity Defined */}
        <div className="absolute inset-0 flex flex-col items-center justify-center w-full">
          <motion.section 
            className="w-full pro-container flex flex-col items-start text-left absolute"
            style={{ opacity: opacityD, scale: scaleD }}
          >
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white leading-none mb-4">
              CLARITY<br />DEFINED
            </h1>
            <p className="text-xs md:text-sm font-bold tracking-[0.5em] text-white/30 uppercase">
              The next era of diagnostics
            </p>
          </motion.section>

          <motion.div 
            style={{ opacity: opacityD }}
            className="mt-64 md:mt-80"
          >
            <motion.button 
              onClick={() => setPhase('intake')}
              whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/90 text-black px-16 py-6 rounded-full text-[10px] font-black tracking-[0.3em] uppercase pointer-events-auto transition-all shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/20"
            >
              Initiate Neural Scan
            </motion.button>
          </motion.div>
        </div>

        {/* Static Bottom Detail */}
        <div className="absolute bottom-16 inset-x-0 flex flex-col items-center opacity-20 transition-opacity hover:opacity-100 duration-1000">
           <div className="w-px h-12 bg-white/40 mb-4" />
           <div className="text-[9px] font-black tracking-[0.6em] uppercase">Scroll to begin assessment</div>
        </div>
      </div>
    </div>
  );
};

export default ScrollyHero;
