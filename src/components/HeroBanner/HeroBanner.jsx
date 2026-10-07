import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Layers, Compass, ChevronRight, MessageSquare } from 'lucide-react';
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
            <Compass size={14} className="cyan-icon" />
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

          {/* Interactive Floating Glass Category Cards & Instant Consultation Pill */}
          <div className="hero-glass-interactive-section">
            <span className="hero-section-label">INTERACTIVE QUICK COLLECTION PORTALS</span>
            
            <div className="hero-glass-cards-grid">
              <Link to="/collections" className="glass-category-card">
                <div className="glass-card-icon">
                  <Sparkles size={18} />
                </div>
                <div className="glass-card-info">
                  <span className="glass-card-title">Modular Kitchens</span>
                  <span className="glass-card-sub">Italian Marble & Quartz Islands</span>
                </div>
                <ChevronRight size={16} className="card-arrow" />
              </Link>

              <Link to="/collections" className="glass-category-card">
                <div className="glass-card-icon">
                  <Layers size={18} />
                </div>
                <div className="glass-card-info">
                  <span className="glass-card-title">Living Room Suites</span>
                  <span className="glass-card-sub">Acoustic Fluted Wood Walls</span>
                </div>
                <ChevronRight size={16} className="card-arrow" />
              </Link>

              <Link to="/collections" className="glass-category-card">
                <div className="glass-card-icon">
                  <Compass size={18} />
                </div>
                <div className="glass-card-info">
                  <span className="glass-card-title">Master Penthouse</span>
                  <span className="glass-card-sub">Panoramic Ceiling & Spa</span>
                </div>
                <ChevronRight size={16} className="card-arrow" />
              </Link>
            </div>

            {/* Instant Consultation Pill Trigger */}
            <div className="instant-consultation-trigger-bar">
              <button className="hero-consultation-pill" onClick={onOpenModal}>
                <div className="pill-pulse-dot"></div>
                <MessageSquare size={16} />
                <span>REQUEST BESPOKE 3D BLUEPRINT CONSULTATION</span>
                <div className="pill-tag">⚡ 24H GUARANTEE</div>
              </button>
            </div>
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
