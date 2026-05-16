import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ progress, isLoaded }) => {
  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div 
          className="loader-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="loader-text"
          >
            <span style={{ letterSpacing: '0.4em', fontWeight: 200, fontSize: '0.8rem', color: '#00f2ff' }}>
              INITIALISING SCAN...
            </span>
          </motion.div>
          
          <div className="loader-bar-bg">
            <motion.div 
              className="loader-bar-fill"
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 50 }}
            />
          </div>
          
          <motion.div 
            className="loader-percentage"
            style={{ marginTop: '10px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}
          >
            {progress}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
