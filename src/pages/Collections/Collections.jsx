import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { Eye, Filter, ArrowUpRight } from 'lucide-react';
import './Collections.css';

const Collections = ({ onSelectProject }) => {
  const { categories, projects } = useProjects();
  const [activeFilter, setActiveFilter] = useState('All Projects');

  const filteredProjects = activeFilter === 'All Projects'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="collections-page">
      {/* Hero Header */}
      <section className="collections-hero">
        <div className="collections-container">
          <span className="section-subtitle">PORTFOLIO SHOWCASE</span>
          <h1 className="collections-title">CURATED ARCHITECTURAL COLLECTIONS</h1>
          <p className="collections-subtitle">
            Explore our portfolio of completed residential estates, bespoke modular kitchens, executive master suites, and commercial architecture.
          </p>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="filter-section">
        <div className="collections-container">
          <div className="filter-tabs-wrapper">
            <Filter size={16} className="gold-icon filter-icon" />
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects-grid-section">
        <div className="collections-container">
          <div className="projects-grid">
            {filteredProjects.length === 0 ? (
              <div className="no-projects-box" style={{ gridColumn: '1 / -1', textCenter: 'center', padding: '60px 0', color: '#94a3b8' }}>
                <p>No products added to "{activeFilter}" yet. Visit the Admin Panel to publish items to this collection!</p>
              </div>
            ) : (
              filteredProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="project-card"
                  onClick={() => onSelectProject && onSelectProject(project.id)}
                >
                  <div className="project-card-media">
                    <img src={project.image} alt={project.title} className="project-card-img" />
                    <div className="project-card-overlay">
                      <button className="gold-btn-solid project-view-btn">
                        <Eye size={16} />
                        <span>OPEN CASE STUDY DRAWER</span>
                      </button>
                    </div>
                    <div className="project-badge">{project.tag || project.category}</div>
                  </div>

                  <div className="project-card-content">
                    <div className="project-card-meta">
                      <span className="project-area">{project.area}</span>
                      <span className="project-loc">{project.location}</span>
                    </div>
                    <h3 className="project-card-title">
                      {project.title}
                      <ArrowUpRight size={18} className="title-arrow" />
                    </h3>
                    <p className="project-card-desc">{project.desc}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collections;
