'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Server, Terminal, Globe, ChevronRight } from 'lucide-react';

const SecurityShield = () => {
  const [logs, setLogs] = useState<{ id: number; hash: string; status: string; node: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => [
        { 
          id: Date.now(), 
          hash: Math.random().toString(16).substring(2, 10).toUpperCase(),
          status: "VERIFIED",
          node: ["HOSP-NYC-01", "HOSP-SFO-42", "CORE-LDN-09"][Math.floor(Math.random() * 3)]
        },
        ...prev.slice(0, 5)
      ]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen py-32 px-8 flex flex-col items-center">
      <div className="max-w-6xl w-full grid grid-cols-12 gap-8">
        
        {/* Main Shield Visualization */}
        <div className="col-span-12 lg:col-span-8 glass rounded-[40px] p-12 relative overflow-hidden flex flex-col items-center justify-center">
           <div className="absolute inset-0 nexus-void opacity-50" />
           <motion.div 
             animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
             transition={{ duration: 4, repeat: Infinity }}
             className="w-48 h-48 rounded-full border border-cyan-400/30 flex items-center justify-center relative"
           >
              <Shield className="text-cyan-400" size={64} />
              <div className="absolute inset-0 border-2 border-cyan-400/10 rounded-full animate-ping" />
           </motion.div>
           
           <h2 className="text-3xl font-black mt-8 text-glow uppercase tracking-widest">Quantum Ledger Active</h2>
           <p className="text-white/40 text-sm mt-2 tracking-widest">AES-256 ENCRYPTED // END-TO-END DECENTRALIZED</p>

           <div className="mt-12 grid grid-cols-3 gap-8 w-full">
              {[
                { label: "Integrity", icon: lock, val: "100%" },
                { label: "Nodes", icon: globe, val: "128 Active" },
                { label: "Hash", icon: terminal, val: "SHA-512" }
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-[10px] uppercase tracking-widest text-white/20 mb-1">{stat.label}</div>
                  <div className="text-sm font-bold text-cyan-400">{stat.val}</div>
                </div>
              ))}
           </div>
        </div>

        {/* Live Ledger Log */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
          <div className="glass rounded-[40px] p-8 flex-1 flex flex-col">
            <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-white/60 mb-6 flex items-center gap-2">
               <Server size={14} className="text-cyan-400" /> Live Verification
            </h3>
            
            <div className="flex-1 space-y-4">
              <AnimatePresence>
                {logs.map(log => (
                  <motion.div 
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-1"
                  >
                    <div className="flex justify-between items-center text-[10px] font-mono">
                       <span className="text-cyan-400/50">BLOCK {log.hash}</span>
                       <span className="text-green-400">● {log.status}</span>
                    </div>
                    <div className="text-[10px] text-white/30 uppercase tracking-widest">NODE: {log.node}</div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <button className="glass rounded-3xl p-6 text-xs font-bold tracking-widest uppercase hover:bg-white/5 transition-colors flex items-center justify-between group">
             System Access Records
             <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

const globe = Globe;
const lock = Lock;
const terminal = Terminal;

export default SecurityShield;
