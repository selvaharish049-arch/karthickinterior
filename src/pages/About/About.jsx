import React from 'react';
import { useProjects } from '../../context/ProjectContext';
import { Hammer, ShieldCheck, CheckCircle2, Cpu, Camera } from 'lucide-react';
import CtaBanner from '../../components/CtaBanner/CtaBanner';
import './About.css';

const About = ({ onOpenModal }) => {
  const { siteImages, updateSiteImage, isAdminLoggedIn } = useProjects();

  const handleImageFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        updateSiteImage('about', 'story', uploadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const aboutImgUrl = siteImages?.about?.story || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80";
  const metrics = [
    { num: '100+', label: 'Completed Interior Projects' },
    { num: '100%', label: 'Quality & Timeline Commitment' },
    { num: 'Turnkey', label: 'End-to-End Delivery & Supervision' },
    { num: '0 mm', label: 'Tolerance Execution Standard' }
  ];

  const standards = [
    {
      icon: Hammer,
      title: 'Precision Woodwork',
      desc: 'In-house state-of-the-art carpentry factory, concealed German fittings, precise mitre joinery, and moisture-resistant HDHMR boards.'
    },
    {
      icon: ShieldCheck,
      title: 'Material Authenticity',
      desc: 'Direct sourcing of certified natural veneers, Italian marbles, quartz stones, and authentic hardware from Blum, Hettich, and Hafele.'
    },
    {
      icon: Cpu,
      title: 'Zero-Deviation Execution',
      desc: 'Ensuring 3D CGI photorealistic renders match the on-site completed space with millimeter precision and zero compromise.'
    }
  ];

  return (
    <div className="about-page">
      {/* About Hero Section */}
      <section className="about-hero">
        <div className="about-container">
          <span className="section-subtitle">THE LUXE STORY</span>
          <h1 className="about-title">BESPOKE CRAFTSMANSHIP TO ARCHITECTURAL EXCELLENCE</h1>
          <p className="about-subtitle">
            Founded on a legacy of master carpentry and precision joinery, LUXE INTERIOR has evolved into a premier luxury architectural interior firm.
          </p>
        </div>
      </section>

      {/* Brand Story & Vision */}
      <section className="story-section">
        <div className="about-container">
          <div className="story-grid">
            <div className="story-image-column">
              <div className="story-image-frame" style={{ position: 'relative' }}>
                <img 
                  src={aboutImgUrl} 
                  alt="Luxe Interior Craftsmanship" 
                  className="story-img"
                />
                <div className="story-experience-badge">
                  <span className="exp-num">15+</span>
                  <span className="exp-lbl">Years of Excellence</span>
                </div>

                {isAdminLoggedIn && (
                  <label 
                    className="admin-edit-img-overlay"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Camera size={14} />
                    <span>CHANGE ABOUT IMAGE</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageFileChange} 
                      hidden 
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="story-text-column">
              <span className="section-subtitle">OUR EVOLUTION</span>
              <h2 className="story-heading">REDEFINING INTERIOR ARCHITECTURE</h2>
              <div className="gold-line-left"></div>
              
              <p className="story-p">
                What began as an elite workshop of master craftsmen creating custom hardwood furniture has transformed into a complete interior architecture studio. We recognized that true luxury lies not just in aesthetic styling, but in structural integrity, spatial flow, and flawless material integration.
              </p>
              
              <p className="story-p">
                Today, LUXE INTERIOR handles end-to-end luxury residences, penthouses, and executive commercial headquarters across the globe. Our in-house manufacturing facilities guarantee that every modular kitchen unit, fluted wall panel, and backlit display is built with millimeter accuracy before installation on site.
              </p>

              <div className="story-highlights">
                <div className="highlight-item">
                  <CheckCircle2 size={20} className="gold-icon" />
                  <span>In-house automated CNC fabrication & woodwork facilities</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle2 size={20} className="gold-icon" />
                  <span>Strict quality control protocols & daily digital site logs</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle2 size={20} className="gold-icon" />
                  <span>Transparent timeline commitments with guaranteed delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Standards & Core Values */}
      <section className="standards-section">
        <div className="about-container">
          <div className="section-header text-center">
            <span className="section-subtitle">OUR UNCOMPROMISING BENCHMARKS</span>
            <h2 className="section-title">OUR WORK STANDARDS & VALUES</h2>
            <div className="gold-line"></div>
          </div>

          <div className="standards-grid">
            {standards.map((item, index) => {
              const IconComp = item.icon;
              return (
                <div className="standard-card" key={index}>
                  <div className="standard-icon-wrapper">
                    <IconComp size={28} className="gold-icon" />
                  </div>
                  <h3 className="standard-title">{item.title}</h3>
                  <p className="standard-desc">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Milestones & Metrics */}
      <section className="metrics-section">
        <div className="about-container">
          <div className="metrics-grid">
            {metrics.map((m, idx) => (
              <div className="metric-card" key={idx}>
                <span className="metric-number-big">{m.num}</span>
                <span className="metric-label-text">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CtaBanner onOpenModal={onOpenModal} />
    </div>
  );
};

export default About;
