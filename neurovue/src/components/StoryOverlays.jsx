import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const StoryOverlays = () => {
  const { scrollYProgress } = useScroll();

  // Beat A: 0-20%
  const opacityA = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.25], [0, 1, 1, 0]);
  const yA = useTransform(scrollYProgress, [0, 0.2], [40, 0]);

  // Beat B: 25-45%
  const opacityB = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.5], [0, 1, 1, 0]);
  const yB = useTransform(scrollYProgress, [0.25, 0.45], [40, 0]);

  // Beat C: 50-70%
  const opacityC = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.75], [0, 1, 1, 0]);
  const yC = useTransform(scrollYProgress, [0.5, 0.7], [40, 0]);

  // Beat D: 75-95%
  const opacityD = useTransform(scrollYProgress, [0.75, 0.85, 0.95, 1], [0, 1, 1, 1]);
  const yD = useTransform(scrollYProgress, [0.75, 0.95], [40, 0]);

  return (
    <div className="overlay-section">
      {/* Beat A */}
      <motion.section 
        className="story-beat"
        style={{ opacity: opacityA, y: yA }}
      >
        <h1 className="beat-title glow-text">THE HUMAN <span className="bioluminescent">CORE</span></h1>
        <p className="beat-subtitle">Visualizing the unseen architecture of the mind.</p>
      </motion.section>

      {/* Beat B */}
      <motion.section 
        className="story-beat right"
        style={{ opacity: opacityB, y: yB }}
      >
        <h1 className="beat-title glow-text">DIAGNOSTIC <span className="bioluminescent">DEPTH</span></h1>
        <p className="beat-subtitle">High-fidelity MRI slices begin their orbital rotation, mapping every fold and fissure.</p>
      </motion.section>

      {/* Beat C */}
      <motion.section 
        className="story-beat"
        style={{ opacity: opacityC, y: yC }}
      >
        <h1 className="beat-title glow-text">NEURAL <span className="bioluminescent">VELOCITY</span></h1>
        <p className="beat-subtitle">Real-time signal tracking through the DTI matrix. Bioluminescent pathways ignite.</p>
      </motion.section>

      {/* Beat D */}
      <motion.section 
        className="story-beat center"
        style={{ opacity: opacityD, y: yD, alignItems: 'center', textAlign: 'center' }}
      >
        <h1 className="beat-title glow-text">CLARITY <span className="bioluminescent">DEFINED</span></h1>
        <p className="beat-subtitle">Precision imaging for the next era of neuro-diagnostics.</p>
        <button className="btn-premium">Book a Scan</button>
      </motion.section>
    </div>
  );
};

export default StoryOverlays;
