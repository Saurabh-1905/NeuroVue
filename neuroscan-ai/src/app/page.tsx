'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NeuralCanvas from '@/components/NeuralCanvas';
import ScrollyHero from '@/components/ScrollyHero';
import IntakeZone from '@/components/IntakeZone';
import DiagnosticDashboard from '@/components/DiagnosticDashboard';
import NeuroReport from '@/components/NeuroReport';
import SynapseAssistant from '@/components/SynapseAssistant';
import ClinicalPortal from '@/components/ClinicalPortal';
import FeaturesSection from '@/components/FeaturesSection';

export type ScanResult = {
  confidence: number;
  density: number;
  anomalyDetected: boolean;
  timestamp: string;
};

export default function Home() {
  const [phase, setPhase] = useState<'landing' | 'intake' | 'analysis' | 'report' | 'portal'>('landing');
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // Transitions after certain scroll or action
  const handleIntakeSuccess = (image: string) => {
    const newResult: ScanResult = {
      confidence: Number((88 + Math.random() * 11).toFixed(1)),
      density: Number((1.1 + Math.random() * 0.3).toFixed(2)),
      anomalyDetected: true,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    
    setScanResult(newResult);
    setUploadedImage(image);
    setPhase('analysis');
    setTimeout(() => {
      setPhase('report');
    }, 5000);
  };

  return (
    <main className="relative min-h-screen bg-black selection:bg-cyan-500/30">
      {/* Background Starfield */}
      <div className="nexus-void" />

      {/* Persistent Navigation */}
      <nav className="fixed top-0 w-full p-6 md:p-10 flex justify-between items-center z-[110] transition-all duration-700">
        <div className="flex items-center gap-6 group cursor-pointer" onClick={() => setPhase('landing')}>
          <div className="w-10 h-10 rounded-2xl glass flex items-center justify-center border border-white/5 group-hover:border-cyan-400/30 transition-all duration-500">
            <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(0,242,255,0.8)]" />
          </div>
          <span className="text-xs font-medium tracking-[0.4em] uppercase text-white/50 group-hover:text-white transition-colors duration-500">Neurascan AI</span>
        </div>
        
        <div className="hidden md:flex gap-16 text-[10px] font-medium tracking-[0.3em] text-white/30 uppercase">
          <button onClick={() => setPhase('landing')} className={`transition-all duration-500 ${phase === 'landing' ? 'text-white' : 'hover:text-white/60'}`}>The Nexus</button>
          <button onClick={() => setPhase('portal')} className={`transition-all duration-500 ${phase === 'portal' ? 'text-white' : 'hover:text-white/60'}`}>Clinical Portal</button>
        </div>

        <button 
          onClick={() => setPhase('intake')}
          className="glass px-8 py-3 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-white text-white hover:text-black transition-all duration-500 active:scale-95"
        >
          {phase === 'landing' ? 'Initiate Scan' : 'System Active'}
        </button>
      </nav>

      <AnimatePresence mode="wait">
        {phase === 'landing' && (
          <motion.div 
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <NeuralCanvas />
            {/* Pass setPhase to ScrollyHero if needed, but for now it's globally handled */}
            <ScrollyHero setPhase={setPhase} />
            <FeaturesSection />
          </motion.div>
        )}

        {phase === 'intake' && (
          <motion.div 
            key="intake"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-50"
          >
            <IntakeZone onSuccess={handleIntakeSuccess} />
          </motion.div>
        )}

        {phase === 'analysis' && (
          <motion.div 
            key="analysis"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="relative z-50"
          >
            <DiagnosticDashboard scanResult={scanResult} uploadedImage={uploadedImage} />
          </motion.div>
        )}

        {phase === 'report' && (
          <motion.div 
            key="report"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="relative z-50"
          >
            <NeuroReport scanResult={scanResult} uploadedImage={uploadedImage} />
          </motion.div>
        )}

        {phase === 'portal' && (
          <motion.div 
            key="portal"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-50"
          >
            <ClinicalPortal scanResult={scanResult} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Precision Footer */}
      <footer className="fixed bottom-0 w-full p-10 flex justify-between items-center z-[90] pointer-events-none">
        <div className="text-[8px] font-medium tracking-[0.5em] text-white/10 uppercase">Precision MRI // V4.2.0</div>
        <div className="text-[8px] font-medium tracking-[0.5em] text-white/10 uppercase">© 2026 NeuroScan Global Group</div>
      </footer>

      {/* AI Assistant */}
      <SynapseAssistant scanResult={scanResult} phase={phase} />
    </main>
  );
}
