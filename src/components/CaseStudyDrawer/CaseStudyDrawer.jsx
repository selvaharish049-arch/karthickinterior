import React, { useState } from 'react';
import { X, Layers, Compass, Image as ImageIcon, Box } from 'lucide-react';
import './CaseStudyDrawer.css';

const CaseStudyDrawer = ({ project, onClose, onOpenModal }) => {
  const [activeTab, setActiveTab] = useState('render'); // '2d', 'render', 'execution'

  if (!project) return null;

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-content modal-2col-layout" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="drawer-header">
          <div>
            <span className="drawer-category-tag">{project.category || 'Luxury Interior'}</span>
            <h2 className="drawer-title">{project.title}</h2>
            <p className="drawer-location">{project.location || 'Private Residence'}</p>
          </div>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close Case Study">
            <X size={22} />
          </button>
        </div>

        {/* Modal 2-Column Body */}
        <div className="drawer-body-grid">
          {/* Left Column: Media & View Tabs */}
          <div className="drawer-left-media-col">
            <div className="view-selector-tabs">
              <button 
                className={`view-tab ${activeTab === '2d' ? 'active' : ''}`}
                onClick={() => setActiveTab('2d')}
              >
                <Compass size={15} />
                <span>2D Layout</span>
              </button>
              <button 
                className={`view-tab ${activeTab === 'render' ? 'active' : ''}`}
                onClick={() => setActiveTab('render')}
              >
                <Box size={15} />
                <span>3D Render</span>
              </button>
              <button 
                className={`view-tab ${activeTab === 'execution' ? 'active' : ''}`}
                onClick={() => setActiveTab('execution')}
              >
                <ImageIcon size={15} />
                <span>On-Site Match</span>
              </button>
            </div>

            <div className="square-media-box">
              {activeTab === '2d' && (
                <div className="media-content-frame blueprint-frame">
                  <div className="blueprint-overlay-grid"></div>
                  <img 
                    src={project.planImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"} 
                    alt="2D Blueprint Layout" 
                    className="media-img square-img"
                  />
                  <div className="media-badge">2D CAD Schematic</div>
                </div>
              )}

              {activeTab === 'render' && (
                <div className="media-content-frame">
                  <img 
                    src={project.renderImage || project.image} 
                    alt="3D CGI Render" 
                    className="media-img square-img"
                  />
                  <div className="media-badge">3D Photorealistic Render</div>
                </div>
              )}

              {activeTab === 'execution' && (
                <div className="media-content-frame">
                  <img 
                    src={project.executionImage || project.image} 
                    alt="Finished Site Execution" 
                    className="media-img square-img"
                  />
                  <div className="media-badge finished-badge">100% On-Site Match</div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Specifications, Materials & CTA */}
          <div className="drawer-right-details-col">
            <div className="detail-card">
              <h3 className="detail-title">
                <Layers size={18} className="gold-icon" />
                CLIENT BRIEF & VISION
              </h3>
              <p className="detail-text">
                {project.brief || 'The client desired a seamlessly integrated luxury living environment combining dark fluted woodwork, customized concealed acoustic paneling, and indirect accent lighting for sophisticated evening entertaining.'}
              </p>
            </div>

            <div className="detail-card">
              <h3 className="detail-title">
                <Compass size={18} className="gold-icon" />
                ARCHITECTURAL EXECUTION
              </h3>
              <p className="detail-text">
                {project.challenge || 'Balancing large structural ceiling spans with customized recessed LED trough lighting and heavy Italian marble wall claddings without visible fasteners or seams.'}
              </p>
            </div>

            {/* Material Palette */}
            <div className="material-palette-section">
              <h3 className="section-label">CURATED MATERIAL PALETTE</h3>
              <div className="palette-grid">
                {(project.materials || [
                  { name: 'Italian Grigio Marble', type: 'Stone Cladding', color: '#3A3F47' },
                  { name: 'Charcoal Laminate', type: 'Modular Cabinetry', color: '#1E2229' },
                  { name: 'Brushed Brass', type: 'Metallic Trims', color: '#C5A059' },
                  { name: 'Fluted American Walnut', type: 'Wood Paneling', color: '#5C4033' }
                ]).map((mat, index) => (
                  <div className="material-item" key={index}>
                    <div className="material-swatch" style={{ backgroundColor: mat.color }}></div>
                    <div className="material-info">
                      <span className="mat-name">{mat.name}</span>
                      <span className="mat-type">{mat.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div className="specs-section">
              <h3 className="section-label">PROJECT SPECIFICATIONS</h3>
              <div className="specs-table">
                <div className="spec-row">
                  <span className="spec-key">Total Area:</span>
                  <span className="spec-val">{project.area || '4,200 Sq. Ft.'}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-key">Hardware:</span>
                  <span className="spec-val">Blum Soft-Close, Hettich, Hafele</span>
                </div>
                <div className="spec-row">
                  <span className="spec-key">Timeframe:</span>
                  <span className="spec-val">{project.duration || '90 Calendar Days'}</span>
                </div>
              </div>
            </div>

            {/* Right Column Action CTA */}
            <div className="drawer-right-cta">
              <button className="gold-btn-solid full-width-btn" onClick={() => { onClose(); onOpenModal(project.title); }}>
                DISCUSS & BOOK CONSULTATION FOR THIS PRODUCT ({project.title.toUpperCase()})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyDrawer;
