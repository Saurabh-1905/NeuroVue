'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, ShieldAlert, CheckCircle2, FileUp } from 'lucide-react';

interface IntakeZoneProps {
  onSuccess: (image: string) => void;
}

const IntakeZone = ({ onSuccess }: IntakeZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'analyzing' | 'error' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateNeuralAnatomy = async (imageData: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        // 1. Resolution Check (Clinical Minimum)
        if (img.width < 128 || img.height < 128) {
          setErrorMessage("Insufficient resolution for clinical analysis.");
          resolve(false);
          return;
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(true); // Fallback
          return;
        }

        canvas.width = 64; // Low-res sampling for speed
        canvas.height = 64;
        ctx.drawImage(img, 0, 0, 64, 64);
        const data = ctx.getImageData(0, 0, 64, 64).data;

        // 2. Chromatic Saturation Check
        let totalSaturation = 0;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i+1], b = data[i+2];
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          totalSaturation += (max - min);
        }

        const avgSaturation = totalSaturation / (data.length / 4);
        
        // MRI scans are strictly monochromatic. avgSaturation > 20 indicates color.
        if (avgSaturation > 20) {
          setErrorMessage("Anatomical mismatch. Please provide a monochromatic MRI scan.");
          resolve(false);
          return;
        }

        resolve(true);
      };
      img.src = imageData;
    });
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      triggerError("Anatomical mismatch detected. Please provide a cranial MRI scan.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      startUpload(imageData);
    };
    reader.onerror = () => triggerError("Failed to process neural data.");
    reader.readAsDataURL(file);
  };

  const startUpload = async (imageData: string) => {
    setStatus('uploading');
    
    // Step 1: Simulated Upload
    await new Promise(r => setTimeout(r, 2000));
    
    // Step 2: Advanced Anatomical Verification
    setStatus('analyzing');
    await new Promise(r => setTimeout(r, 1500));
    const isValid = await validateNeuralAnatomy(imageData);
    
    if (!isValid) {
      setStatus('error');
      return;
    }

    setStatus('success');
    setTimeout(() => {
      onSuccess(imageData);
    }, 1500);
  };

  const triggerError = (msg: string) => {
    setStatus('error');
    setErrorMessage(msg);
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="relative z-20"
      >
        <motion.div
          animate={status === 'error' ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className={`
            relative w-[600px] aspect-video glass rounded-3xl p-12 flex flex-col items-center justify-center gap-6 
            transition-all duration-700 overflow-hidden cursor-pointer
            ${isDragging ? 'border-cyan-400/50 bg-cyan-400/10' : 'border-white/10'}
            ${status === 'error' ? 'border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.2)]' : ''}
          `}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
          }}
          onClick={() => status === 'idle' && fileInputRef.current?.click()}
        >
          {/* Hidden File Input for Browsing */}
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
          {/* Cyan Scan Line during Upload */}
          <AnimatePresence>
            {status === 'uploading' && <div className="scan-line" />}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {status === 'idle' && (
              <motion.div 
                key="idle"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 mb-4 animate-pulse">
                  <FileUp className="text-cyan-400" size={32} />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">THE INTAKE VOID</h2>
                <p className="text-white/40 max-w-sm text-sm">
                  Relinquish your biological data for analysis. Drag high-fidelity MRI scans or <span className="text-cyan-400 underline decoration-cyan-400/30 underline-offset-4">click to browse</span>.
                </p>
              </motion.div>
            )}

            {status === 'uploading' && (
              <motion.div 
                key="uploading"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="text-cyan-400 text-sm font-bold tracking-[0.4em] animate-pulse">
                  AUTHENTICATING BIOLOGICAL DATA...
                </div>
                <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3 }}
                    className="h-full bg-cyan-400 shadow-[0_0_15px_rgba(0,242,255,0.5)]"
                  />
                </div>
              </motion.div>
            )}

            {status === 'analyzing' && (
              <motion.div 
                key="analyzing"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="text-cyan-400 text-sm font-bold tracking-[0.4em] animate-pulse">
                  SCANNING NEURAL SIGNATURE...
                </div>
                <div className="text-[10px] text-white/30 uppercase tracking-widest">
                  Verifying anatomical alignment & chromatic consistency
                </div>
                <div className="flex gap-1 mt-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div 
                key="error"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4 text-center px-6"
              >
                <ShieldAlert className="text-red-500 mb-2" size={48} />
                <h2 className="text-red-500 font-bold uppercase tracking-widest">Validation Failed</h2>
                <p className="text-red-500/60 text-xs leading-relaxed max-w-sm">
                  {errorMessage}
                </p>
              </motion.div>
            )}

            {status === 'success' && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4"
              >
                <CheckCircle2 className="text-cyan-400 mb-2" size={48} />
                <div className="text-cyan-400 text-sm font-bold tracking-[0.4em]">
                  SCAN AUTHENTICATED.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Decorative background glow */}
        <div className="absolute -inset-20 bg-cyan-500/5 blur-[100px] -z-10 rounded-full" />
      </motion.div>
    </div>
  );
};

export default IntakeZone;
