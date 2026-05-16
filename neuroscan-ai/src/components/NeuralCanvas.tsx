'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from 'framer-motion';

const TOTAL_FRAMES = 69;

const NeuralCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  useEffect(() => {
    const frameImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const preloadImages = () => {
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = `/frames/frame_${i}.webp`;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === TOTAL_FRAMES) {
            setIsLoaded(true);
          }
        };
        frameImages.push(img);
      }
      setImages(frameImages);
    };

    preloadImages();
  }, []);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;
    
    const context = canvas.getContext('2d');
    const image = images[Math.floor(index)];
    
    if (image && context) {
      const { width, height } = canvas;
      context.clearRect(0, 0, width, height);
      
      // Apple-style fitting: slightly larger and more immersive
      const scale = Math.min(width / image.width, height / image.height) * 1.1; 
      const x = (width / 2) - (image.width / 2) * scale;
      const y = (height / 2) - (image.height / 2) * scale;
      
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      context.drawImage(image, x, y, image.width * scale, image.height * scale);
    }
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    renderFrame(latest);
  });

  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        // High DPI Support
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        
        const context = canvas.getContext('2d');
        if (context) {
          // Reset transform before applying scale to prevent cumulative scaling
          context.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
        
        renderFrame(frameIndex.get());
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [images, isLoaded]);

  return (
    <div ref={containerRef} className="relative h-[800vh] w-full">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center bg-transparent overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Main 3D Model */}
          <canvas 
            ref={canvasRef} 
            className="w-full h-full object-contain filter drop-shadow-[0_0_100px_rgba(0,242,255,0.05)] relative z-20"
          />
          
          {/* GROUND PLANE REFLECTION (Mirroring the table in coffee image) */}
          <div className="absolute bottom-[-10%] inset-x-0 h-1/2 bg-gradient-to-t from-black via-white/[0.02] to-transparent opacity-40 blur-3xl rounded-[100%] z-10" />
          
          {/* CENTERED SPOTLIGHT ATMOSPHERE */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.8)_80%)] pointer-events-none z-30" />
          <div className="absolute inset-0 bg-black/40 [mask-image:radial-gradient(circle,transparent_40%,black_100%)] pointer-events-none z-30" />
        </motion.div>
      </div>
    </div>
  );
};

export default NeuralCanvas;
