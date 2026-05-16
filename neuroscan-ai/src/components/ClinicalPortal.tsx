'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, ClipboardList, TrendingUp, CheckCircle2, PenTool } from 'lucide-react';

const ClinicalPortal = ({ scanResult }: { scanResult: any }) => {
  const [signed, setSigned] = useState(false);
  const [biopsyRequested, setBiopsyRequested] = useState(false);
  const [referralSent, setReferralSent] = useState(false);

  return (
    <div className="min-h-screen py-32 px-8 flex flex-col items-center">
      <div className="max-w-6xl w-full grid grid-cols-12 gap-8">
        
        {/* Physician Workbench */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="glass rounded-[40px] p-8 flex-1">
            <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-cyan-400 mb-8 flex items-center gap-2">
               <Stethoscope size={14} /> Medical Review
            </h3>
            
            <div className="space-y-8">
               <div>
                  <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-3">Attending Physician</div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10" />
                    <div className="text-sm font-bold">Dr. Elena Sterling</div>
                  </div>
               </div>

               <div>
                  <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-3">Clinical Assessment</div>
                  <div className="text-xs leading-relaxed text-white/60 bg-white/5 p-4 rounded-2xl border border-white/5 italic">
                    "Initial AI findings are consistent with Parietal Lobe metabolic shift. Neural density variance ({scanResult?.density || 1.24} g/cm³) warrants a contrast-enhanced follow-up scan."
                  </div>
               </div>

               <div className="pt-8 mt-8 border-t border-white/5">
                 <button 
                   onClick={() => setSigned(true)}
                   disabled={signed}
                   className={`w-full py-4 rounded-2xl text-[10px] font-bold tracking-[0.3em] uppercase transition-all flex items-center justify-center gap-2 ${
                     signed ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'glass hover:bg-white/10'
                   }`}
                 >
                   {signed ? <><CheckCircle2 size={14}/> Verified & Signed</> : <><PenTool size={14}/> Execute Digital Signature</>}
                 </button>
               </div>
            </div>
          </div>
        </div>

        {/* Population Analytics */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
          <div className="glass rounded-[40px] p-12 flex-1">
             <div className="flex justify-between items-start mb-12">
               <div>
                 <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-white/40 mb-2">Population Normals</h3>
                 <h2 className="text-3xl font-black uppercase">Comparative Analytics</h2>
               </div>
               <TrendingUp className="text-cyan-400" size={32} />
             </div>

             <div className="space-y-12">
                {[
                  { label: "Hippocampal Volume", patient: 84, normal: 92 },
                  { label: "Confidence Alignment", patient: scanResult?.confidence || 94, normal: 90 },
                  { label: "Voxel Dispersion", patient: 94, normal: 88 }
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase mb-4 text-white/40">
                      <span>{stat.label}</span>
                      <span className="text-white">{stat.patient}% <span className="text-white/20">//</span> AVG: {stat.normal}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.patient}%` }}
                        transition={{ duration: 1, delay: i * 0.2 }}
                        className={`h-full rounded-full ${stat.patient < stat.normal ? 'bg-red-500/50' : 'bg-cyan-500/50'}`}
                      />
                      <div className="absolute top-0 bottom-0 w-[2px] bg-white/20 left-[${stat.normal}%]" style={{ left: `${stat.normal}%` }} />
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
             <div 
               onClick={() => setBiopsyRequested(true)}
               className={`glass rounded-3xl p-8 flex items-center gap-4 group cursor-pointer transition-all ${
                 biopsyRequested ? 'bg-orange-500/20 border-orange-500/50' : 'hover:bg-white/5 border-white/5'
               }`}
             >
                <ClipboardList className={biopsyRequested ? 'text-orange-400' : 'text-cyan-400'} size={24} />
                <div className={`text-[10px] font-bold tracking-widest uppercase ${biopsyRequested ? 'text-orange-400' : ''}`}>
                  {biopsyRequested ? 'Lab Request Sent' : 'Request Biopsy'}
                </div>
             </div>
             
             <div 
               onClick={() => setReferralSent(true)}
               className={`glass rounded-3xl p-8 flex items-center gap-4 group cursor-pointer transition-all ${
                 referralSent ? 'bg-green-500/20 border-green-500/50' : 'hover:bg-white/5 border-white/5'
               }`}
             >
                <CheckCircle2 className={referralSent ? 'text-green-400' : 'text-cyan-400'} size={24} />
                <div className={`text-[10px] font-bold tracking-widest uppercase ${referralSent ? 'text-green-400' : ''}`}>
                  {referralSent ? 'Physician Synced' : 'Sync Referral'}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicalPortal;
