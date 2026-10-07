import React from 'react';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import Philosophy from '../../components/Philosophy/Philosophy';
import CuratedTeasers from '../../components/CuratedTeasers/CuratedTeasers';
import CtaBanner from '../../components/CtaBanner/CtaBanner';
import { Award, ShieldCheck, Cpu } from 'lucide-react';
import strengthsBg from '../../assets/images/strengths-bg.jpg';
import './Home.css';

const Home = ({ onOpenModal, onSelectProject }) => {
  return (
    <div className="home-page">
      {/* 1. Hero Banner */}
      <HeroBanner onOpenModal={onOpenModal} />

      {/* 2. Philosophy Highlight ("The Luxe Interior Experience") */}
      <Philosophy onSelectProject={onSelectProject} />

      {/* 3. Core Brand Strengths Section */}
      <section className="home-strengths-section" style={{ backgroundImage: `url(${strengthsBg})` }}>
        <div className="home-container">
          <div className="strengths-grid">
            <div className="strength-card">
              <div className="strength-icon-box">
                <Cpu size={24} className="gold-icon" />
              </div>
              <h3 className="strength-title">In-House Modular Carpentry</h3>
              <p className="strength-desc">
                Precision german-machined joinery, concealed fittings, and durable moisture-resistant HDHMR substrates.
              </p>
            </div>

            <div className="strength-card">
              <div className="strength-icon-box">
                <Award size={24} className="gold-icon" />
              </div>
              <h3 className="strength-title">Direct Sourced Materials</h3>
              <p className="strength-desc">
                Authentic Italian marble, quartz stone, and certified hardware from Blum, Hettich, and Hafele.
              </p>
            </div>

            <div className="strength-card">
              <div className="strength-icon-box">
                <ShieldCheck size={24} className="gold-icon" />
              </div>
              <h3 className="strength-title">Zero-Deviation Execution</h3>
              <p className="strength-desc">
                What you see in 3D CGI photorealistic renders is what is delivered on site down to the millimeter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Curated Teasers for Flagship Works */}
      <CuratedTeasers onSelectProject={onSelectProject} />

      {/* 5. Quick Contact CTA Banner */}
      <CtaBanner onOpenModal={onOpenModal} />
    </div>
  );
};

export default Home;
