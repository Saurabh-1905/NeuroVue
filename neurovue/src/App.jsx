import React, { useState } from 'react';
import ScrollyCanvas from './components/ScrollyCanvas';
import StoryOverlays from './components/StoryOverlays';
import Preloader from './components/Preloader';
import './index.css';

function App() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoadingProgress = (progress) => {
    setLoadingProgress(progress);
    if (progress === 100) {
      // Small delay for smooth transition
      setTimeout(() => setIsLoaded(true), 1000);
    }
  };

  return (
    <main>
      <Preloader progress={loadingProgress} isLoaded={isLoaded} />
      
      <div className="main-content">
        <ScrollyCanvas onLoadingProgress={handleLoadingProgress} />
        <StoryOverlays />
      </div>

      {/* Persistent UI Elements */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', padding: '40px', display: 'flex', justifyContent: 'space-between', zIndex: 10 }}>
        <div style={{ fontWeight: 900, letterSpacing: '0.2em', fontSize: '0.8rem' }}>NEUROVUE</div>
        <div style={{ display: 'flex', gap: '30px', fontSize: '0.7rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>
          <span>PORTAL</span>
          <span>DIAGNOSTICS</span>
          <span style={{ color: '#fff' }}>SCAN NOW</span>
        </div>
      </nav>

      <footer style={{ position: 'fixed', bottom: 40, width: '100%', padding: '0 40px', display: 'flex', justifyContent: 'space-between', zIndex: 10, fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
        <div>PRECISION MRI // NEXT GEN</div>
        <div>EST. 2026</div>
      </footer>
    </main>
  );
}

export default App;
