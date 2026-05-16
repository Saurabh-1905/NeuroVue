'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, ExternalLink, ShieldAlert } from 'lucide-react';
import { jsPDF } from 'jspdf';

const NeuroReport = ({ scanResult, uploadedImage }: { scanResult: any, uploadedImage: string | null }) => {
  const [isCompiling, setIsCompiling] = useState(false);

  const getBase64ImageFromURL = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/webp');
        resolve(dataURL);
      };
      img.onerror = error => reject(error);
      img.src = url;
    });
  };

  const handleDownload = async () => {
    setIsCompiling(true);
    
    try {
      // PRE-FETCH IMAGES
      const img1 = uploadedImage || await getBase64ImageFromURL('/frames/frame_15.webp');

      const doc = new jsPDF();
      const margin = 20;
      let y = margin;

      // --- PAGE 1: CLINICAL SUMMARY ---
      // Header Logo & Branding
      doc.setFillColor(5, 5, 5);
      doc.circle(margin + 10, y + 5, 10, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.text("N", margin + 7, y + 9);
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("Neurascan AI", margin + 25, y + 5);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Advanced Neural Diagnostics", margin + 25, y + 10);
      
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("Clinical Neural Report", 110, y + 8);
      
      y += 25;
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, y, 190, y);
      
      // Metadata Grid
      y += 15;
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("Date:", margin, y);
      doc.setFont("helvetica", "normal");
      doc.text(scanResult?.timestamp?.split(' ')[0] || "2026-04-10", margin + 12, y);

      doc.setFont("helvetica", "bold");
      doc.text("Referring Surgeon:", margin, y + 7);
      doc.setFont("helvetica", "normal");
      doc.text("Dr. Elena Sterling, MD, PhD", margin + 35, y + 7);
      
      doc.setFont("helvetica", "bold");
      doc.text("Facility:", 120, y + 7);
      doc.setFont("helvetica", "normal");
      doc.text("NeuroScan Nexus Hub-01", 140, y + 7);

      doc.setFont("helvetica", "bold");
      doc.text("Patient Name:", margin, y + 14);
      doc.setFont("helvetica", "normal");
      doc.text("Johnathan Doe (Index #NR-9042)", margin + 35, y + 14);

      doc.setFont("helvetica", "bold");
      doc.text("Sex / Age:", margin, y + 21);
      doc.setFont("helvetica", "normal");
      doc.text("Male / 42Y", margin + 35, y + 21);

      doc.setFont("helvetica", "bold");
      doc.text("Area Scanned:", margin, y + 28);
      doc.setFont("helvetica", "normal");
      doc.text("Full Cranial / Parietal Core", margin + 35, y + 28);

      // Relevant History
      y += 45;
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("Relevant clinical history and diagnostic context:", margin, y);
      y += 8;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text("Patient reports localized persistent pressure in the parietal region, recurring since Oct 2025. Symptoms include sporadic neural dispersion markers and occasional sensory metadata lag. Current protocol: AI-V4.2 High-Fidelity Sync.", margin, y, { maxWidth: 170 });

      // Main Findings
      y += 25;
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Main Findings", margin, y);
      y += 10;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const findings = [
        "- Dilation of the left lateral ventricle detected.",
        `- Localized structural variance identified in the Parietal Lobe.`,
        `- Neural density deviation measured at ${scanResult?.density || 1.24} g/cm3 (Ref image 1).`,
        `- Metabolic shift alignment at ${scanResult?.confidence || 94.2}% confidence.`,
        "- Anterior cortical thinning observed in axial projections."
      ];
      findings.forEach(line => {
        doc.text(line, margin + 5, y);
        y += 7;
      });

      // Conclusion
      y += 10;
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Conclusion & Recommendations", margin, y);
      y += 8;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(60, 60, 60);
      const conclusion = `The above findings indicate a localized metabolic shift consistent with structural variance in the parietal region. Considering the intensity of the neural density markers, the prognosis for immediate remission is guarded without intervention. I suggest a contrast-enhanced follow-up in 14 days and immediate integration into the Clinical Portal tracking system.`;
      const splitConclusion = doc.splitTextToSize(conclusion, 170);
      doc.text(splitConclusion, margin, y);

      y += 30;
      doc.setTextColor(0, 0, 0);
      doc.text("Best regards,", margin, y);
      y += 10;
      doc.setFont("helvetica", "bold");
      doc.text("Dr. Elena Sterling", margin, y);
      doc.setFont("helvetica", "normal");
      doc.text("MD, Ph.D, FRCVS (Neuro-AI Specialist)", margin, y + 5);

      // --- PAGE 2: IMAGING HUB ---
      doc.addPage();
      y = margin;
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Imaging Results & Neural Mapping", margin, y);
      
      y += 15;
      // Center the single MRI scan image
      const imgWidth = 100;
      const imgHeight = 100;
      const xPos = (210 - imgWidth) / 2; // jsPDF default width is 210mm
      doc.addImage(img1, 'WEBP', xPos, y, imgWidth, imgHeight);
      
      y += imgHeight + 10;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(uploadedImage ? "Primary MRI Scan - User Provided" : "Image 1 - Parietal Axial Slice (T2W Profile)", 105, y, { align: 'center' });

      // SAVE
      doc.save(`NeuroScan_Full_Report_${scanResult?.confidence || '94'}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsCompiling(false);
    }
  };

  return (
    <div className="min-h-screen py-32 px-8 flex justify-center items-center">
      <motion.div 
        initial={{ y: 200, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="w-full max-w-4xl glass rounded-[50px] p-12 relative border-white/20"
      >
        {/* Report Header */}
        <div className="flex justify-between items-start mb-12 border-b border-white/5 pb-8">
          <div>
            <div className="text-[10px] font-bold text-cyan-400 tracking-[0.5em] uppercase mb-2">Patient Index #NR-9042</div>
            <h1 className="text-4xl font-black uppercase leading-none text-glow">CLINICAL NEURO-REPORT</h1>
          </div>
          <div className="text-right text-[10px] text-white/30 font-mono text-xs">
            TIMESTAMP: {scanResult?.timestamp || '2026.04.10 // 04:30:12 GMT'}<br />
            VERSION: AI-V4.2.0
          </div>
        </div>

        {/* Prediction Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="text-[10px] font-bold text-white/40 tracking-widest uppercase mb-4">AI Prediction</div>
            <div className="text-5xl font-black text-red-500 uppercase leading-none mb-4">Abnormality Detected</div>
            <p className="text-sm text-white/50 leading-relaxed">
              Localized structural variance detected in the parietal lobe with a high degree of symmetrical deviation. Neural density indicates active metabolic shift at <span className="text-red-400 font-bold">{scanResult?.density || 1.24} g/cm³</span>.
            </p>
          </div>

          <div className="glass rounded-3xl p-8 bg-white/[0.02]">
            <div className="text-[10px] font-bold text-white/40 tracking-widest uppercase mb-6">Severity Scale</div>
            <div className="relative h-2 w-full bg-white/5 rounded-full mb-4">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${scanResult?.confidence || 84}%` }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-yellow-500 to-red-500 rounded-full relative"
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
              </motion.div>
            </div>
            <div className="flex justify-between text-[10px] font-bold tracking-widest text-white/30 uppercase">
              <span>Low</span>
              <span className="text-red-400">Critical</span>
            </div>
          </div>
        </div>

        {/* Uncertainty Clarified */}
        <div className="bg-cyan-500/5 rounded-3xl p-8 border border-cyan-500/10 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <ShieldAlert className="text-cyan-400" size={20} />
            <h3 className="text-sm font-bold tracking-widest uppercase">The "{scanResult?.confidence || 94.2}% Confidence" Explained</h3>
          </div>
          <p className="text-sm text-cyan-400/70 leading-relaxed">
            Neurascan AI has benchmarked your scan against 4.2 million known cases. The <span className="font-bold text-white">{scanResult?.confidence || 94.2}%</span> confidence score suggests a very high statistical alignment with existing abnormality patterns. However, final clinical verification by a certified neurologist is mandatory.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <motion.button 
            onClick={handleDownload}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-4 bg-white text-black px-12 py-5 rounded-full font-bold tracking-widest uppercase text-xs transition-opacity hover:opacity-90 disabled:opacity-50"
            disabled={isCompiling}
          >
            {isCompiling ? (
              <>
                <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                Compiling Neural Gallery...
              </>
            ) : (
              <>
                <Download size={18} />
                Generate Comprehensive MRI Report
              </>
            )}
          </motion.button>
        </div>

        {/* Medical Disclaimer */}
        <p className="text-[10px] text-center text-white/20 mt-12 uppercase tracking-[0.2em] max-w-2xl mx-auto">
          Neurascan AI is an assistive tool and does not replace professional medical advice. All AI predictions must be validated by a licensed healthcare professional.
        </p>
      </motion.div>
    </div>
  );
};

export default NeuroReport;
