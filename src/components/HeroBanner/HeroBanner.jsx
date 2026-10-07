import React from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, Compass } from 'lucide-react';
import heroBgOlive from '../../assets/images/hero-bg-olive.jpg';
import './HeroBanner.css';

const HeroBanner = ({ onOpenModal }) => {
  return (
    <section 
      className="hero-section"
      style={{ backgroundImage: `url(${heroBgOlive})` }}
    >
      {/* Background Dark Overlay & Luxury Lighting Effect */}
      <div className="hero-bg-overlay"></div>
      <div className="hero-ambient-glow"></div>

      <div className="hero-container">
        <div className="hero-content">
          {/* Top Tagline */}
          <div className="hero-badge">
            <Compass size={14} className="gold-icon" />
            <span>DESIGNED FOR INSPIRED SPACES</span>
          </div>

          {/* Headline matching image exact structure */}
          <h1 className="hero-headline">
            REDEFINING LUXURY LIVING
            <span className="hero-sub-italic">BY OUR ELITE TEAM</span>
          </h1>

          {/* Sub-headline */}
          <p className="hero-description">
            Custom residential & commercial interior architecture, modular woodwork, and premium craftsmanship. We craft sophisticated, bespoke interiors for the most discerning clients.
          </p>

          {/* Primary Action Buttons */}
          <div className="hero-actions">
            <Link to="/collections" className="gold-btn hero-btn-primary">
              <span>EXPLORE PROJECTS</span>
              <ArrowRight size={16} />
            </Link>

            <button className="gold-btn-solid hero-btn-secondary" onClick={onOpenModal}>
              <Play size={14} fill="#0d0f12" />
              <span>BOOK CONSULTATION</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="hero-metrics-bar">
            <div className="metric-item">
              <span className="metric-num">100+</span>
              <span className="metric-lbl">Completed Interiors</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-num">100%</span>
              <span className="metric-lbl">Millimeter Accuracy</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-num">Turnkey</span>
              <span className="metric-lbl">End-to-End Supervision</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
