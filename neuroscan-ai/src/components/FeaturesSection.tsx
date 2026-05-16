'use client';

import React from 'react';
import { motion } from 'framer-motion';

const doctors = [
  { name: "Dr. Elena Vance", role: "Chief of Neurosurgery", hospital: "Mayo Clinic" },
  { name: "Dr. Marcus Thorne", role: "Neuroradiology Lead", hospital: "Johns Hopkins" },
  { name: "Dr. Sarah Chen", role: "Cognitive Scientist", hospital: "Stanford Medicine" },
];

const features = [
  {
    title: "Voxel-Level Precision",
    description: "Map 4.2 million distinct data points per MRI slice with sub-millimetric accuracy.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 2.944V21m0-18.056L3.382 7.04M12 21l8.618-13.96" />
      </svg>
    )
  },
  {
    title: "AI Diagnostic Engine",
    description: "Trained on real-world cases to detect anomalies invisible to the naked eye.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: "Clinical Portal",
    description: "Seamless handover between patient analysis and medical doctor consultation.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  }
];

const FeaturesSection = () => {
  return (
    <div className="bg-black py-32 md:py-64 relative z-50 overflow-hidden">
      <div className="pro-container">
        
        {/* TRUST SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32 text-center"
        >
          <div className="text-[10px] font-black tracking-[0.5em] text-cyan-400 uppercase mb-8">Clinical Authority</div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-16">
            Trusted by the world's <br />leading neurosurgeons.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {doctors.map((doc, i) => (
              <div key={i} className="glass p-10 rounded-3xl text-left hover:border-white/20 transition-all duration-500 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 mb-6 flex items-center justify-center border border-white/5 group-hover:bg-cyan-400/10 group-hover:border-cyan-400/20 transition-all">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>
                <div className="text-xl font-bold text-white mb-1">{doc.name}</div>
                <div className="text-xs font-medium text-white/50 uppercase tracking-widest mb-4">{doc.role}</div>
                <div className="text-[10px] font-black tracking-[0.2em] text-cyan-400 uppercase">{doc.hospital}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-32 border-t border-white/10">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="flex flex-col items-start"
            >
              <div className="text-cyan-400 mb-8 p-4 bg-white/5 rounded-2xl border border-white/5">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-white/40 leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* FOOTER CALL TO ACTION */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-48 text-center"
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent mx-auto mb-16" />
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-10">
            Advanced diagnostics. <br /><span className="text-white/30 text-2xl md:text-3xl">Available at your fingertips.</span>
          </h2>
          <div className="text-[9px] font-black tracking-[0.4em] text-white/20 uppercase">Version 4.2.0 Core // Deep Discovery Enabled</div>
        </motion.div>

      </div>
    </div>
  );
};

export default FeaturesSection;
