import React from 'react';
import { useProjects } from '../../context/ProjectContext';
import { Compass, Box, Hammer, Layers, ClipboardCheck, ArrowRight, Check, Camera } from 'lucide-react';
import CtaBanner from '../../components/CtaBanner/CtaBanner';
import './Services.css';

const Services = ({ onOpenModal }) => {
  const { siteImages, updateSiteImage, isAdminLoggedIn } = useProjects();

  const handleImageFileChange = (num, e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        updateSiteImage('services', num, uploadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const serviceList = [
    {
      num: '01',
      title: 'Concept & Space Planning',
      icon: Compass,
      subtitle: '2D ARCHITECTURAL LAYOUTS & CIRCULATION SCHEMATICS',
      desc: 'Complete spatial optimization, structural circulation flow, electrical & HVAC layout schematics, ceiling height trough design, and mood board curation.',
      features: [
        '2D Architectural CAD Floor Plans',
        'Reflected Ceiling & Lighting Schematics',
        'Structural Circulation & Furniture Zoning',
        'Tactile Material & Color Mood Boards'
      ],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '02',
      title: '3D Architectural Visualisation',
      icon: Box,
      subtitle: 'PHOTOREALISTIC CGI RENDERS & DIGITAL WALKTHROUGHS',
      desc: 'Ultra-high-definition 3D rendering, exact lighting simulation (natural daylight vs 2700K warm night LED), material texture mapping, and virtual 360 walkthroughs.',
      features: [
        'Photorealistic 4K CGI Renders',
        'Exact Material Texture Mapping',
        'Daylight & Night Scene Lighting Simulation',
        'Interactive 3D Virtual Walkthroughs'
      ],
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '03',
      title: 'Custom Joinery & Carpentry',
      icon: Hammer,
      subtitle: 'BESPOKE MODULAR KITCHENS & FLUTED PANELING',
      desc: 'In-house automated CNC fabrication of bespoke modular kitchens, fluted acoustic wood wall paneling, walk-in dressing closets, TV entertainment units, and private bar counters.',
      features: [
        'Modular Kitchen Cabinets & Islands',
        'Fluted Wood Wall & Ceiling Paneling',
        'Custom Walk-in Closets & Wardrobes',
        'Entertainment Units & Executive Bar Counters'
      ],
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '04',
      title: 'Material Selection & Procurement',
      icon: Layers,
      subtitle: 'CURATED STONE, FABRICS & GERMAN HARDWARE FINISHES',
      desc: 'Direct factory procurement of certified Italian marbles, quartz stone slabs, designer architectural lighting fixtures, luxury upholstery fabrics, and soft-close hardware.',
      features: [
        'Imported Italian Marble & Quartz Slabs',
        'Certified German Hardware (Blum, Hettich, Hafele)',
        'Designer Architectural Lighting Fixtures',
        'Bespoke Upholstery & Acoustic Fabric Sourcing'
      ],
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80'
    },
    {
      num: '05',
      title: 'Turnkey Project Management & Site Supervision',
      icon: ClipboardCheck,
      subtitle: 'END-TO-END EXECUTION, CIVIL WORK & SITE LOGS',
      desc: 'Full-scope site management, civil alterations, daily digital site progress logs, contractor coordination, quality control audits, and white-glove final handover.',
      features: [
        'End-to-End Civil & Electrical Execution',
        'Daily Site Progress Logs & Photo Audits',
        'Multi-trade Contractor Coordination',
        'Millimeter Precision Final Handover'
      ],
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="services-page">
      {/* Services Hero Header */}
      <section className="services-hero">
        <div className="services-container">
          <span className="section-subtitle">ARCHITECTURAL SERVICES</span>
          <h1 className="services-title">5 CORE PILLARS OF LUXURY EXECUTION</h1>
          <p className="services-subtitle">
            From initial 2D space planning to 3D photorealistic visualization, custom woodwork fabrication, and turnkey site supervision.
          </p>
        </div>
      </section>

      {/* Services List Section */}
      <section className="services-list-section">
        <div className="services-container">
          <div className="services-vertical-stack">
            {serviceList.map((service) => {
              const IconComp = service.icon;
              const imgUrl = (siteImages?.services && siteImages.services[service.num]) || service.image;

              return (
                <div key={service.num} className="service-card-item">
                  <div className="service-card-left">
                    <div className="service-number-badge">{service.num}</div>
                    <div className="service-icon-box">
                      <IconComp size={24} className="gold-icon" />
                    </div>
                    <span className="service-card-subtitle">{service.subtitle}</span>
                    <h2 className="service-card-title">{service.title}</h2>
                    <p className="service-card-desc">{service.desc}</p>

                    <div className="service-features-grid">
                      {service.features.map((feat, idx) => (
                        <div key={idx} className="feature-item">
                          <Check size={16} className="gold-icon" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <button className="gold-btn service-inquire-btn" onClick={onOpenModal}>
                      <span>INQUIRE FOR THIS SERVICE</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>

                  <div className="service-card-right">
                    <div className="service-image-frame" style={{ position: 'relative' }}>
                      <img src={imgUrl} alt={service.title} className="service-img" />
                      <div className="service-image-badge">{service.title}</div>

                      {isAdminLoggedIn && (
                        <label 
                          className="admin-edit-img-overlay"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Camera size={14} />
                          <span>CHANGE SERVICE IMAGE</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => handleImageFileChange(service.num, e)} 
                            hidden 
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CtaBanner onOpenModal={onOpenModal} />
    </div>
  );
};

export default Services;
