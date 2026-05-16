import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent, useSpring } from 'framer-motion';

const TOTAL_FRAMES = 69;

const ScrollyCanvas = ({ onLoadingProgress }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Scroll Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth the scroll progress (Apple-like feel)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map progress to frame index
  const frameIndex = useTransform(smoothProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // 2. Preload Images
  useEffect(() => {
    let loadedCount = 0;
    const frameImages = [];

    const preloadImages = async () => {
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = `/frames/frame_${i}.webp`;
        img.onload = () => {
          loadedCount++;
          const progress = Math.round((loadedCount / TOTAL_FRAMES) * 100);
          onLoadingProgress(progress);
          if (loadedCount === TOTAL_FRAMES) {
            setIsLoaded(true);
          }
        };
        frameImages.push(img);
      }
      setImages(frameImages);
    };

    preloadImages();
  }, [onLoadingProgress]);

  // 3. Render Loop
  const renderFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;
    
    const context = canvas.getContext('2d');
    const image = images[Math.floor(index)];
    
    if (image && image.complete) {
      const { width, height } = canvas;
      // Clear canvas with a transparent base or match the galaxy black
      context.clearRect(0, 0, width, height);
      
      // Calculate drawing dimensions: 
      // We want the image to "contain" within the screen but at a 70% scale for breathing room
      const scale = Math.min(width / image.width, height / image.height) * 0.7;
      const x = (width / 2) - (image.width / 2) * scale;
      const y = (height / 2) - (image.height / 2) * scale;
      
      context.drawImage(image, x, y, image.width * scale, image.height * scale);
    }
  };

  // Listen to frameIndex changes and redraw
  useMotionValueEvent(frameIndex, "change", (latest) => {
    renderFrame(latest);
  });

  // Handle Resize
  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        renderFrame(frameIndex.get());
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [images, isLoaded]);

  return (
    <div ref={containerRef} className="scrolly-container">
      <div className="canvas-wrapper">
        <canvas ref={canvasRef} />
      </div>
      {/* Scroll indicator - fades out after 5% scroll */}
      <div className="scroll-indicator" style={{ opacity: 1 - Math.min(scrollYProgress.get() * 20, 1) }}>
        Scroll to Explore
      </div>
    </div>
  );
};

export default ScrollyCanvas;
