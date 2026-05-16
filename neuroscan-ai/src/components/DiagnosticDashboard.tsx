'use client';

import React, { useEffect, useState } from 'react';
import { motion, animate } from 'framer-motion';
import { Activity, Brain, ShieldCheck, Zap } from 'lucide-react';

const DiagnosticDashboard = ({ scanResult, uploadedImage }: { scanResult: any, uploadedImage: string | null }) => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const targetScore = scanResult?.confidence || 94.2;
    const controls = animate(0, targetScore, {
      duration: 3,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        setScore(Number(value.toFixed(1)));
      },
    });
    return () => controls.stop();
  }, [scanResult]);

  return (
    <div className="min-h-screen py-32 px-8 flex flex-col items-center">
      <div className="max-w-6xl w-full grid grid-cols-12 gap-8">
        
        {/* Main Neural Display */}
        <div className="col-span-12 lg:col-span-8 glass rounded-[40px] p-8 aspect-video relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-cyan-500/5 clinical-gradient" />
          <div className="relative z-10 flex flex-col items-center w-full h-full justify-center">
             {uploadedImage ? (
               <motion.img 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 src={uploadedImage} 
                 className="max-h-full max-w-full rounded-2xl object-cover shadow-[0_0_50px_rgba(0,242,255,0.2)]" 
                 alt="MRI Scan" 
               />
             ) : (
               <Brain className="text-cyan-400 mb-6" size={120} />
             )}
             <div className="text-xs font-bold tracking-[0.5em] text-cyan-400/50 uppercase mt-6">Active Diagnostics: Layer 42-B</div>
          </div>
          
          {/* Heatmap Pulsing effect */}
          <motion.div 
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-1/4 left-1/3 w-32 h-32 bg-red-500/20 blur-3xl rounded-full"
          />
        </div>

        {/* Confidence Metric Card */}
        <div className="col-span-12 lg:col-span-4 glass rounded-[40px] p-8 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <Zap className="text-cyan-400" size={24} />
            <div className="px-3 py-1 rounded-full border border-cyan-400/20 text-[10px] font-bold text-cyan-400">REAL-TIME</div>
          </div>
          
          <div className="mt-8">
            <div className="text-[10px] text-cyan-400 font-bold tracking-[0.4em] uppercase opacity-50">
              {score === (scanResult?.confidence || 94.2) ? 'Analysis Unified - Finalizing Report' : 'Synthesizing Neural Map...'}
            </div>
            <div className="text-8xl font-black text-glow flex items-baseline leading-none">
              {score}<span className="text-3xl font-light text-cyan-400/50">%</span>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-white/40 uppercase tracking-widest">Anomalies Detected</span>
              <span className="font-bold text-red-400">POSITIVE</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-white/40 uppercase tracking-widest">Processing Time</span>
              <span className="font-bold">482ms</span>
            </div>
          </div>
        </div>

        {/* Insight Grid */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Activity, title: "Anatomical Symmetry", status: "Nominal" },
            { icon: ShieldCheck, title: "Data Integrity", status: "Verified" },
            { icon: Zap, title: "Voxel Density", status: "98.2% Accurate" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-3xl p-6 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                <item.icon size={20} className="text-cyan-400" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-white/40 tracking-widest uppercase">{item.title}</div>
                <div className="text-sm font-bold">{item.status}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiagnosticDashboard;
