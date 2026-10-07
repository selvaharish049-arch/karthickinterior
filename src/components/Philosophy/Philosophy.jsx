import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { Compass, Settings, FileText, BookOpen, Pencil, Layers, Sparkles, Camera } from 'lucide-react';
import philosophyBg from '../../assets/images/philosophy-bg.jpg';
import './Philosophy.css';

const Philosophy = ({ onSelectProject }) => {
  const { siteImages, updateSiteImage, isAdminLoggedIn } = useProjects();
  const [activeTab, setActiveTab] = useState(0);

  const pillars = [
    {
      id: 'moodboard',
      title: 'MOOD BOARD DETAIL',
      icon: Compass,
      subTitle: 'TACTILE TONE & MATERIAL SWATCHES',
      desc: 'Carefully selected color palettes, velvet fabrics, acoustic wood veneers, and brushed brass metallic swatches to establish space atmosphere.',
      badgeIcon: Compass,
      tag: '01. TAILORED CONCEPT'
    },
    {
      id: 'sketch',
      title: 'ARCHITECTURAL SKETCH',
      icon: Settings,
      subTitle: '2D BLUEPRINTS & SPATIAL CIRCULATION',
      desc: 'Precision CAD layout schematics, ceiling trough height calculations, electrical lighting points, and structural circulation planning.',
      badgeIcon: Pencil,
      tag: '02. LOGISTICS & PLANNING'
    },
    {
      id: 'vision',
      title: 'CLIENT VISION TO CONCEPT',
      icon: FileText,
      subTitle: 'TRANSLATING VISION TO REALITY',
      desc: 'Our initial concept focuses on capturing the client’s desire for an inspired and bespoke space, using textural contrasts and defined architectural zones.',
      badgeIcon: Sparkles,
      tag: '03. CREATIVE FINISHES'
    },
    {
      id: 'materials',
      title: 'MATERIAL SAMPLES',
      icon: BookOpen,
      subTitle: 'AUTHENTIC STONE & LEATHER CURATION',
      desc: 'Certified Italian Grigio marble, quartz countertops, HDHMR moisture-resistant core boards, and soft-close German hardware fittings.',
      badgeIcon: Layers,
      tag: '04. TURNKEY SUPERVISION'
    }
  ];

  const handleImageFileChange = (pillarId, e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        updateSiteImage('philosophy', pillarId, uploadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="philosophy-section" style={{ backgroundImage: `url(${philosophyBg})` }}>
      <div className="philosophy-container">
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="section-subtitle">OUR DESIGN ETHOS</span>
          <h2 className="section-title">THE LUXE INTERIOR EXPERIENCE</h2>
          <div className="gold-line"></div>
          <p className="section-desc">
            Combining tailored architectural concepts, rigorous logistics, and millimeter-accurate execution to elevate everyday living.
          </p>
        </div>

        {/* Top Gold Icon Bar matching image */}
        <div className="philosophy-tab-bar">
          {pillars.map((pillar, idx) => {
            const IconComp = pillar.icon;
            return (
              <button
                key={pillar.id}
                className={`tab-icon-item ${activeTab === idx ? 'active' : ''}`}
                onClick={() => setActiveTab(idx)}
                aria-label={pillar.title}
              >
                <div className="tab-circle">
                  <IconComp size={20} className="tab-icon-svg" />
                </div>
                <span className="tab-label">{pillar.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Showcase Frame matching reference image beige/champagne inner box */}
        <div className="philosophy-showcase-frame">
          <div className="showcase-inner-grid">
            {pillars.map((pillar, idx) => {
              const BadgeIcon = pillar.badgeIcon;
              const imgUrl = (siteImages?.philosophy && siteImages.philosophy[pillar.id]) 
                || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80';

              return (
                <div
                  key={pillar.id}
                  className={`showcase-card ${activeTab === idx ? 'card-active' : ''}`}
                  onClick={() => setActiveTab(idx)}
                >
                  <div className="card-top-bar">
                    <h3 className="card-heading">{pillar.title}</h3>
                    <div className="card-badge-gold">
                      <BadgeIcon size={16} />
                    </div>
                  </div>

                  <div className="card-image-box" style={{ position: 'relative' }}>
                    <img src={imgUrl} alt={pillar.title} className="card-img" />
                    <div className="card-tag-overlay">{pillar.tag}</div>

                    {/* Admin Image Change Button */}
                    {isAdminLoggedIn && (
                      <label 
                        className="admin-edit-img-overlay"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Camera size={14} />
                        <span>CHANGE IMAGE</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleImageFileChange(pillar.id, e)} 
                          hidden 
                        />
                      </label>
                    )}
                  </div>

                  <div className="card-content-box">
                    <h4 className="card-sub-heading">{pillar.subTitle}</h4>
                    <p className="card-text-body">{pillar.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
