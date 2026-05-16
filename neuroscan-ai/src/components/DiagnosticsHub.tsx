'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layers, Search, Maximize2, Crosshair } from 'lucide-react';

const TOTAL_FRAMES = 69;

const DiagnosticsHub = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [zoom, setZoom] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    const frameImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames/frame_${i}.webp`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          renderFrame(currentFrame);
        }
      };
      frameImages.push(img);
    }
    setImages(frameImages);
  }, []);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length < TOTAL_FRAMES) return;
    const context = canvas.getContext('2d');
    const image = images[index];
    if (image && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const scale = Math.min(canvas.width / image.width, canvas.height / image.height) * zoom;
      const x = (canvas.width / 2) - (image.width / 2) * scale;
      const y = (canvas.height / 2) - (image.height / 2) * scale;
      context.drawImage(image, x, y, image.width * scale, image.height * scale);
    }
  };

  useEffect(() => {
    renderFrame(currentFrame);
  }, [currentFrame, images, zoom]);

  return (
    <div className="min-h-screen py-32 px-8 flex flex-col items-center">
      <div className="max-w-6xl w-full grid grid-cols-12 gap-8 h-[70vh]">

        {/* Inspection Controls Sidebar */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
          <div className="glass rounded-3xl p-6">
            <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-cyan-400 mb-6 flex items-center gap-2">
              <Layers size={14} /> Layer Inspector
            </h3>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-[10px] font-bold text-white/40 mb-2 uppercase">Axial Position</div>
                <input
                  type="range" min="0" max={TOTAL_FRAMES - 1} value={currentFrame}
                  onChange={(e) => setCurrentFrame(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
                <div className="text-[10px] text-right mt-1 text-cyan-400/50">SLICE {currentFrame} / 69</div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-bold text-white/40 mb-2 uppercase">Optical Zoom</div>
                <input
                  type="range" min="1" max="3" step="0.1" value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl p-6 flex-1">
            <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-white/40 mb-4">Voxel Metadata</h3>
            <div className="space-y-4">
              {[
                { label: "Anatomy", val: "Cerebral Cortex" },
                { label: "Coord", val: "42.0X / 12.9Y" },
                { label: "Density", val: "1.24 g/cm³" }
              ].map(d => (
                <div key={d.label} className="border-b border-white/5 pb-2">
                  <div className="text-[9px] uppercase text-white/20">{d.label}</div>
                  <div className="text-xs font-bold text-white/80">{d.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Viewfinder */}
        <div className="col-span-12 lg:col-span-9 glass rounded-[40px] p-4 relative overflow-hidden flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={1200} height={800}
            className="w-full h-full object-contain cursor-crosshair"
          />

          {/* HUD Overlays */}
          <div className="absolute top-8 left-8 flex gap-4">
            <div className="glass px-4 py-2 rounded-xl text-[10px] font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
              <Maximize2 size={12} /> Full Res Mapping
            </div>
          </div>

          <div className="absolute bottom-8 right-8">
            <div className="w-16 h-16 rounded-full glass flex items-center justify-center border-cyan-400/20 group cursor-pointer hover:bg-cyan-500/10 transition-colors">
              <Search size={20} className="text-cyan-400" />
            </div>
          </div>

          {/* Crosshair effect */}
          <div className="absolute inset-0 pointer-events-none border border-white/5 flex items-center justify-center">
            <div className="w-full h-[1px] bg-white/5 absolute" />
            <div className="h-full w-[1px] bg-white/5 absolute" />
            <Crosshair size={32} className="text-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticsHub;