import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import homeHeroClassic from '../../assets/images/home-hero-classic.jpg';
import './Background.css';

// Bright & Classic Luxury Interior Background Images Map
const BACKGROUND_IMAGES = {
  '/': homeHeroClassic,
  '/collections': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80',
  '/about': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=80',
  '/services': 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2000&q=80',
  '/contact': 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=2000&q=80',
  '/admin': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80'
};

const DEFAULT_BG = homeHeroClassic;

const Background = () => {
  const location = useLocation();
  const [currentBg, setCurrentBg] = useState(DEFAULT_BG);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const nextBg = BACKGROUND_IMAGES[location.pathname] || DEFAULT_BG;
    if (nextBg !== currentBg) {
      setFade(true);
      const timer = setTimeout(() => {
        setCurrentBg(nextBg);
        setFade(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, currentBg]);

  return (
    <div className="global-background-wrapper">
      {/* Dynamic Bright Classic Luxury Background Image */}
      <div 
        className={`classic-bg-image ${fade ? 'fade-out' : 'fade-in'}`}
        style={{ backgroundImage: `url(${currentBg})` }}
      />
      
      {/* Bright & Crisp Light Vignette Layer */}
      <div className="classic-bg-vignette"></div>
      <div className="classic-gold-glow top-left-glow"></div>
      <div className="classic-gold-glow bottom-right-glow"></div>
    </div>
  );
};

export default Background;
