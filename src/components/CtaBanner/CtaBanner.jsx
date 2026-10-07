import React from 'react';
import { Sparkles, MessageSquare, PhoneCall } from 'lucide-react';
import ctaBg from '../../assets/images/cta-bg.jpg';
import './CtaBanner.css';

const CtaBanner = ({ onOpenModal }) => {
  return (
    <section className="cta-banner-section">
      <div className="cta-ambient-light"></div>
      
      <div className="cta-container">
        <div className="cta-box" style={{ backgroundImage: `url(${ctaBg})` }}>
          <div className="cta-sparkle-icon">
            <Sparkles size={28} className="gold-text-icon" />
          </div>

          <div className="cta-text-content">
            <span className="cta-tag">DIRECT CONSULTATION TRIGGER</span>
            <h2 className="cta-heading">DISCUSS YOUR PROJECT</h2>
            <p className="cta-subtext">
              Let’s redesign your living space together. Connect with our principal interior architectural team to begin crafting your bespoke environment.
            </p>
          </div>

          <div className="cta-button-group">
            <button className="gold-btn-solid cta-main-btn" onClick={onOpenModal}>
              <MessageSquare size={16} />
              <span>START A CONVERSATION</span>
            </button>

            <a href="https://wa.me/916379183549" target="_blank" rel="noreferrer" className="gold-btn cta-secondary-btn">
              <PhoneCall size={16} />
              <span>INSTANT WHATSAPP (+91 6379183549)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
